"use server"

import { cookies } from 'next/headers';
import  jwt  from 'jsonwebtoken';
import { Member } from '@/types';
import { getGroupMembers } from '@/lib/dbFunctions';
import { ObjectId } from 'mongodb';
import Link from 'next/link';


const Overview = async() => {

    const cookieStore = await cookies();
    const cookie = cookieStore.get("jwt");
    const groupInfo = cookie?.value;
    let groupId;

    if (groupInfo) {
    const decoded = jwt.verify(groupInfo, process.env.JWT_SECRET!) as { id: string; email: string; name: string };;
    groupId = decoded.id;
    }

    const groupMembers = await getGroupMembers(new ObjectId(groupId));
    const members = groupMembers;

    return (
        <div>
            <h1>Overzicht!!</h1>
            <div>
                {members.map((member) => 
                    <Link href={{ pathname: `/member/${member._id}`}} key={member.name}>
                        <div>
                            <div>{member.name}</div>
                            <div>{member.balance}</div>
                        </div>
                    </Link>
                    
                )}
                <div>
                    <Link href={{ pathname: '/member/add' }}><div>+</div></Link>
                </div>
            </div>
        </div>
    );
}

export default Overview;
