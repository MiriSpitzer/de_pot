import React from 'react';
import AddMemberForm from "./createMemberForm";
import pageStyles from '../../expenses/add/page.module.css';
import cardStyles from '../../expenses/add/newExpenseCard.module.css';

const AddMember = () => {
    return (
    <div className={pageStyles.pageWrapper}>
        <h1>Lid toevoegen</h1>
        <div className={cardStyles.wrapper}>
          <div className={cardStyles.card}>
            <AddMemberForm />
          </div>
        </div>
    </div>
    );
}

export default AddMember;
