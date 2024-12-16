"use server";

import { revalidateTag } from "next/cache";
import { delay } from "../util/delay";

const createReviewAction = async (_: any, formData: FormData) => {
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (!content || !author || !bookId) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요",
    };
  }

  try {
    await delay(3000);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ content, author, bookId }),
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    // 1. 특정 주소의 해당하는 페이지만 재검증 (default)
    // revalidatePath(`/book/${bookId}`);

    // 2. 특정 경로의 모든 동적 페이지 재검증
    // revalidatePath("/book/[id]", "page");

    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath("/(with-searchbar)", "layout");

    // 4. 모든 데이터 재검증
    // revalidatePath("/", "layout");

    // 5. 태그 값을 기준으로, 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다 : ${error}`,
    };
  }
};

export default createReviewAction;
