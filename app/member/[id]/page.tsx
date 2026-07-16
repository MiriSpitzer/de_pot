import { getMemberById } from '@/lib/dbFunctions';
import { ObjectId } from 'mongodb';
import AddDonationForm from './addDonationForm';
import MemberInfo from './memberInfo';
import styles from './member.module.css';

const Page = async({params} : {params : Promise<{id: string}>}) => {

    const { id } = await params;
    const member = await getMemberById(new ObjectId(id));
    const totalExpenses: number = member?.expenses.reduce((sum,expense) => sum + expense.amount, 0) ?? 0;
    const totalDonations: number = member?.donations.reduce((sum,donation) => sum + donation.amount, 0) ?? 0;


    if(member){
        return (
        <div className={styles.memberPage}>
            <MemberInfo member={member} />
            <div className={styles.contentCenter}>
                <div className={styles.stats}>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Saldo</div>
                    <div className={styles.statValue}>{Number(member.balance || 0).toLocaleString('nl-NL', {style: 'currency', currency: 'EUR'})}</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Uitgegeven</div>
                    <div className={styles.statValue}>{totalExpenses.toLocaleString('nl-NL', {style: 'currency', currency: 'EUR'})}</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Aan de pot gegeven</div>
                    <div className={styles.statValue}>{totalDonations.toLocaleString('nl-NL', {style: 'currency', currency: 'EUR'})}</div>
                </div>
                </div>
            
                <div className={styles.contentGrid}>
                <div className={styles.expensesBox}>
                    <h3>Meegedaan</h3>
                    <ul className={styles.expensesList}>
                    {member.expenses.map((expense) =>  
                        <li key={expense._id?.toString()} className={styles.expenseItem}>
                            <span>{expense.description}</span>
                            <span>{Number(expense.amount).toLocaleString('nl-NL', {style: 'currency', currency: 'EUR'})}</span>
                        </li>
                    )}
                    </ul>
                </div>

                <div className={styles.rightColumnBox}>
                    <div style={{marginBottom: '12px'}}>
                        <h4>Donatie toevoegen</h4>
                        <AddDonationForm member={member}/>
                    </div>

                    <div style={{marginTop: '18px'}}>
                        <h4>Eerdere donaties</h4>
                        <ul className={styles.historyList}>
                        {member.donations.map((donation) =>  
                            <li key={donation._id?.toString()} className={styles.historyItem}>
                                <span>{new Date(donation.date).toLocaleDateString('nl-BE')}</span>
                                <span>{Number(donation.amount).toLocaleString('nl-NL', {style: 'currency', currency: 'EUR'})}</span>
                            </li>
                        )}
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </div>
        )
    }
}

export default Page;
