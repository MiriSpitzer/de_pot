"use server"

import { ObjectId } from "mongodb";
import { getMemberById, updateGroupBalance, addDonationToMember } from "@/lib/dbFunctions";
import { Donation } from "@/types";
import { getLoggedInGroup } from "@/utils/validation";
import { revalidatePath } from "next/cache";

export async function addDonationAction(
    prevState: any,
    formData: FormData
) {
    const memberId = formData.get("memberId") as string;
    const date = formData.get("date") as string;
    const amount = Number(formData.get("amount"));
    const member = await getMemberById(new ObjectId(memberId));
    const donation: Donation = {date: new Date(date), amount, memberId: new ObjectId(memberId)} 

    if(member){
        const addDonation = await addDonationToMember(date, amount, new ObjectId(memberId))
    }

    const group = await getLoggedInGroup();
    if (group) {
        const fixBalance = await updateGroupBalance(group.email, amount)
    }

    const errors: any = {};
    if(date === ""){
        errors.description = ["Datum is verplicht!"]
    }

    if(Number(amount) <= 0){
        errors.amount = ["Het gegeven bedrag kan niet gelijk zijn aan nul!"]
    }

    if(Object.keys(errors).length > 0){
        return {success: false, errors};
    }
    revalidatePath(`/member/${memberId}`)
  return {success: true, errors: {}}
}