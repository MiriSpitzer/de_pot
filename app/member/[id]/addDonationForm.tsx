"use client"

import { addDonationAction } from "@/actions/donationActions";
import { useActionState } from "react";
import { useState } from "react";
import { Member } from "@/types";
import styles from './member.module.css';

const initialState = {
    success: false,
    errors: {}
};

const AddDonationForm = ({member}: {member: Member}) => {  
    const [state, formAction] = useActionState(addDonationAction, initialState)
    const [amount, setAmount] = useState('');

    return (
        <form action={formAction} className={styles.formRow}>
            <div>
                <input type="hidden" name="memberId" value={member._id?.toString()}/>
            </div>
            <div className={styles.fieldGroup}>
                <label htmlFor="date" style={{minWidth: '60px'}}>Datum</label>
                <input type="date" name="date" id="date" required className={styles.inputSmall}/>
            </div>
            <div className={styles.fieldGroup}>
                <label htmlFor="amount" style={{minWidth: '60px'}}>Bedrag</label>
                <input
                    type="text"
                    inputMode="decimal"
                    name="amount"
                    id="amount"
                    value={amount}
                    onChange={(e) => {
                        const raw = e.target.value || '';
                        const normalized = raw.replace(/,/g, '.').replace(/[^0-9.]/g, '');
                        setAmount(normalized);
                    }}
                    required
                    className={styles.inputSmall}
                />
            </div>
            <button type="submit" className={styles.submitBtn}>Toevoegen</button>
        </form>
    );
}

export default AddDonationForm;
