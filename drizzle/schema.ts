import { pgTable, unique, uuid, varchar, foreignKey, text, timestamp, uniqueIndex, date, boolean, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const role = pgEnum("role", ['admin', 'user'])


export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	firstName: varchar("first_name", { length: 255 }).notNull(),
	lastName: varchar("last_name", { length: 225 }),
	email: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }),
	role: role().default('user').notNull(),
}, (table) => [
	unique("users_email_key").on(table.email),
]);

export const resetPasswordToken = pgTable("reset_password_token", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	token: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "reset_password_token_user_id_fkey"
		}).onDelete("cascade"),
	unique("reset_password_token_token_key").on(table.token),
]);

export const settings = pgTable("settings", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	keyNameEn: varchar("key_name_en", { length: 255 }),
	keyNameAr: varchar("key_name_ar", { length: 255 }),
	valueEn: text("value_en"),
	valueAr: text("value_ar"),
});

export const contact = pgTable("contact", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	firstName: varchar("first_name", { length: 255 }).notNull(),
	lastName: varchar("last_name", { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	phoneNumber: varchar("phone_number", { length: 255 }),
	subject: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	sentAt: timestamp("sent_at", { mode: 'string' }).defaultNow(),
});

export const experience = pgTable("experience", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	positionsEn: varchar("positions_en", { length: 255 }).notNull(),
	positionsAr: varchar("positions_ar", { length: 255 }).notNull(),
	descriptionEn: text("description_en").notNull(),
	descriptionAr: text("description_ar").notNull(),
	startDate: date("start_date").notNull(),
	endDate: date("end_date"),
	locationEn: varchar("location_en", { length: 255 }).notNull(),
	locationAr: varchar("location_ar", { length: 255 }).notNull(),
	currentJob: boolean("current_job").default(false),
}, (table) => [
	uniqueIndex("only_one_current_job").using("btree", table.currentJob.asc().nullsLast().op("bool_ops")).where(sql`(current_job = true)`),
]);

export const skills = pgTable("skills", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	nameEn: varchar("name_en", { length: 255 }).notNull(),
	nameAr: varchar("name_ar", { length: 255 }).notNull(),
	descriptionEn: text("description_en").notNull(),
	descriptionAr: text("description_ar").notNull(),
});

export const education = pgTable("education", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	titleEn: varchar("title_en", { length: 255 }).notNull(),
	titleAr: varchar("title_ar", { length: 255 }).notNull(),
	descriptionEn: text("description_en").notNull(),
	descriptionAr: text("description_ar").notNull(),
	startDate: date("start_date").notNull(),
	endDate: date("end_date").notNull(),
	locationEn: varchar("location_en", { length: 255 }).notNull(),
	locationAr: varchar("location_ar", { length: 255 }).notNull(),
});
