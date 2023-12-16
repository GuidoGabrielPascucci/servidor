import { z } from "zod";
import { DB } from "../config/db_config.js";
const USER_SCHEMA_GET_ONE = z.object({
    id: z.number({
        invalid_type_error: 'User ID must be a numeric value',
        required_error: 'User ID is required'
    }).int().positive().min(1).max(99999999999),
    email: z.string().email().max(75),
    username: z.string().max(75)
});
const USER_SCHEMA_CREATE = z.object({
    lastname: z.string().max(DB.MAX_LENGTH_LASTNAME),
    name: z.string().max(DB.MAX_LENGTH_NAME),
    username: z.string().max(DB.MAX_LENGTH_USERNAME),
    email: z.string().email().max(DB.MAX_LENGTH_EMAIL),
    password: z.string().max(DB.MAX_LENGTH_PASSWORD),
    country: z.string().max(DB.MAX_LENGTH_COUNTRY),
    role: z.enum(['admin', 'regular'])
});
export function ValidateInput(input) {
    return USER_SCHEMA_CREATE.safeParse(input);
}
//# sourceMappingURL=UserSchema.js.map