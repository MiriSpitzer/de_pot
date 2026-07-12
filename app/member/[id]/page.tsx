import { getMemberById } from '@/lib/dbFunctions';
import { ObjectId } from 'mongodb';
import AddDonationForm from './addDonationForm';
import MemberInfo from './memberInfo';

const Page = async({params} : {params : Promise<{id: string}>}) => {

    const { id } = await params;
    const member = await getMemberById(new ObjectId(id));
    const totalExpenses: number = member?.expenses.reduce((sum,expense) => sum + expense.amount, 0) ?? 0;
    const totalDonations: number = member?.donations.reduce((sum,donation) => sum + donation.amount, 0) ?? 0;


    if(member){
        return (
        <div>
            <MemberInfo member={member}/>

            <div>
                <div>
                    <p>Saldo</p>
                    <p>{member.balance}</p>
                </div>
                <div>
                    <p>Uitgegeven</p>
                    <p>{totalExpenses}</p>
                </div>
                <div>
                    <p>Aan de pot gegeven</p>
                    <p>{totalDonations}</p>
                </div>
            </div>

            <div>
                <p>Meegedaan</p>
                <div >
                {member.expenses.map((expense) =>  
                    <div key={expense._id?.toString()}>
                        <p>{expense.description}</p>
                        <p>{expense.amount}</p>
                    </div>
                )}
                </div>
            </div>

            <div>
                <div>
                    <p>Donatie toevoegen</p>

                </div>
                    <AddDonationForm member={member} />
                <div>
                    <p>Eerdere donaties</p>
                    <div>
                    {member.donations.map((donation) =>  
                        <div key={donation._id?.toString()}>
                            <p>{new Date(donation.date).toLocaleDateString("nl-BE")}</p>
                            <p>{donation.amount}</p>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            
        </div>
        )
    }
}

export default Page;
