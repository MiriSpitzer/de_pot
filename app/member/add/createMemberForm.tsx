"use client";

import { useActionState } from "react";
import { createMemberAction } from "@/actions/memberActions";
import styles from "./add.module.css";

export default function AddMemberForm() {
  const [state, formAction, pending] = useActionState(createMemberAction, {
    success: false,
    errors: {},
  });

  return (
    <form action={formAction}>
      <div className={styles.formGroup}>
        <label>Naam</label>
        <input name="name" required />
        {state?.errors?.name?.map((err: string, i: number) => (
          <p key={i} className={styles.error}>
            {err}
          </p>
        ))}
      </div>

      <div className={styles.formGroup}>
        <label>Email</label>
        <input name="email" type="email" required />
        {state?.errors?.email?.map((err: string, i: number) => (
          <p key={i} className={styles.error}>
            {err}
          </p>
        ))}
      </div>

      <button disabled={pending} className={styles.button}>
        {pending ? "Toevoegen..." : "Toevoegen"}
      </button>
    </form>
  );
}