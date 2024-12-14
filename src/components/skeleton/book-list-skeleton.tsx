import BookItemSkeleton from "./book-item-skeleton";

const BookListSkeleton = (props: { count: number }) => {
  return (
    <div>
      {Array.from({ length: props.count }).map((_, index) => (
        <BookItemSkeleton key={index} />
      ))}
    </div>
  );
};

export default BookListSkeleton;
