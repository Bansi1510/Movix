import bcrypt from "bcryptjs";
import { prisma } from "../config/db.config";
import { generateToken } from "../utils/jwt";
import { generateUserInsight } from "./userEmedding.service";

export const loginAdminService = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    throw new Error("email and password required");
  }

  const admin = await prisma.admin.findFirst({
    where: { email },
  });

  if (!admin) {
    throw new Error("admin not found");
  }

  const isMatchPassword = await bcrypt.compare(
    password,
    admin.password
  );

  if (!isMatchPassword) {
    throw new Error("incorrect password");
  }

  const token = generateToken(admin.id, admin.email);

  return {
    token,
    admin: {
      id: admin.id,
      email: admin.email,
    },
  };
};

export const getAdminProfileService = async (id: string) => {
  if (!id) {
    throw new Error("admin not found login again");
  }

  const admin = await prisma.admin.findFirst({
    where: { id },
    select: {
      id: true,
      email: true,
    },
  });

  return admin;
};

export const generateUserInsightService = async (
  userId: string
) => {
  return await generateUserInsight(userId);
};