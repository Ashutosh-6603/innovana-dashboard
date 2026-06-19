import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
      NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
      PORT: z.coerce.number().positive().default(3000),
      DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
      REDIS_URL: z.string().min(1, 'REDIS_URL is required'),
      JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
      JWT_EXPIRES_IN: z.string().default('7d'),
      SMTP_HOST: z.string().min(1, 'SMTP_HOST is required'),
      SMTP_PORT: z.coerce.number().positive().default(587),
      SMTP_USER: z.string().min(1, 'SMTP_USER is required'),
      SMTP_PASS: z.string().min(1, 'SMTP_PASS is required'),
      OTP_EXPIRES_IN_MINUTES: z.coerce.number().positive().default(10),
})

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
      console.error('❌ Invalid or missing environment variables:\n');
      parsed.error.issues.forEach((issue) => {
            console.error(`  ${issue.path.join('.')}: ${issue.message}`);
      });
      process.exit(1);
}

export const env = parsed.data;