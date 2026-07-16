import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
import { Donation, Expense, Group, Member } from "@/types";
import bcrypt from 'bcrypt';

const client = await clientPromise;
const db = await client.db("depot");
export const groupCollection = db.collection<Group>("groups");
export const membersCollection = db.collection<Member>("members");
export const expensesCollection = db.collection("expenses");

export async function getMemberById(id : ObjectId){
    const member = await membersCollection.findOne({_id : id}) as Member | null;
    return member;
}

export async function getMemberByName(name : string){
    const member = await membersCollection.findOne({name : name}) as Member | null;
    return member;
}

export async function getGroupByEmail(email : string){
    const group: Group | null = await groupCollection.findOne({email : email.toLowerCase()}) as Group | null;
    return group;
}

export async function getGroupMembers(id: ObjectId){
    const members : Member[] = await membersCollection.find({ groupId : id }).toArray() as Member[];
    return members;
}

export async function updateGroupBalance(email: string, amount: number){
    const updatedBalance = groupCollection.updateOne(
        {email: email},
        {
            $inc: {
                balance: amount
            }
        }
    )
    return updatedBalance;
}

export async function addMember(member : Member){
    const addedMember = await membersCollection.insertOne(member);
    return addedMember;
}

export async function addExpenseToMember(id: ObjectId, description: string, amount: number){
    const updatedMember = membersCollection.updateOne(
        {_id: id},
        {
            $inc: {
                balance: -amount
            },
            $push: {
                expenses: {
                    description,
                    amount
                }
            }
        }
    )
    return updatedMember;
}

export async function addDonationToMember(date: string, amount: number, id: ObjectId){
    const updatedMember = membersCollection.updateOne(
        {_id: id},
        {
            $inc: {
                balance: amount
            },
            $push: {
                donations: {
                    date: new Date(date),
                    amount: amount,
                    memberId: id
                }
            }
        }
    )
    return updatedMember;
}

export async function updateMemberInfo(id: ObjectId, name: string, email: string){
    const updatedMember = await membersCollection.updateOne(
        {_id: id},
        {
            $set:{
                name: name,
                email: email
            }

        }
    )
    return updatedMember;
}

export async function deleteMember(member: Member){
    const rawId = member._id as ObjectId | string | undefined;
    const id = rawId ? typeof rawId === "string" ? new ObjectId(rawId) : rawId : null;

    if (!id) {
        throw new Error("Member ID is missing");
    }

    const deletedMember = await membersCollection.deleteOne({ _id: id });
    return deletedMember;
}

export async function addGroup(group : Group) {
    const addedGroup = await groupCollection.insertOne(group);
    return addedGroup;
}

export async function addExpense(expense: Expense){
    const addedExpense = await expensesCollection.insertOne(expense);
}

