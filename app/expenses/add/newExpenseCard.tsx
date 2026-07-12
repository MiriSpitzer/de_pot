"use client"
import { addExpenseAction } from '@/actions/expenseActions';
import { Member } from '@/types';
import React, { useEffect } from 'react';
import { useState, useActionState } from 'react';


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
        <div>
            <form action={formAction}>
            <div>
                <p>Bijdrage per lid:</p>
                <p>{individualExpense.toFixed(2)}</p>
            </div>
            <div>
                <label htmlFor="amount">Bedrag:</label>
                <input type="number" id='amount' name='amount' step='0.01' onChange={(e) => {
                        const value = Number(e.target.value);
                        setAmount(Math.round(value * 100) / 100);
                    }}
                />
            </div>
            <div>
                <label htmlFor="description">Beschrijving:</label><br />
                <input type="text" id='description' name='description' onChange={(e) => setDescripton(e.target.value)}/><br />
            </div>
            {participatingMembers.map(member => (
                <input key={member.name} type="hidden" name="participatingMembers" value={member._id!.toString()} />
            ))}
            <input type="hidden" name="individualExpense" value={individualExpense.toFixed(2)} />
            <div>
                <p>Deelnemende leden:</p>
                {members.map((member) => (
                    <div key={member.name} onClick={() => addParticipatingMember(member)}>{member.name}</div>
                ))}
            </div>
            <button type='submit'>Toevoegen</button>
            </form>
        </div>
    );
}

export default ExpenseCard;