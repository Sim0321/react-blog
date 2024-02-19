import React, { useContext, useState } from "react";
import Icon from "./Icon";
import Carousel from "./Carousel";
import "../styles/components/PostForm.style.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";

interface FormState {
  title: string;
  summary: string;
  content: string;
}

export default function PostForm() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [imgList, setImgList] = useState<File[]>([]);

  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [formDataInfo, setFormDataInfo] = useState<FormState>({
    title: "",
    summary: "",
    content: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    setFormDataInfo({ ...formDataInfo, [name]: value });
  };

  const onchangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 5) {
      toast.warn("사진은 최대 5장까지입니다.");
    } else if (files) {
      setImgList([...files]);
    }
  };

  const uploadImage = async (imgList: File[]) => {
    const formData = new FormData();
    const responseUrls: string[] = [];
    if (imgList.length !== 0) {
      setIsUploading(true);
    }

    for (let i = 0; i < imgList.length; i++) {
      formData.append(`file`, imgList[i]);
      formData.append("upload_preset", "knexfrv5");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const responseData = await response.json();
        responseUrls.push(responseData.url);
        const percent = Math.round(((i + 1) / imgList.length) * 100);
        setProgress(percent);
      } catch (error) {
        toast.error("이미지 업로드가 실패했습니다.");
      }
    }

    try {
      await addDoc(collection(db, "posts"), {
        title: formDataInfo.title,
        summary: formDataInfo.summary,
        content: formDataInfo.content,
        imgUrl: responseUrls,
        // createAt: new Date().toLocaleString(),
        createAt: `${new Date()}`, // dayjs로 몇분 전 사용하기 위해 형식 변경
        email: user?.email,
      });
      setIsUploading(false);
      toast.success("게시글을 생성했습니다.");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await uploadImage(imgList);
  };

  if (isUploading) return <ProgressBar progress={progress} />;

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <span className="title">제목</span>
        <input
          type="text"
          name="title"
          id="title"
          onChange={onChange}
          value={formDataInfo.title}
          required
        />
      </div>
      <div className="form__block">
        <span className="title">요약</span>
        <input
          type="text"
          name="summary"
          id="summary"
          onChange={onChange}
          value={formDataInfo.summary}
          required
        />
      </div>
      <div className="form__block">
        <span className="title">내용</span>
        <textarea
          name="content"
          id="content"
          required
          onChange={onChange}
          value={formDataInfo.content}
        />
      </div>
      <div className="form__block">
        <span className="title">사진첨부</span>
        <input
          type="file"
          name="img"
          id="img"
          multiple
          className="form__file"
          onChange={onchangeImage}
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
