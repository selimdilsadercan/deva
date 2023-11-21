const font = Inter({ subsets: ["latin"] });
import { Inter } from "next/font/google";
import "./globals.css";

import ClerkProvider from "@/providers/clerk-provider";

export const metadata = {
  title: "Sub Manager"
};

////

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}

export default Layout;
