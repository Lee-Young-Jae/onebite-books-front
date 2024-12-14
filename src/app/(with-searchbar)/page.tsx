import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

// export const dynamic = "auto";
// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto: 기본값, 아무것도 강제하지 않음
// 2. force-dynamic: 페이지 유형을 동적으로 설정
// 3. force-static: 페이지 유형을 정적으로 설정
// 4. error: 페이지 유형을 오류로 설정

async function AllBooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const data: BookData[] = await res.json();

  return (
    <>
      {data.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}

async function RecommendBooks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    {
      next: {
        revalidate: 3,
      },
    }
  );

  if (!res.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const data: BookData[] = await res.json();

  return (
    <>
      {data.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecommendBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={5} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
