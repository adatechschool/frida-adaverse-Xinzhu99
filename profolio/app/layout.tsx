import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import AddProject from "./components/AddProject";
import { Manrope } from 'next/font/google'

export const metadata: Metadata = {
  title: "Profolio",
  description: "Students' projects portfolio of Ada ",
};

const manrope = Manrope({
  subsets:['latin'],
  weight: '400'
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.className}>
      <body >
        <div className="nav_bar bg-white shadow-lg flex justify-between items-center p-4 gap-4">
          <Link href="/">Pro-folio</Link>
          <AddProject />

        </div>
        {children}
      </body>
    </html>
  );
}
