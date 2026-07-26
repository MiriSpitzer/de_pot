"use server"

import { Resend } from "resend";
import { render } from "@react-email/render";
import NewMemberEmail from "@/emails/newMemberEmail";
import LowBalanceEmail from "@/emails/LowBalanceEmail";
import NewExpenseEmail from "@/emails/newExpenseEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewMemberEmail(email: string, name: string, groupname: string = "de pot") {
    try {
        const html = await render(
            NewMemberEmail({ name, groupname })
        );

        const { data, error } = await resend.emails.send({
            from: "De pot <noreply@deteampot.com>",
            to: email,
            subject: "Je bent toegevoegd als lid bij de pot",
            html
        });

        if (error) {
            console.error(error);
            return false;
        }

        return true;

    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function sendLowBalanceEmail(email: string, name: string, groupname: string, balance: number){
    try {
        const html = await render(
            LowBalanceEmail({name, groupname, balance})
        );

        const { data, error } = await resend.emails.send({
            from: "De pot <noreply@deteampot.com>",
            to: email,
            subject: "Je saldo in de pot is erg laag",
            html
        });

        if (error) {
            console.error(error);
            return false;
        }

        return true;

    } catch (error) {
        console.error(error);
        return false;
    }
    
}

export async function sendNewExpenseEmail(email: string, name: string, groupname: string, description: string, amount: number, indivExpense: number, balance: number){
    try {
        const html = await render(
            NewExpenseEmail({name, groupname, description, amount, indivExpense, balance})
        );

        const { data, error } = await resend.emails.send({
            from: "De pot <noreply@deteampot.com>",
            to: email,
            subject: "Je hebt net meegedaan aan een uitgave uit de pot",
            html
        });

        if (error) {
            console.error(error);
            return false;
        }

        return true;

    } catch (error) {
        console.error(error);
        return false;
    }
    
}