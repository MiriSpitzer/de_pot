"use client";

import { useActionState } from "react";
import { createMemberAction } from "@/actions/memberActions";
import styles from '../../expenses/add/newExpenseCard.module.css';

export default function AddMemberForm() {
  const [state, formAction, pending] = useActionState(createMemberAction, {
    success: false,
    errors: {},
  });

  return (
    <form action={formAction}>
      {state?.errors && Object.keys(state.errors).length > 0 && (
        <div className={styles.errors}>
          {state.errors.name && <div>{state.errors.name.join(', ')}</div>}
          {state.errors.email && <div>{state.errors.email.join(', ')}</div>}
        </div>
      )}

      <div className={styles.fieldRow}>
        <label className={styles.label}>Naam</label>
        <input className={styles.input} name="name" required />
      </div>

      <div className={styles.fieldRow}>
        <label className={styles.label}>Email</label>
        <input className={styles.input} name="email" type="email" required />
      </div>

      <button disabled={pending} className={styles.submit}>
        {pending ? "Toevoegen..." : "Toevoegen"}
      </button>
    </form>
  );
}