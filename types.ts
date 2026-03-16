import { ObjectId } from "mongodb";

export interface Expense {
    title: string,
    amount: number
}
export interface Donation {
    date: Date,
    amount: number
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