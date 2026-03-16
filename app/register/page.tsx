"use client";
import React from 'react';
import { useActionState } from 'react';
import { register } from '@/actions/authActions';

const Register = () => {
    const [state, registerAction, pending] = useActionState(register, {
    success: false,
    email: "",
    errors: { email: [], password: [], general: [] },
    });

    return (
        <div className="form-container">
            <div className="form-card">
                <div className="form-header">
                    <h1>Registreren</h1>
                </div>
                {state.errors.general.length > 0 && (
                    <div className="login-errors">
                        {state.errors.general.join(", ")}
                    </div>
                )}

                <form action={registerAction} className="form-body">
                    <div className="form-grid">
                        <div className="form-group form-full">
                            <label htmlFor="name">Naam</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                            />
                        </div>
                        <div className="form-group form-full">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                defaultValue={state.email}
                                required
                                placeholder="ada@example.com"
                            />
                            {state.errors.email.map((error, index) => (
                                <p key={index} className="login-email-error">
                                    {error}
                                </p>
                            ))}
                        </div>
                        <div className="form-group form-full">
                            <label htmlFor="password">Wachtwoord</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                            {state.errors.password.map((error, index) => (
                                <p key={index} className="login-password-error">
                                    {error}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary" disabled={pending}>
                            {pending ? "Registreren..." : "Registreren"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
