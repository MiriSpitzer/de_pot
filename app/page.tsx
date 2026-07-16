import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { getGroupByEmail } from "@/lib/dbFunctions";
import { getLoggedInGroup } from "@/lib/validation";
import { redirect } from "next/navigation";

import styles from './page.module.css'

export default async function Home() {
  const group = await getLoggedInGroup();
  if(!group){
    redirect("/login");
  }
  else if(group){
    return (
      <div className={styles.pageWrapper}>
        <h1 className={styles.title}>{group.name}<br/>Welkom bij de pot!</h1>
        <div className={styles.card}>
          <div className={styles.rowContent}>
            <div className={styles.balanceBlock}>
              <p className={styles.lead}>Dit zit er nog in...</p>
              <div className={styles.balance}>{Number(group.balance || 0).toLocaleString('nl-NL', {style: 'currency', currency: 'EUR'})}</div>
            </div>

            <div className={styles.actionBlock}>
              <p className={styles.lead}>Wil je er wat uithalen?</p>
              <div className={styles.actions}>
                <Link href="/expenses/add" className={styles.linkButton}>Voeg een uitgave toe</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}