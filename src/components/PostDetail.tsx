import { Link, useNavigate, useParams } from "react-router-dom";
import "styles/components/PostDetail.style.css";
import Avatar from "../assets/png/profile.png";
import { useContext, useEffect, useState } from "react";
import AuthContext from "context/AuthContext";
import { PostState } from "type";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import Loading from "./Loading";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Carousel from "./Carousel";
import { toast } from "react-toastify";
import Comments from "./Comments";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function PostDetail() {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostState | null>(null);

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      // console.log(docSnap.data());

      setPost({
        id: docSnap.id,
        ...(docSnap.data() as PostState),
      });
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");

    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
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
                onClick={(e) => handleDelete(e)}
              >
                삭제
              </div>
              <div className="post__edit">
                <Link to={`/posts/edit/${post.id}`}>수정</Link>
              </div>
            </div>
            <div className="post__title">{post?.title}</div>
            {post?.category && (
              <div className="post__category">
                <span>{post?.category}</span>
              </div>
            )}
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
            <Comments post={post} getPost={getPost} />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
