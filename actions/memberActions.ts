"use server";

import { ObjectId } from "mongodb";
import { addMember } from "@/lib/dbFunctions";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export async function createMemberAction(
  prevState: any,
  formData: FormData
) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const cookieStore = await cookies();
    const cookie = cookieStore.get("jwt");
    const groupInfo = cookie?.value;
    let groupId;

    if (groupInfo) {
    const decoded = jwt.verify(groupInfo, process.env.JWT_SECRET!) as { id: string; email: string; name: string };;
    groupId = decoded.id;
}

  const errors: any = {};

  if (!name || name.trim().length < 2) {
    errors.name = ["Naam moet minstens 2 karakters bevatten"];
  }

  if (!email || !email.includes("@")) {
    errors.email = ["Ongeldig emailadres"];
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  await addMember({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    balance: 0,
    expenses: [],
    donations: [],
    groupId: new ObjectId(groupId),
  });

  redirect(`/overview`);

  return { success: true };
}