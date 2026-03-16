"use client";
import React from "react";
import { useActionState } from "react";
import { login } from "@/actions/authActions";
import styles from "./login.module.css";

export default function Login() {
  const [state, loginAction, pending] = useActionState(login, {
    success: false,
    email: "",
    errors: { email: [], password: [], general: [] },
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        
        <div className={styles.leftSide}>
          <div className={styles.formBox}>

            <h1 className={styles.title}>Login</h1>

            {state.errors.general.length > 0 && (
              <div className={styles.generalError}>
                {state.errors.general.join(", ")}
              </div>
            )}

            <form action={loginAction} className={styles.form}>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={state.email}
                  required
                  placeholder="ada@example.com"
                  className={styles.input}
                />

                {state.errors.email.map((error, index) => (
                  <p key={index} className={styles.errorText}>
                    {error}
                  </p>
                ))}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Wachtwoord
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={styles.input}
                />

                {state.errors.password.map((error, index) => (
                  <p key={index} className={styles.errorText}>
                    {error}
                  </p>
                ))}
              </div>

              <button
                type="submit"
                className={styles.button}
                disabled={pending}
              >
                {pending ? "Inloggen..." : "Login"}
              </button>

            </form>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.logoBox}>
            <img src="/logo_full-removebg.png" alt="DE POT" className={styles.logo}/>
          </div>
        </div>

      </div>
    </div>
  );
}