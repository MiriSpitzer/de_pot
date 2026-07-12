import { ObjectId } from "mongodb";

export interface Expense {
    _id?: ObjectId,
    description: string,
    amount: number,
    participatingMembers: Member[]
}

export interface indivExpense{
    _id?: ObjectId,
    description: string,
    amount: number
}

export interface Donation {
    _id?: ObjectId,
    date: Date,
    amount: number,
    memberId: ObjectId
}

export interface Member {
    _id?: ObjectId,
    name: string,
    email: string,
    balance: number,
    expenses: indivExpense[],
    donations: Donation[],
    groupId: ObjectId
}

export interface Group {
    _id?: ObjectId,
    name: string,
    email: string,
    password: string,
    balance: number
}