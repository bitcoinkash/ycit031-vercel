import Image from 'next/image'
import styles from './page.module.css'
import { db } from "@vercel/postgres";
import { createClient } from '@vercel/postgres';



export default async function Home()
{

  const client = createClient();

  await client.connect();

  const { rows } = await client.sql`
  SELECT name, message 
  FROM guest_message`;

  console.log(rows);


  return <main className={styles.main}>
     {
      rows.map((row) => (
        <div key={row.name}>
          <h3>{row.name}</h3>
          <p>{row.message}</p>
        </div>
      ))
     }
    </main>;
}

