import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    return <footer>제작 @winterlood</footer>;
  }

  const books: BookData[] = await res.json();

  return (
    <footer>
      <div>
        <span>제작 @winterlood</span>
        <span>총 {books.length}개의 도서가 등록되어 있습니다.</span>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
