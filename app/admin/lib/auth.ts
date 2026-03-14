"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function checkAdminSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  if (!sessionToken) {
    return null;
  }

  // In production, validate the session token properly
  // For now, return mock user data
  return {
    id: "user-123",
    email: "admin@drkumarfoundation.org",
    full_name: "Admin User",
    role: "super_admin",
    is_active: true,
  };
}

export async function requireAdminRole(requiredRoles: string[]) {
  const session = await checkAdminSession();
  
  if (!session) {
    redirect("/admin/login");
  }

  if (!requiredRoles.includes(session.role)) {
    redirect("/admin/unauthorized");
  }

  return session;
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.is_active) {
      return { error: "Invalid credentials" };
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return { error: "Invalid credentials" };
    }

    // Log the login action
    await prisma.auditLog.create({
      data: {
        action: "LOGIN",
        entity_type: "User",
        entity_id: user.id,
        user_id: user.id,
        user_email: user.email,
        user_role: user.role,
        ip_address: "127.0.0.1", // Get from request in production
      },
    });

    // Set session cookie (in production, use proper JWT)
    const cookieStore = await cookies();
    cookieStore.set("session_token", "mock-session-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An error occurred" };
  }
}

export async function logout() {
  const session = await checkAdminSession();
  
  if (session) {
    // Log the logout action
    await prisma.auditLog.create({
      data: {
        action: "LOGOUT",
        entity_type: "User",
        entity_id: session.id,
        user_id: session.id,
        user_email: session.email,
        user_role: session.role,
        ip_address: "127.0.0.1",
      },
    });
  }

  const cookieStore = await cookies();
  cookieStore.delete("session_token");
  
  return { success: true };
}

export async function logAction({
  action,
  entityType,
  entityId,
  changes,
}: {
  action: string;
  entityType: string;
  entityId: string;
  changes?: Record<string, unknown>;
}) {
  const session = await checkAdminSession();
  
  if (!session) {
    return;
  }

  await prisma.auditLog.create({
    data: {
      action,
      entity_type: entityType,
      entity_id: entityId,
      user_id: session.id,
      user_email: session.email,
      user_role: session.role,
      changes: JSON.stringify(changes),
      ip_address: "127.0.0.1",
    },
  });
}
