import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from './layout.module.css';
import { cookies } from "next/headers";
import { logout } from "@/actions/authActions";
import { Albert_Sans } from "next/font/google";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-albert",
});



export const metadata: Metadata = {
  title: "DE POT",
  description: "The place for shared piggybanks",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt");


  return (
    <html lang="nl">
      <body className={styles.container}>
        <header className={styles.header}>
          <a href="/" className={styles.logo}><img src="/logo_full-removebg.png" alt="DE POT" /></a>
          <nav className={styles.nav}>
            <ul>
               {!jwt ? (
                <li>
                  <a href="/login">Inloggen</a>
                </li>
              ) : (
                <li>
                  <form action={logout}>
                    <button type="submit">Uitloggen</button>
                  </form>
                </li>
              )}
              <li><a href="/overview">Overzicht</a></li>
              <li><a href="/expenses/add">Uitgave toevoegen</a></li>
            </ul>
          </nav>
        </header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>&copy; 2026 Mira Spitzer</footer>
      </body>
    </html>
  );
}
