"use client";

import { useEffect, useState } from "react";
import { deleteMemberAction, updateMemberInfoAction } from "@/actions/memberActions";
import { Member } from "@/types";
import styles from './member.module.css';

export default function MemberInfo({ member }: { member: Member }) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(member.name);
    const [email, setEmail] = useState(member.email);

    useEffect

    async function handleSave() {
        await updateMemberInfoAction(String(member._id!), name, email);
        setEditing(false);
    }

    async function handleDelete() {
        const confirmed = window.confirm("Weet je zeker dat je dit lid wilt verwijderen?")
        if(!confirmed) return;

        await deleteMemberAction(member);
    }

    return (
        <div className={styles.memberHeader}>
            {editing ? (
                <div className={styles.editForm}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.inputWide}
                    />

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.inputWide}
                    />

                    <button onClick={handleSave} className={styles.submitBtn}>
                        Opslaan
                    </button>
                </div>
            ) : (
                <div>
                    <h1 className={styles.memberName}>{name}</h1>
                    <p>{email}</p>
                </div>
            )}

            <div className={styles.controls}>
                <button onClick={() => setEditing(true)} className={styles.submitBtn}>
                    ✏️
                </button>

                <button onClick={handleDelete} className={styles.submitBtn}>
                    🗑️
                </button>
            </div>
        </div>
    );
}
