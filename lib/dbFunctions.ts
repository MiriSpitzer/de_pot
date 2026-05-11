import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
import { Expense, Group, Member } from "@/types";
import bcrypt from 'bcrypt';

const client = await clientPromise;
const db = await client.db("depot");
export const groupCollection = db.collection("groups");
export const membersCollection = db.collection("members");
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

export async function addMember(member : Member){
    const addedMember = await membersCollection.insertOne(member);
    return addedMember;
}

export async function deleteMember(member: Member){
    const deletedMember = await membersCollection.deleteOne(member);
    return deletedMember;
}

export async function addGroup(group : Group) {
    const addedGroup = await groupCollection.insertOne(group);
    return addedGroup;
}

export async function addExpense(expense: Expense){
    const addedExpense = await expensesCollection.insertOne(expense);
}