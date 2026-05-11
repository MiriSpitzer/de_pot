import { ObjectId } from "mongodb";

export interface Expense {
    _id?: ObjectId,
    description: string,
    amount: number,
    participatingMembers: Member[]
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
    expenses: Expense[],
    donations: Donation[],
    groupId: ObjectId
}

export interface Group {
    _id?: ObjectId,
    name: string,
    email: string,
    password: string
}