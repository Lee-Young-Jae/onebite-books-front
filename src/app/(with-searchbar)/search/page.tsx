import { delay } from "@/app/util/delay";
import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );

  if (!res.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const data: BookData[] = await res.json();

  return (
    <div>
      {data.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense key={q} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
