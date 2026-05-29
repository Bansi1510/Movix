import bcrypt from "bcryptjs";
import { prisma } from "../config/db.config";

// =========================
// CREATE USER
// =========================

export const createUserService = async (
  name: string,
  email: string,
  password: string,
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },

    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
};

// =========================
// FIND USER BY EMAIL
// =========================

export const findUserByEmailService = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// =========================
// FIND USER BY ID
// =========================

export const findUserByIdService = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
};

// =========================
// COMPARE PASSWORD
// =========================

export const comparePasswordService = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
