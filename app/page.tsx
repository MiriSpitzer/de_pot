import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { getGroupByEmail } from "@/lib/dbFunctions";
import { getLoggedInGroup } from "@/utils/validation";
import { redirect } from "next/navigation";

export default async function Home() {
const group = await getLoggedInGroup();
if(!group){
  redirect("/login");
}
else if(group){
    return (
      <div>
        <h1>{group.name}<br/>Welkom bij de pot!</h1>
        <div>
          <p>Dit zit er nog in...</p>
          <div>{group.balance}</div>
        </div>
        <p>Wil je er wat uithalen?</p>
        <Link href="/expenses/add">
          <button>Voeg een uitgave toe</button>
        </Link>
      </div>
    );
  }
}