import React, { useContext, useEffect, useState } from "react";
import Icon from "./Icon";
import Carousel from "./Carousel";
import "../styles/components/PostForm.style.css";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";
import { CategoryType, PostState } from "type";
import Loading from "./Loading";
import { CATEGORIES } from "constant";

interface FormState {
  title: string;
  summary: string;
  content: string;
  category?: CategoryType | string;
  imgUrl: string[] | File[];
}

export default function PostForm() {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState<PostState | null>(null);

  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formDataInfo, setFormDataInfo] = useState<FormState>({
    title: "",
    summary: "",
    category: "",
    content: "",
    imgUrl: [],
  });

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
      setFormDataInfo({ ...formDataInfo, imgUrl: [...files] });
    }
  };

  const uploadPostWithImage = async (imgList: File[] | string[]) => {
    const formData = new FormData();
    const responseUrls: string[] = [];

    // imgList가 있다면 업로딩 progressbar 보여주기
    if (imgList.length !== 0 && typeof imgList[0] === "object") {
      setIsUploading(true);
    }

    // 만약 type이 file(object라면) cloudinary 들어감
    if (imgList.length !== 0 && typeof imgList[0] === "object") {
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
    }

    try {
      if (post && post.id) {
        // post가 있다면 firestore로 데이터 수정
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          title: formDataInfo.title,
          summary: formDataInfo.summary,
          content: formDataInfo.content,
          imgUrl:
            typeof imgList[0] === "object" ? responseUrls : formDataInfo.imgUrl,
          updatedAt: `${new Date()}`,
          category: formDataInfo.category,
        });
        setIsUploading(false);
        toast.success("게시글을 수정했습니다.");
        navigate(`/posts/${post.id}`);
      } else {
        // 등록 또는 생성
        await addDoc(collection(db, "posts"), {
          title: formDataInfo.title,
          summary: formDataInfo.summary,
          content: formDataInfo.content,
          imgUrl: responseUrls,
          // createAt: new Date().toLocaleString("ko", {
          //   hour: "2-digit",
          //   minute: "2-digit",
          //   second: "2-digit",
          // }),
          createAt: `${new Date()}`, // dayjs로 몇분 전 사용하기 위해 형식 변경
          category: formDataInfo.category,
          email: user?.email,
          uid: user?.uid,
        });
        setIsUploading(false);
        toast.success("게시글을 생성했습니다.");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.code);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await uploadPostWithImage(formDataInfo.imgUrl);
  };

  const getPost = async (id: string) => {
    setIsLoading(true);

    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      setPost({
        id: docSnap.id,
        ...(docSnap.data() as PostState),
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      getPost(params?.id);
    }
  }, [params.id]);

  useEffect(() => {
    if (post) {
      setFormDataInfo({
        title: post.title,
        summary: post.summary,
        content: post.content,
        imgUrl: post.imgUrl,
        category: post.category,
      });
    }
  }, [post]);

  const renderCarousel = () => {
    if (post) {
      return (
        <Carousel
          imgList={
            typeof formDataInfo.imgUrl[0] === "object"
              ? formDataInfo.imgUrl
              : post?.imgUrl
          }
          auto={false}
        />
      );
    } else if (formDataInfo.imgUrl.length === 0) {
      return <label htmlFor="imgUrl" className="form__file-img" />;
    } else if (formDataInfo.imgUrl.length !== 0) {
      return <Carousel imgList={formDataInfo.imgUrl} auto={false} />;
    }
  };

  if (isUploading) return <ProgressBar progress={progress} />;
  if (isLoading) return <Loading />;

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
        <span className="title">카테고리</span>
        <select
          name="category"
          id="category"
          onChange={onChange}
          defaultValue={formDataInfo.category}
        >
          <option value="">카테고리를 선택해주세요</option>
          {CATEGORIES?.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
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
          name="imgUrl"
          id="imgUrl"
          multiple
          className="form__file"
          onChange={onchangeImage}
        />

        {renderCarousel()}
        <div className="form__file-text">사진은 최대 5장까지만 가능.</div>

        {formDataInfo.imgUrl.length !== 0 && (
          <label htmlFor="imgUrl" className="form__reupload">
            <span>재업로드</span>
            <Icon name="IconLink" size={18} />
          </label>
        )}
      </div>
      <div className="form__block">
        <input
          type="submit"
          value={post ? "수정" : "제출"}
          className="form__btn--submit"
        />
      </div>
    </form>
  );
}
