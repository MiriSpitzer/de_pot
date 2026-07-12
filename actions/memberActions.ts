"use server";

import { ObjectId } from "mongodb";
import { addMember, deleteMember } from "@/lib/dbFunctions";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { updateMemberInfo } from "@/lib/dbFunctions";
import { Member } from "@/types";


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
    const decoded = jwt.verify(groupInfo, process.env.JWT_SECRET!) as { id: string; email: string; name: string; balance: number };;
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


export async function updateMemberInfoAction(
    memberId: string,
    name: string,
    email: string
) {
    return await updateMemberInfo(new ObjectId(memberId), name, email);
}

export async function deleteMemberAction(member: Member){
    const deletedMember = await deleteMember(member);
    
    redirect('/overview')

}

