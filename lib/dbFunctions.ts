import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
import { Group, Member } from "@/types";
import bcrypt from 'bcrypt';

const client = await clientPromise;
const db = await client.db("depot");
export const groupCollection = db.collection("groups");
export const membersCollection = db.collection("members");

export async function getMemberById(id : ObjectId){
    const member = await membersCollection.findOne({_id : id});
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

export async function addGroup(group : Group) {
    const addedGroup = await groupCollection.insertOne(group);
    return addedGroup;
}