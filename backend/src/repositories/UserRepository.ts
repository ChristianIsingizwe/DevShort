import { db } from "../config/database";
import { users } from "../models/userModel";
import { eq, and } from "drizzle-orm";
import type { User, NewUser } from "../models/userModel";

export class UserRepository {
  async create(data: NewUser) {
    const result = await db.insert(users).values(data).returning();
    return result[0];
  }

  async findById(id: number): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return result[0];
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return result[0];
  }

  async findByProviderId(provider: string, providerId: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.provider, provider),
          eq(users.providerId, providerId)
        )
      );
    return result[0];
  }

  async update(id: number, data: Partial<NewUser>): Promise<User> {
    const result = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number): Promise<User> {
    const result = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }
} 