import { BookData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";

// export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: bookId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    return <div>오류가 발생했습니다.</div>;
  }

  const {
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  }: BookData = await res.json();

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}