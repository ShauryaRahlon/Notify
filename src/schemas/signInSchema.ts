import { z } from 'zod';

export const signInSchema = z.object({
    identifier: z
        .string()
        .trim()
        .min(1, { message: 'Email or username is required' })
        .refine(
            (value) => {
                // If it contains @, validate as email using your exact regex
                if (value.includes('@')) {
                    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
                    return emailRegex.test(value);
                }
                // Otherwise, treat as username (any non-empty string without @)
                return value.length > 0;
            },
            {
                message: 'Please enter a valid email address or username',
            }
        ),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});