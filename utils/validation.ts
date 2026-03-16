import { membersCollection, groupCollection, getGroupByEmail } from "@/lib/dbFunctions";


export function validateEmail(email: string): string[] {
    const errors: string[] = [];

    if (!email) {
        errors.push("Email is verplicht.");
        return errors;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        errors.push("Ongeldig emailadres.");
    }

    if (email.length > 255) {
        errors.push("Email mag maximaal 255 karakters bevatten.");
    }

    return errors;
}

export function validatePassword(password: string): string[] {
    const errors: string[] = [];

    if (!password) {
        errors.push("Wachtwoord is verplicht.");
    } else if (password.length < 8) {
        errors.push("Wachtwoord moet minimaal 8 karakters bevatten.");
    }

    return errors;
}

export async function validateRegisterEmail(email: string): Promise<string[]> {
    const errors: string[] = [];

    if(!email) {
        errors.push("Emailadres is verplicht!");
        return errors;
    }

    const existingEmail = await getGroupByEmail(email);
    if(existingEmail !== null) {
        errors.push("Dit emailadres is al in gebruik. Log in om verder te gaan.")
        return errors;
    }

    return errors;
}

export function validateRegisterPassword(password: string): string[] {
    const errors: string[] = [];

    if (!password) {
        errors.push("Wachtwoord is verplicht.");
        return errors;
    }

    if (password.length < 8) {
        errors.push("Wachtwoord moet minimaal 8 karakters bevatten.");
    }

    if (password.length > 128) {
        errors.push("Wachtwoord mag maximaal 128 karakters bevatten.");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Wachtwoord moet minstens één hoofdletter bevatten.");
    }

    if (!/[a-z]/.test(password)) {
        errors.push("Wachtwoord moet minstens één kleine letter bevatten.");
    }

    if (!/[0-9]/.test(password)) {
        errors.push("Wachtwoord moet minstens één cijfer bevatten.");
    }

    return errors;
}