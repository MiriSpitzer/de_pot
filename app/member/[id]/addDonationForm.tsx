"use client"

import { addDonationAction } from "@/actions/donationActions";
import { useActionState } from "react";
import { Member } from "@/types";

const initialState = {
    success: false,
    errors: {}
};

const AddDonationForm = ({member}: {member: Member}) => {  
    const [state, formAction] = useActionState(addDonationAction, initialState)

    return (
        <form action={formAction}>
            <div>
                <input type="hidden" name="memberId" value={member._id?.toString()}/>
            </div>
            <div>
                <label htmlFor="date">Datum</label>
                <input type="date" name="date" id="date" required/>
            </div>
            <div>
                <label htmlFor="amount">Bedrag</label>
                <input type="number" name='amount' id='amount' step='0.01' required/>
            </div>
            <button type="submit">Toevoegen</button>
        </form>
    );
}

export default AddDonationForm;
