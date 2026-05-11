
import { Member } from '@/types';
import { cookies } from 'next/headers';
import { getGroupMembers } from '@/lib/dbFunctions';
import { ObjectId } from 'mongodb';
import  jwt  from 'jsonwebtoken';
import  ExpenseCard  from './newExpenseCard'

const addExpense = async() => {

    const cookieStore = await cookies();
    const cookie = cookieStore.get("jwt");
    const groupInfo = cookie?.value;
    let groupId;

    if (groupInfo) {
    const decoded = jwt.verify(groupInfo, process.env.JWT_SECRET!) as { id: string; email: string; name: string };;
    groupId = decoded.id;
    }

    const groupMembers = await getGroupMembers(new ObjectId(groupId));
    const members: Member[] = groupMembers;

    return (
        <div>
            <ExpenseCard members={members} />
        </div>
    );
}

export default addExpense;
