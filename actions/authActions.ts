"use server";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { addGroup, getGroupByEmail } from "@/lib/dbFunctions";
import { validateEmail, validatePassword, validateRegisterEmail, validateRegisterPassword } from "@/utils/validation";
import { Group } from "@/types";

interface LoginState {
    errors: {
        email: string[];
        password: string[];
        general: string[];
    };
    email: string;
    success: boolean;
}



export const login = async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
    let email = formData.get("email")?.toString().trim() ?? "";
    let password = formData.get("password")?.toString() ?? "";

    let emailErrors: string[] = validateEmail(email);
    let passwordErrors: string[] = validatePassword(password);

    if (emailErrors.length > 0 || passwordErrors.length > 0) {
        return {
            errors: {
                email: emailErrors,
                password: passwordErrors,
                general: []
            },
            email: email,
            success: false
        }
    }

    
    console.log("Zoek email:", email);
    const group = await getGroupByEmail(email);
    console.log("Gevonden group:", group);

    if (!group) {
        return {
            errors: {
                general: ["Invalid email"],
                email: [],
                password: []
            },
            email: email,
            success: false
        }
    }

    const isPasswordValid = await bcrypt.compare(password, group.password);

    if (!isPasswordValid) {
        return {
            errors: {
                general: ["Invalid password"],
                email: [],
                password: []
            },
            email: email,
            success: false
        }
    }

    const token = jwt.sign(
        {
            id: group._id,
            email: group.email,
            name: group.name
        },
            process.env.JWT_SECRET!,
        {
            expiresIn: "1w"
        }
    );

    const cookieStore = await cookies();

    cookieStore.set({
        name: "jwt",
        value: token,
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 7 * 24 * 60 * 60
    });

    redirect("/");

    return {
        success: true,
        email: email,
        errors: {
            email: [],
            password: [],
            general: []
        }
    }
}

export const register = async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
    let name = formData.get("name")?.toString() ?? "";
    let email = formData.get("email")?.toString() ?? "";
    let password = formData.get("password")?.toString() ?? "";

    let emailErrors: string[] = await validateRegisterEmail(email);
    let passwordErrors: string[] = validateRegisterPassword(password);

    if (emailErrors.length > 0 || passwordErrors.length > 0) {
        return {
            errors: {
                email: emailErrors,
                password: passwordErrors,
                general: []
            },
            email: email,
            success: false
        }
    }

    const saltRounds = process.env.SALTROUNDS || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newGroup : Group = {name, email: email.trim().toLowerCase(), password: hashedPassword, balance: 0};
    const result = await addGroup(newGroup);

    const token = jwt.sign(
        {
            id: result.insertedId,
            email: newGroup.email,
            name: newGroup.name,
            balance: newGroup.balance
        },
            process.env.JWT_SECRET!,
        {
            expiresIn: "1w"
        }
    );

    const cookieStore = await cookies();

    cookieStore.set({
        name: "jwt",
        value: token,
        httpOnly: true,
        sameSite: "lax",
        secure: true,
    });

    redirect("/overview");

    return {
        success: true,
        email: email,
        errors: {
            email: [],
            password: [],
            general: []
        }
    }
}

export async function logout() {
    "use server";

    const cookieStore = await cookies();
    cookieStore.delete("jwt");
    redirect("/");
}