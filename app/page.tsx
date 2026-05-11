import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welkom bij de pot!</h1>
      <Link href={'/expenses/add'}>Voeg een uitgave toe</Link>
    </div>
  );
}
