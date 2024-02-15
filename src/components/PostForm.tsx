import { useRef, useState } from "react";
import Icon from "./Icon";

export default function PostForm() {
  const imageInput = useRef(null);
  const [imgList, setImgList] = useState([]);

  const uploadImage = (e: any) => {
    console.log(e.target.files);
  };

  return (
    <form action="/post" method="POST" className="form">
      <div className="form__block">
        <span>제목</span>
        <input type="text" name="title" id="title" />
      </div>
      <div className="form__block">
        <span>요약</span>
        <input type="text" name="summary" id="summary" />
      </div>
      <div className="form__block">
        <span>내용</span>
        <textarea name="content" id="content" required />
      </div>

      {/* 추가 */}
      <div className="form__block">
        <span>사진첨부</span>
        <input
          type="file"
          name="img"
          id="img"
          multiple
          className="form__file"
          onChange={uploadImage}
          // ref={imageInput}
        />
        <label htmlFor="img" className="form__file-img"></label>
      </div>

      <div className="form__block">
        <input type="submit" value="제출" className="form__btn--submit" />
      </div>
    </form>
  );
}
