"use server"

import { ObjectId } from "mongodb";
import { getMemberById, updateGroupBalance, addDonationToMember } from "@/lib/dbFunctions";
import { Donation } from "@/types";
import { getLoggedInGroup } from "@/lib/validation";
import { revalidatePath } from "next/cache";

export async function addDonationAction(
    prevState: any,
    formData: FormData
) {
    const memberId = formData.get("memberId") as string;
    const date = formData.get("date") as string;
    const rawAmount = (formData.get("amount") as string) || '';
    const normalizedAmount = rawAmount.replace(/,/g, '.').replace(/[^0-9.]/g, '');
    const parsedAmount = parseFloat(normalizedAmount);
    const amount = Number.isFinite(parsedAmount) ? Math.round(parsedAmount * 100) / 100 : 0;
    const member = await getMemberById(new ObjectId(memberId));
    const donation: Donation = {date: new Date(date), amount, memberId: new ObjectId(memberId)} 

    const errors: any = {};
    if(date === ""){
        errors.description = ["Datum is verplicht!"]
    }

    if(amount <= 0){
        errors.amount = ["Het gegeven bedrag kan niet gelijk zijn aan nul!"]
    }

    if(member){
        const addDonation = await addDonationToMember(date, amount, new ObjectId(memberId))
    }

    const group = await getLoggedInGroup();
    if (group) {
        const fixBalance = await updateGroupBalance(group.email, amount)
    }

    if(Object.keys(errors).length > 0){
        return {success: false, errors};
    }
    revalidatePath(`/member/${memberId}`)
  return {success: true, errors: {}}
}