"use server"

import { cookies } from 'next/headers';
import  jwt  from 'jsonwebtoken';
import { Member } from '@/types';
import { getGroupMembers } from '@/lib/dbFunctions';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import styles from './overview.module.css';
import { getLoggedInGroup } from '@/lib/validation';


const Overview = async() => {

    const group = await getLoggedInGroup();
    if (group){
    const groupMembers = await getGroupMembers(new ObjectId(group._id));
    const members = groupMembers;

    return (
        <div className={styles.page}>
 
            <div className={styles.grid}>
                {members.map((member) => 
                    <Link href={{ pathname: `/member/${member._id}`}} key={String(member._id)} className={styles.cardLink}>
                        <div className={styles.card}>
                            <div className={styles.avatar}>
                                <span className={styles.avatarText}>{member.name}</span>
                            </div>

                            <div className={styles.cardContent}>
                                <div className={styles.row}>
                                    <span className={styles.label}>Saldo:</span>
                                    <span className={styles.value}>{Number(member.balance || 0).toLocaleString('nl-NL', {style: 'currency', currency: 'EUR'})}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}

                <Link href={{ pathname: '/member/add' }} className={styles.cardLink}>
                    <div className={`${styles.card} ${styles.addCard}`}>
                        <div className={styles.addCircle}>+</div>
                        <div className={styles.addText}>Lid toevoegen</div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
}

export default Overview;
