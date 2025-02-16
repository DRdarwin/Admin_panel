// app/api/emails/route.ts

// import { NextResponse } from "next/server"
// import imap from "imap-simple"

// const config = {
//   imap: {
//     user: process.env.IMAP_USER,
//     // задай в .env.local
//     password: process.env.IMAP_PASSWORD,
//     host: process.env.IMAP_HOST,
//     port: 993,
//     tls: true,
//     authTimeout: 3000,
//   },
// }

// async function getEmails() {
//   const connection = await imap.connect(config)
//   await connection.openBox("INBOX")
//   const results = await connection.search(["ALL"], {
//     bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)"],
//     struct: true,
//   })
//   const emails = results.map((res) => ({
//     from: res.parts[0].body.from ? res.parts[0].body.from[0] : "",
//     subject: res.parts[0].body.subject ? res.parts[0].body.subject[0] : "",
//     date: res.parts[0].body.date ? res.parts[0].body.date[0] : "",
//   }))
//   connection.end()
//   return emails
// }

// export async function GET() {
//   try {
//     const emails = await getEmails()
//     return NextResponse.json(emails)
//   } catch (error) {
//     console.error("Помилка при отриманні листів:", error)
//     return NextResponse.error()
//   }
// }

export {}
