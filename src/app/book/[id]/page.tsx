import { BookData, ReviewData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import ReviewItem from "@/components/reveiw-item";
import ReviewEditor from "@/components/review-editor";
// export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];
}

const BookDetail = async ({ id }: { id: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
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
    <section>
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
    </section>
  );
};

const ReviewList = async ({ id }: { id: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${id}`,
    {
      next: {
        tags: [`review-${id}`],
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      `리뷰 목록을 불러오는 중 오류가 발생했습니다. ${res.statusText}`
    );
  }

  const reviews: ReviewData[] = await res.json();

  return (
    <section>
      <div>리뷰 목록</div>
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </section>
  );
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: bookId } = await params;

  return (
    <div className={style.container}>
      <BookDetail id={bookId} />
      <ReviewEditor id={bookId} />
      <ReviewList id={bookId} />
    </div>
  );
}
