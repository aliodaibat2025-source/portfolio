import { relations } from "drizzle-orm/relations";
import { users, resetPasswordToken } from "./schema";

export const resetPasswordTokenRelations = relations(resetPasswordToken, ({one}) => ({
	user: one(users, {
		fields: [resetPasswordToken.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	resetPasswordTokens: many(resetPasswordToken),
}));