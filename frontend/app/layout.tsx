import "./globals.css";
import { Maven_Pro } from "@next/font/google";
import Link from "next/link";
import LayoutApolloProvider from "../components/layoutApolloProvider";

const font = Maven_Pro({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className={`w-screen min-h-screen bg-c-dark ${font.className}`}>
          <LayoutApolloProvider>
            <main className="text-c-min-light px-10">
              <nav className="flex w-full py-6 gap-5 items-center justify-between">
                <div className="py-2 text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-tr from-c-h-blue to-c-hl-blue">
                  GraphQL Blog
                </div>
                <ul className="flex">
                  <li className="hover:bg-c-h-dark p-2 rounded-lg">
                  <Link href={`/quotes`}>
                    All Posts
                  </Link>
                  </li>
                </ul>
              </nav>
              {children}
            </main>
          </LayoutApolloProvider>
          <footer></footer>
        </div>
      </body>
    </html>
  );
}
