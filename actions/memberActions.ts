"use server";

import { ObjectId } from "mongodb";
import { addMember, deleteMember } from "@/lib/dbFunctions";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { updateMemberInfo } from "@/lib/dbFunctions";
import { Member } from "@/types";
import { getLoggedInGroup } from "@/lib/validation";
import { sendNewMemberEmail } from "@/lib/mails";


export async function createMemberAction(
  prevState: any,
  formData: FormData
) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const group = await getLoggedInGroup();

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
    groupId: new ObjectId(group?._id),
  });
  await sendNewMemberEmail(email, name, group?.name || "de pot");

  redirect(`/overview`);

  return { success: true };
}


export async function updateMemberInfoAction(
    memberId: string,
    name: string,
    email: string
) {
    return await updateMemberInfo(new ObjectId(memberId), name, email);
}

export async function deleteMemberAction(member: Member){
    if (!member._id) {
        throw new Error("Member ID is missing");
    }

    await deleteMember(member);
    redirect('/overview');
}