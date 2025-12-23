import { Prisma } from '../../src/generated/prisma/client';

export const admin: Prisma.AdminCreateInput = {
  firstname:process.env.ADMIN_FIRSTNAME || 'AMIT',
  lastname: process.env.ADMIN_LASTNAME || 'THAKUR',
  email: process.env.ADMIN_EMAIL || '',
  meta: {
    create: {
      passwordSalt: process.env.ADMIN_PASSWORD_SALT || '',
      passwordHash: process.env.ADMIN_PASSWORD_HASH || '',
    },
  },
};
