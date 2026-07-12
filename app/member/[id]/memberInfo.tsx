"use client";

import { useEffect, useState } from "react";
import { deleteMemberAction, updateMemberInfoAction } from "@/actions/memberActions";
import { Member } from "@/types";

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
        <div>
            {editing ? (
                <div>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button onClick={handleSave}>
                        Opslaan
                    </button>
                </div>
            ) : (
                <div>
                    <h1>{name}</h1>
                    <p>{email}</p>
                </div>
            )}

            <div>
                <button onClick={() => setEditing(true)}>
                    ✏️
                </button>

                <button onClick={handleDelete}>
                    🗑️
                </button>
            </div>
        </div>
    );
}
