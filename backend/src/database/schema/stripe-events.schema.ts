import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

export const stripeEvents = pgTable(
  'stripe_events',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    stripeEventId: text('stripe_event_id').notNull(),
    eventType: text('event_type').notNull(),

    payload: jsonb('payload').notNull(),

    processedAt: timestamp('processed_at', { withTimezone: true }),
    processingError: text('processing_error'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('stripe_events_stripe_event_id_unique').on(table.stripeEventId),
    index('stripe_events_event_type_idx').on(table.eventType),
    index('stripe_events_created_at_idx').on(table.createdAt),
  ],
);
