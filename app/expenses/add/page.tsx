
import { Member } from '@/types';
import { cookies } from 'next/headers';
import { getGroupMembers } from '@/lib/dbFunctions';
import { ObjectId } from 'mongodb';
import  jwt  from 'jsonwebtoken';
import  ExpenseCard  from './newExpenseCard'
import { getLoggedInGroup } from '@/utils/validation';

const addExpense = async() => {

    const group = await getLoggedInGroup();
    if(group){
    const groupMembers = await getGroupMembers(new ObjectId(group._id));
    const members: Member[] = groupMembers;

    return (
        <div>
            <ExpenseCard members={members} />
        </div>
    );
    }
}

export default addExpense;
