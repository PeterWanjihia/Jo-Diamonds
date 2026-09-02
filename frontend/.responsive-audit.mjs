import playwright from '/home/legion/.local/share/pnpm/store/v11/links/@/playwright/1.62.1/2d39517937cd9d00e0a390d009a439a9ab06e3297140a186b94054b3ddbdeec7/node_modules/playwright/index.js';

const { chromium } = playwright;

const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440];
const routes = [
  '/',
  '/collection',
  '/collection?collection=signature-solitaires',
  '/collection?collection=modern-icons',
  '/collection?collection=heritage-halo',
  '/pieces/classic-round-solitaire-ring',
  '/pieces/emerald-cut-diamond-pendant',
  '/pieces/not-a-real-piece',
  '/payment',
  '/payment/complete',
  '/not-a-real-route',
];

const browser = await chromium.launch({ headless: true });
const failures = [];
const results = [];

for (const width of widths) {
  const height = width <= 430 ? 844 : width <= 768 ? 1024 : 900;
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  const pageErrors = [];

  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });

  for (const route of routes) {
    await page.goto(`http://localhost:3000${route}`, {
      waitUntil: 'domcontentloaded',
      timeout: 30_000,
    });
    await page.locator('body').waitFor({ state: 'visible', timeout: 10_000 });
    await page.waitForTimeout(250);

    const audit = await page.evaluate(() => {
      const viewportWidth = window.innerWidth;
      const root = document.documentElement;
      const allElements = [...document.querySelectorAll('body *')];
      const visibleElements = allElements.filter((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          rect.width > 0 &&
          rect.height > 0
        );
      });

      const offenders = visibleElements
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.left < -1 || rect.right > viewportWidth + 1;
        })
        .slice(0, 8)
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            tag: element.tagName.toLowerCase(),
            className:
              typeof element.className === 'string'
                ? element.className.slice(0, 100)
                : '',
            left: Math.round(rect.left * 10) / 10,
            right: Math.round(rect.right * 10) / 10,
            width: Math.round(rect.width * 10) / 10,
          };
        });

      const interactiveElements = visibleElements.filter((element) =>
        element.matches(
          'a[href], button, input:not([type="hidden"]), select, textarea',
        ),
      );

      const undersizedTouchTargets = interactiveElements
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          const isInlineTextLink =
            element.tagName === 'A' &&
            getComputedStyle(element).display === 'inline';
          const isCheckbox =
            element instanceof HTMLInputElement &&
            element.type === 'checkbox';
          return (
            !isInlineTextLink &&
            !isCheckbox &&
            (rect.height < 43 || rect.width < 24)
          );
        })
        .slice(0, 8)
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            label:
              element.getAttribute('aria-label') ||
              element.textContent?.trim().slice(0, 60) ||
              element.tagName.toLowerCase(),
            width: Math.round(rect.width * 10) / 10,
            height: Math.round(rect.height * 10) / 10,
          };
        });

      const keyRegions = [
        'header.site-header',
        'main',
        'footer.site-footer',
      ].map((selector) => {
        const element = document.querySelector(selector);
        const rect = element?.getBoundingClientRect();
        return {
          selector,
          present: Boolean(element),
          width: rect ? Math.round(rect.width * 10) / 10 : null,
          left: rect ? Math.round(rect.left * 10) / 10 : null,
          right: rect ? Math.round(rect.right * 10) / 10 : null,
        };
      });

      return {
        innerWidth: viewportWidth,
        scrollWidth: root.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        offenders,
        undersizedTouchTargets,
        keyRegions,
      };
    });

    const passed =
      audit.scrollWidth <= width &&
      audit.bodyScrollWidth <= width &&
      audit.offenders.length === 0 &&
      audit.undersizedTouchTargets.length === 0;

    results.push({
      width,
      route,
      passed,
      scrollWidth: audit.scrollWidth,
      offenders: audit.offenders,
      undersizedTouchTargets: audit.undersizedTouchTargets,
    });

    if (!passed) {
      failures.push(results.at(-1));
    }

    if (width <= 768 && route === '/') {
      const menuButton = page.getByRole('button', {
        name: 'Open navigation',
      });
      await page.waitForTimeout(750);
      await menuButton.click();
      const drawer = page.locator('#mobile-navigation');
      try {
        await drawer.waitFor({ state: 'visible', timeout: 5_000 });
        const drawerAudit = await drawer.evaluate((element) => {
          const rect = element.getBoundingClientRect();
          return {
            left: rect.left,
            right: rect.right,
            links: element.querySelectorAll('a[href]').length,
          };
        });

        if (
          drawerAudit.left < -1 ||
          drawerAudit.right > width + 1 ||
          drawerAudit.links < 4
        ) {
          failures.push({
            width,
            route,
            mobileMenu: drawerAudit,
          });
        }

        await page.keyboard.press('Escape');
        await drawer.waitFor({ state: 'detached' });
      } catch (error) {
        failures.push({
          width,
          route,
          mobileMenuError: error.message,
          expanded: await menuButton.getAttribute('aria-expanded'),
        });
      }
    }
  }

  if (width === 390) {
    await page.goto('http://localhost:3000/collection', {
      waitUntil: 'domcontentloaded',
    });
    const productLink = page.locator('.product-card h3 a').first();
    await productLink.waitFor({ state: 'visible', timeout: 10_000 });
    await productLink.click();
    await page.waitForURL(/\/pieces\//, { timeout: 10_000 });

    await page.goto('http://localhost:3000/payment/complete', {
      waitUntil: 'domcontentloaded',
    });
    await page.getByRole('heading', {
      name: 'We could not confirm the payment',
    }).waitFor({ timeout: 10_000 });

    await page.goto(
      'http://localhost:3000/collection?collection=modern-icons',
      { waitUntil: 'domcontentloaded' },
    );
    await page.getByRole('heading', {
      name: 'Modern Icons pieces',
    }).waitFor({ timeout: 10_000 });

    await page.screenshot({
      path: '/tmp/jo-diamonds-collection-390.png',
      fullPage: true,
    });

    let mockedPaymentStatus = {
      status: 'complete',
      paymentStatus: 'paid',
      amountTotal: 1480000,
      currency: 'GBP',
      customerEmail:
        'private.client.with.a.long.address@example.com',
      reference:
        'JD-RESPONSIVE-AUDIT-LONG-REFERENCE-0123456789',
    };

    await page.route(
      '**/v1/payments/checkout-session/**',
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          headers: {
            'access-control-allow-origin': 'http://localhost:3000',
          },
          body: JSON.stringify(mockedPaymentStatus),
        });
      },
    );

    const confirmationStates = [
      {
        heading: 'Thank you',
        response: mockedPaymentStatus,
      },
      {
        heading: 'Your payment is processing',
        response: {
          ...mockedPaymentStatus,
          paymentStatus: 'unpaid',
        },
      },
      {
        heading: 'Payment not completed',
        response: {
          ...mockedPaymentStatus,
          status: 'open',
          paymentStatus: 'unpaid',
        },
      },
    ];

    for (const state of confirmationStates) {
      mockedPaymentStatus = state.response;
      await page.goto(
        'http://localhost:3000/payment/complete?session_id=cs_test_responsive',
        { waitUntil: 'domcontentloaded' },
      );
      await page.getByRole('heading', {
        name: state.heading,
      }).waitFor({ timeout: 10_000 });

      const stateOverflow = await page.evaluate(() => ({
        viewport: window.innerWidth,
        root: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));

      if (
        stateOverflow.root > width ||
        stateOverflow.body > width
      ) {
        failures.push({
          width,
          paymentConfirmationState: state.heading,
          overflow: stateOverflow,
        });
      }
    }

    await page.addInitScript(() => {
      let nuxtPayload;
      Object.defineProperty(window, '__NUXT__', {
        configurable: true,
        get() {
          return nuxtPayload;
        },
        set(value) {
          nuxtPayload = value;
          let runtimeConfig;
          Object.defineProperty(value, 'config', {
            configurable: true,
            get() {
              return runtimeConfig;
            },
            set(config) {
              config.public.paymentsEnabled = true;
              config.public.stripePublishableKey =
                'pk_test_responsive_audit';
              runtimeConfig = config;
            },
          });
        },
      });
    });

    await page.route(
      '**/v1/payments/checkout-session',
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          headers: {
            'access-control-allow-origin': 'http://localhost:3000',
          },
          body: JSON.stringify({
            clientSecret: 'ek_test_responsive_audit',
          }),
        });
      },
    );

    await page.goto('http://localhost:3000/payment', {
      waitUntil: 'domcontentloaded',
    });
    const amountInput = page.getByLabel('Amount');
    await amountInput.waitFor({ state: 'visible', timeout: 10_000 });
    await amountInput.fill('14800.00');
    await page.getByLabel('Reference').fill(
      'JD-RESPONSIVE-AUDIT-LONG-REFERENCE-0123456789',
    );
    await page.getByRole('button', {
      name: 'Continue securely',
    }).click();
    await page.getByRole('heading', {
      name: 'Complete your payment',
    }).waitFor({ timeout: 10_000 });

    const checkoutOverflow = await page.evaluate(() => ({
      viewport: window.innerWidth,
      root: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
      checkoutWidth:
        document
          .querySelector('.payment-checkout__mount')
          ?.getBoundingClientRect().width ?? null,
    }));

    if (
      checkoutOverflow.root > width ||
      checkoutOverflow.body > width ||
      !checkoutOverflow.checkoutWidth
    ) {
      failures.push({
        width,
        embeddedCheckout: checkoutOverflow,
      });
    }

    await page.screenshot({
      path: '/tmp/jo-diamonds-payment-checkout-390.png',
      fullPage: true,
    });
  }

  if (pageErrors.length > 0) {
    failures.push({ width, pageErrors: [...new Set(pageErrors)] });
  }

  await context.close();
}

await browser.close();

const summary = {
  checks: results.length,
  passed: results.filter((result) => result.passed).length,
  failed: failures.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));
process.exitCode = failures.length > 0 ? 1 : 0;
