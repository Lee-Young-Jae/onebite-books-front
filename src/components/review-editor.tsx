"use client";

import createReviewAction from "@/app/actions/create-review.action";
import style from "./review-editor.module.css";
import { useActionState, useEffect } from "react";

const ReviewEditor = ({ id }: { id: string }) => {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      리뷰 작성
      <form className={style.form_container} action={formAction}>
        <input name="bookId" value={id} hidden readOnly />
        <textarea
          disabled={isPending}
          name="content"
          placeholder="리뷰 내용"
          required
        />
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            name="author"
            placeholder="작성자"
            required
          />
          <button type="submit" disabled={isPending}>
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ReviewEditor;
