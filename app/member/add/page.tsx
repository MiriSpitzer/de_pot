import React from 'react';
import AddMemberForm from "./createMemberForm";
import styles from './add.module.css'

const AddMember = () => {
    return (
    <div className={styles.container}>
        <h1 className={styles.title}>Lid toevoegen</h1>
        <div className={styles.card}>
            <AddMemberForm />
        </div>
    </div>
    );
}

export default AddMember;
