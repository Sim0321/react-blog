import { useState } from "react";
import "styles/components/Comments.style.css";

const COMENTS = [
  { id: 1, email: "email~~~", content: "content", createdAt: "2023-04-05" },
  { id: 2, email: "email~~~", content: "content", createdAt: "2023-04-05" },
  { id: 3, email: "email~~~", content: "content", createdAt: "2023-04-05" },
  { id: 4, email: "email~~~", content: "content", createdAt: "2023-04-05" },
  { id: 5, email: "email~~~", content: "content", createdAt: "2023-04-05" },
  { id: 6, email: "email~~~", content: "content", createdAt: "2023-04-05" },
];

export default function Comments() {
  const [comment, setComment] = useState<string>("");

  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    setComment(value);
  };

  return (
    <div className="comments">
      <form className="comments__form">
        <div className="form__block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea
            name="comment"
            id="comment"
            required
            onChange={onChangeComment}
          ></textarea>
        </div>
        <div className="form__block">
          <input type="submit" value="입력" className="form__btn-submit" />
        </div>
      </form>
      <div className="comments__list">
        {COMENTS?.map((comment) => (
          <div key={comment.id} className="comment__box">
            <div className="comment__profile-box">
              <div className="comment__email">{comment.email}</div>
              <div className="comment__createdAt">{comment.createdAt}</div>
              <div className="comment__delete">삭제</div>
            </div>
            <div className="comment__text">{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
