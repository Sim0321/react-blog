import { useState } from "react";
import Icon from "./Icon";
import Carousel from "./Carousel";
import "styles/PostForm.style.css";

interface ImageProps {
  url: string;
  id: number;
}

export default function PostForm() {
  const [imgList, setImgList] = useState<ImageProps[]>([]);

  const uploadImage = (e: any) => {
    let urlArr = [];
    if (e.target.files.length > 5) {
      alert("사진은 최대 5장까지입니다.");
    } else {
      for (let i = 0; i < e.target.files.length; i++) {
        urlArr.push({
          url: URL.createObjectURL(e.target.files[i]),
          id: i,
        });
      }
      setImgList(urlArr);
    }
  };

  return (
    <form action="/post" method="POST" className="form">
      <div className="form__block">
        <span className="title">제목</span>
        <input type="text" name="title" id="title" />
      </div>
      <div className="form__block">
        <span className="title">요약</span>
        <input type="text" name="summary" id="summary" />
      </div>
      <div className="form__block">
        <span className="title">내용</span>
        <textarea name="content" id="content" required />
      </div>

      <div className="form__block">
        <span className="title">사진첨부</span>
        <input
          type="file"
          name="img"
          id="img"
          multiple
          className="form__file"
          onChange={uploadImage}
        />
        {imgList.length === 0 ? (
          <label htmlFor="img" className="form__file-img" />
        ) : (
          <div className="form__carousel">
            <Carousel imgList={imgList} auto={false} />
          </div>
        )}
        <div className="form__file-text">사진은 최대 5장까지만 가능.</div>

        {imgList.length !== 0 && (
          <label htmlFor="img" className="form__reupload">
            <span>재업로드</span>
            <Icon name="IconLink" size={18} />
          </label>
        )}
      </div>

      <div className="form__block">
        <input type="submit" value="제출" className="form__btn--submit" />
      </div>
    </form>
  );
}
