import { ReviewData } from "@/types";
import style from "./review-item.module.css";
import ReviewItemDeleteButton from "./review-item-delete-button";

const ReviewItem = ({ id, bookId, content, author, createdAt }: ReviewData) => {
  return (
    <div className={style.container}>
      <div className={style.author}>{author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottom_container}>
        <div className={style.date}>
          {new Date(createdAt).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
        <div className={style.delete_button}>
          <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
