"use server"

import { addExpense, addExpenseToMember, getMemberById, updateGroupBalance } from "@/lib/dbFunctions";
import { Member } from "@/types";
import { ObjectId } from "mongodb";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getLoggedInGroup } from "@/lib/validation";


export async function addExpenseAction(
  prevState: any,
  formData: FormData
){
  const description = (formData.get("description") as string) ?? "";
  const amount : number = Number(formData.get("amount"));
  const participatingMembersId = formData.getAll("participatingMembers") as string[];
  const individualExpense: number = Number(formData.get("individualExpense"));

  const errors: any = {};

  if(!description || description.trim() === ""){
    errors.description = ["Geef een passende beschrijving!"];
  }

  if(!amount || Number(amount) <= 0){
    errors.amount = ["Het uitgegeven bedrag kan niet gelijk zijn aan nul!"];
  }

  if(!participatingMembersId || participatingMembersId.length === 0){
    errors.participatingMembers = ["Er moet minstens één lid meedoen aan de uitgave!"];
  }

  if(Object.keys(errors).length > 0){
    return {success: false, errors};
  }

  let participatingMembers : Member[] = [];
  for(let id of participatingMembersId){
    const member = await getMemberById(new ObjectId(id));
    if(member){
      participatingMembers.push(member);
    }
  }

  for(const member of participatingMembers){
    await addExpenseToMember(member._id!, description, individualExpense);
  }

  if(participatingMembers.length * individualExpense < amount){
    const correction: number = amount - participatingMembers.length * individualExpense;
    const r = Math.floor(Math.random() * participatingMembers.length);
    await addExpenseToMember(participatingMembers[r]._id!, "correctie", correction);
  }

  const group = await getLoggedInGroup();
  if (group) {
    await updateGroupBalance(group.email, -amount);
  }

  await addExpense({description, amount, participatingMembers});
  redirect("/");
  return {success: true, errors: {}};
}