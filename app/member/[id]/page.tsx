import { getMemberById } from '@/lib/dbFunctions';
import { ObjectId } from 'mongodb';
import React from 'react';

const Page = async({params} : {params : Promise<{ id: string}>}) => {

    const { id } = await params;
    const member = await getMemberById(new ObjectId(id));

    return (
  
        <div>
            <h1>{member!.name}</h1>
        </div>
    );
}

export default Page;
