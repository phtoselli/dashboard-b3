import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { randomBytes, randomUUID } from 'crypto';

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const hashedPassword = await hashPassword(data.password);

  const user = await db.user.create({
    data: {
      name: data.name,
      email: data.email.toLowerCase(),
      password: hashedPassword,
    },
  });

  return user;
}

export async function getUserByEmail(email: string) {
  return db.user.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export async function generateResetToken(email: string) {
  const token = randomUUID();
  const expires = new Date(Date.now() + 3600000); // 1 hour

  // Delete any existing tokens for this email
  await db.verificationToken.deleteMany({
    where: { identifier: email.toLowerCase() },
  });

  // Create new token
  await db.verificationToken.create({
    data: {
      identifier: email.toLowerCase(),
      token,
      expires,
    },
  });

  return { token, expires };
}

export async function verifyResetToken(token: string) {
  const verificationToken = await db.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken) {
    return null;
  }

  if (verificationToken.expires < new Date()) {
    await db.verificationToken.delete({
      where: { token },
    });
    return null;
  }

  return verificationToken;
}

export async function resetPassword(email: string, newPassword: string) {
  const hashedPassword = await hashPassword(newPassword);

  await db.user.update({
    where: { email: email.toLowerCase() },
    data: {
      password: hashedPassword,
      updatedAt: new Date(),
    },
  });

  // Delete the used token
  await db.verificationToken.deleteMany({
    where: { identifier: email.toLowerCase() },
  });
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('A senha deve ter pelo menos 8 caracteres');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra maiúscula');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra minúscula');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('A senha deve conter pelo menos um número');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
