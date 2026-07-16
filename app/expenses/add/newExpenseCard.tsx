"use client"
import { addExpenseAction } from '@/actions/expenseActions';
import { Member } from '@/types';
import React, { useEffect } from 'react';
import { useState, useActionState } from 'react';
import styles from './newExpenseCard.module.css'


const ExpenseCard = ({members}: {members: Member[]}) => {

  const [state, formAction, pending] = useActionState(addExpenseAction, {
    success: false,
    errors: {},
  });
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescripton] = useState<string>("");
    const [participatingMembers, setParticipatingMembers] = useState<Member[]>([]);
    const [individualExpense, setIndividualExpense] = useState<number>(0);

    useEffect(() => {
        const newIdivExp = participatingMembers.length > 0 ? amount / participatingMembers.length : 0;
        setIndividualExpense(Math.round(newIdivExp * 100) / 100);
    }, [participatingMembers.length, amount]);

    const addParticipatingMember = (member: Member) => {
        const alreadyMember = participatingMembers.indexOf(member);
        if(alreadyMember < 0) {
            setParticipatingMembers([...participatingMembers, member]);
        } else if ( alreadyMember >= 0) {
            setParticipatingMembers(participatingMembers.filter(m => m.name !== member.name));
        }
    }

    return (                
        <div className={styles.wrapper}>
            <form className={styles.card} action={formAction}>
            {state?.errors && Object.keys(state.errors).length > 0 && (
                <div className={styles.errors}>
                    {state.errors.description && <div>{state.errors.description.join(', ')}</div>}
                    {state.errors.amount && <div>{state.errors.amount.join(', ')}</div>}
                    {state.errors.participatingMembers && <div>{state.errors.participatingMembers.join(', ')}</div>}
                </div>
            )}
                        <div className={styles.totalRow}>
                                <div className={styles.totalBox}>
                                    <p className={styles.totalLabel}>Bijdrage per lid:</p>
                                    <p className={styles.totalValue}>€ {individualExpense.toFixed(2)}</p>
                                </div>
                        </div>
                        <div className={styles.fieldRow}>
                                <label className={styles.label} htmlFor="amount">Bedrag (in eur):</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    inputMode="decimal"
                                    id="amount"
                                    name="amount"
                                    placeholder="0,00"
                                    onChange={(e) => {
                                        const raw = e.target.value || '';
                                        const normalized = raw.replace(/,/g, '.').replace(/[^0-9.]/g, '');
                                        const parsed = parseFloat(normalized);
                                        const value = Number.isFinite(parsed) ? Math.round(parsed * 100) / 100 : 0;
                                        setAmount(value);
                                    }}
                                />
                        </div>
                <div className={styles.fieldRow}>
                    <label className={styles.label} htmlFor="description">Beschrijving:</label>
                    <input className={styles.input} type="text" id='description' name='description' value={description} required onChange={(e) => setDescripton(e.target.value)}/>
                </div>
            {participatingMembers.map(member => (
                <input key={member.name} type="hidden" name="participatingMembers" value={member._id!.toString()} />
            ))}
            <input type="hidden" name="individualExpense" value={individualExpense.toFixed(2)} />
            <div className={styles.membersSection}>
                <p className={styles.membersLabel}>Participerende leden:</p>
                <div className={styles.membersGrid}>
                {members.map((member) => {
                    const isActive = participatingMembers.some(m => m.name === member.name);
                    const className = isActive ? `${styles.member} ${styles.active}` : styles.member;
                    return (
                        <div key={member.name} className={className} onClick={() => addParticipatingMember(member)}>{member.name}</div>
                    )
                })}
                </div>
            </div>
            <button className={styles.submit} type='submit'>Toevoegen</button>
            </form>
        </div>
    );
}

export default ExpenseCard;