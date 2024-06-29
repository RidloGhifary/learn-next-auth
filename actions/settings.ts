"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserByEmail, getUserById } from "@/data/user";
import { SettingsSchema } from "@/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorized!" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already is used!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.email
    );

    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const isPasswordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!isPasswordMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedNewPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedNewPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });

  return { success: "Settings updated" };
};
