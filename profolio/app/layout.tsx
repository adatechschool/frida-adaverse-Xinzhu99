import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Profolio",
  description: "Students' projects portfolio of Frida ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-amber-300 flex justify-between p-4 text-xl">
          <Link href="/">Profolio</Link>
          <Link href="/addProject">Proposer un projet</Link>

        </div>
        {children}
      </body>
    </html>
  );
}
