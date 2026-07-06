import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  describe('getRoot', () => {
    it('returns the API identity and status', () => {
      expect(appController.getRoot()).toEqual({
        service: 'JO.DIAMONDS API',
        status: 'ok',
        message: 'Hello World!',
      });
    });
  });

  describe('getHealth', () => {
    it('returns a healthy status and ISO timestamp', () => {
      const result = appController.getHealth();

      expect(result.status).toBe('ok');
      expect(result.timestamp).toBeDefined();
      expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
    });
  });
});
