"use server"

import { cookies } from 'next/headers';
import  jwt  from 'jsonwebtoken';
import { Member } from '@/types';
import { getGroupMembers } from '@/lib/dbFunctions';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import { getLoggedInGroup } from '@/utils/validation';


const Overview = async() => {

    const group = await getLoggedInGroup();
    if (group){
    const groupMembers = await getGroupMembers(new ObjectId(group._id));
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
}

export default Overview;
