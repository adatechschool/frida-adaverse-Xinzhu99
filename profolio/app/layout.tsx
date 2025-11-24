import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import AddProject from "./components/AddProject";
export const metadata: Metadata = {
  title: "Profolio",
  description: "Students' projects portfolio of Ada ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="nav_bar bg-amber-200 flex justify-between p-4 gap-4">
          <Link href="/">Accueil</Link>
          <AddProject />

        </div>
        {children}
      </body>
    </html>
  );
}
