import { Link, useParams } from "react-router-dom";
import "../styles/components/PostDetail.style.css";
import Avatar from "../assets/png/profile.png";
import { useContext, useEffect, useState } from "react";
import AuthContext from "context/AuthContext";
import { PostState } from "interface";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import Loading from "./Loading";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Carousel from "./Carousel";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function PostDetail() {
  const { user } = useContext(AuthContext);
  const params = useParams();

  const [post, setPost] = useState<PostState | null>(null);

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());

      setPost({
        id: docSnap.id,
        ...(docSnap.data() as PostState),
      });
    }
  };

  const handleDelete = () => {
    console.log("delete");
  };

  useEffect(() => {
    if (params?.id) {
      getPost(params?.id);
    }
  }, [params.id]);

  return (
    <>
      <div className="post__detail">
        {post ? (
          <div className="post__box">
            <div className="post__utils-box">
              <div
                className="post__delete"
                role="presentation"
                onClick={handleDelete}
              >
                삭제
              </div>
              <div className="post__edit">
                <Link to={`/posts/edit/${post.id}`}>수정</Link>
              </div>
            </div>
            <div className="post__title">{post?.title}</div>
            {post.imgUrl.length > 0 && (
              <div className="post__img">
                <Carousel imgList={post.imgUrl} />
              </div>
            )}
            <div className="post__profile-box">
              <div className="post__profile-img">
                <img
                  src={user?.photoURL ? user?.photoURL : Avatar}
                  alt="profile-img"
                />
              </div>
              <div className="post__author-name">test@naver.com</div>
              <div className="post__date">{dayjs(post.createAt).fromNow()}</div>
            </div>

            <div className="post__text post__text--pre-wrap">
              {post.content}
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
