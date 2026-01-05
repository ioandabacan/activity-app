import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS "roles" (
  "_id" integer PRIMARY KEY,
  "name" text NOT NULL UNIQUE,
  "created_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS "members" (
  "_id" integer PRIMARY KEY,
  "user_id" integer NOT NULL,
  "status" text NOT NULL,
  "role" text,
  "name" text NOT NULL,
  "organization" text,
  "profile_image_id" integer,
  "linkedin_profile" text,
  "created_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("user_id") REFERENCES "users"("_id"),
  FOREIGN KEY ("profile_image_id") REFERENCES "media"("_id")
);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS "initiatives" (
  "_id" integer PRIMARY KEY,
  "title" text NOT NULL,
  "description" jsonb,
  "cover_image_id" integer,
  "external_link" text,
  "created_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("cover_image_id") REFERENCES "media"("_id")
);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS "ninjas" (
  "_id" integer PRIMARY KEY,
  "child_name" text NOT NULL,
  "age" integer NOT NULL,
  "additional_info" text,
  "parent_name" text NOT NULL,
  "parent_email" text NOT NULL,
  "parent_phone" text NOT NULL,
  "safety_consent" boolean NOT NULL DEFAULT false,
  "media_consent" boolean NOT NULL DEFAULT false,
  "created_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS "mentors" (
  "_id" integer PRIMARY KEY,
  "name" text NOT NULL,
  "biography" jsonb,
  "profile_photo_id" integer,
  "linked_user_id" integer,
  "created_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("profile_photo_id") REFERENCES "media"("_id"),
  FOREIGN KEY ("linked_user_id") REFERENCES "users"("_id")
);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS "meetings" (
  "_id" integer PRIMARY KEY,
  "title" text NOT NULL,
  "meeting_date" datetime NOT NULL,
  "meeting_venue" text NOT NULL,
  "meeting_type" text NOT NULL,
  "topic_name" text,
  "facilitator_id" integer,
  "discussion_topics" jsonb,
  "created_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("facilitator_id") REFERENCES "members"("_id")
);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS "festival_editions" (
  "_id" integer PRIMARY KEY,
  "year" integer NOT NULL UNIQUE,
  "title" text NOT NULL,
  "main_theme" text,
  "details" jsonb,
  "created_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS "festival_sections" (
  "_id" integer PRIMARY KEY,
  "festival_edition_id" integer NOT NULL,
  "section_name" text NOT NULL,
  "created_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("festival_edition_id") REFERENCES "festival_editions"("_id")
);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS "locations" (
  "_id" integer PRIMARY KEY,
  "festival_edition_id" integer NOT NULL,
  "location_name" text NOT NULL,
  "location_address" text,
  "geo_coordinates" jsonb,
  "location_description" jsonb,
  "layout_map_id" integer,
  "max_capacity" integer,
  "responsible_person_id" integer,
  "created_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("festival_edition_id") REFERENCES "festival_editions"("_id"),
  FOREIGN KEY ("layout_map_id") REFERENCES "media"("_id"),
  FOREIGN KEY ("responsible_person_id") REFERENCES "volunteers"("_id")
);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS "guests" (
  "_id" integer PRIMARY KEY,
  "festival_edition_id" integer NOT NULL,
  "name" text NOT NULL,
  "affiliation" text,
  "roles" text,
  "background" jsonb,
  "guest_photo_id" integer,
  "online_presence" text,
  "created_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("festival_edition_id") REFERENCES "festival_editions"("_id"),
  FOREIGN KEY ("guest_photo_id") REFERENCES "media"("_id")
);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS "volunteers" (
  "_id" integer PRIMARY KEY,
  "festival_edition_id" integer NOT NULL,
  "name" text NOT NULL,
  "avatar_id" integer,
  "company" text,
  "date_of_birth" datetime,
  "contact" text,
  "policy_document_id" integer,
  "superviser_id" integer,
  "related_user_id" integer,
  "created_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("festival_edition_id") REFERENCES "festival_editions"("_id"),
  FOREIGN KEY ("avatar_id") REFERENCES "media"("_id"),
  FOREIGN KEY ("policy_document_id") REFERENCES "media"("_id"),
  FOREIGN KEY ("superviser_id") REFERENCES "members"("_id"),
  FOREIGN KEY ("related_user_id") REFERENCES "users"("_id")
);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS "activities" (
  "_id" integer PRIMARY KEY,
  "festival_edition_id" integer NOT NULL,
  "title" text NOT NULL,
  "details" jsonb,
  "category" text,
  "target_groups" text,
  "part_of_section_id" integer,
  "created_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("festival_edition_id") REFERENCES "festival_editions"("_id"),
  FOREIGN KEY ("part_of_section_id") REFERENCES "festival_sections"("_id")
);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS "activities_rels" (
  "id" integer PRIMARY KEY,
  "parent_id" integer NOT NULL,
  "path" text NOT NULL,
  "related_id" integer,
  FOREIGN KEY ("parent_id") REFERENCES "activities"("_id"),
  FOREIGN KEY ("related_id") REFERENCES "guests"("_id")
);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS "schedule" (
  "_id" integer PRIMARY KEY,
  "festival_edition_id" integer NOT NULL,
  "begin_time" datetime NOT NULL,
  "finish_time" datetime NOT NULL,
  "scheduled_activity_id" integer NOT NULL,
  "venue_id" integer NOT NULL,
  "created_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("festival_edition_id") REFERENCES "festival_editions"("_id"),
  FOREIGN KEY ("scheduled_activity_id") REFERENCES "activities"("_id"),
  FOREIGN KEY ("venue_id") REFERENCES "locations"("_id")
);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS "locations_rels" (
  "id" integer PRIMARY KEY,
  "parent_id" integer NOT NULL,
  "path" text NOT NULL,
  "related_id" integer,
  FOREIGN KEY ("parent_id") REFERENCES "locations"("_id"),
  FOREIGN KEY ("related_id") REFERENCES "media"("_id")
);`)

  await db.run(sql`ALTER TABLE "posts" ADD COLUMN "related_initiative_id" integer;`)
  await db.run(sql`ALTER TABLE "posts" ADD FOREIGN KEY ("related_initiative_id") REFERENCES "initiatives"("_id");`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS "roles_created_at_idx" ON "roles" ("created_at");`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "members_user_id_idx" ON "members" ("user_id");`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "members_profile_image_id_idx" ON "members" ("profile_image_id");`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "initiatives_cover_image_id_idx" ON "initiatives" ("cover_image_id");`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "mentors_profile_photo_id_idx" ON "mentors" ("profile_photo_id");`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "mentors_linked_user_id_idx" ON "mentors" ("linked_user_id");`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "meetings_facilitator_id_idx" ON "meetings" ("facilitator_id");`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "festival_sections_festival_edition_id_idx" ON "festival_sections" ("festival_edition_id");`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "locations_festival_edition_id_idx" ON "locations" ("festival_edition_id");`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "guests_festival_edition_id_idx" ON "guests" ("festival_edition_id");`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "volunteers_festival_edition_id_idx" ON "volunteers" ("festival_edition_id");`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "activities_festival_edition_id_idx" ON "activities" ("festival_edition_id");`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS "schedule_festival_edition_id_idx" ON "schedule" ("festival_edition_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS "schedule";`)
  await db.run(sql`DROP TABLE IF EXISTS "locations_rels";`)
  await db.run(sql`DROP TABLE IF EXISTS "activities_rels";`)
  await db.run(sql`DROP TABLE IF EXISTS "activities";`)
  await db.run(sql`DROP TABLE IF EXISTS "volunteers";`)
  await db.run(sql`DROP TABLE IF EXISTS "guests";`)
  await db.run(sql`DROP TABLE IF EXISTS "locations";`)
  await db.run(sql`DROP TABLE IF EXISTS "festival_sections";`)
  await db.run(sql`DROP TABLE IF EXISTS "festival_editions";`)
  await db.run(sql`DROP TABLE IF EXISTS "meetings";`)
  await db.run(sql`DROP TABLE IF EXISTS "mentors";`)
  await db.run(sql`DROP TABLE IF EXISTS "ninjas";`)
  await db.run(sql`DROP TABLE IF EXISTS "initiatives";`)
  await db.run(sql`DROP TABLE IF EXISTS "members";`)
  await db.run(sql`DROP TABLE IF EXISTS "roles";`)
  await db.run(sql`ALTER TABLE "posts" DROP COLUMN "related_initiative_id";`)
}
