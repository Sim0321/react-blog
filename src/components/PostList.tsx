import { useNavigate } from "react-router-dom";
import Carousel from "components/Carousel";
import { useContext, useEffect, useState } from "react";
import "../styles/components/PostList.style.css";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import Avatar from "../assets/png/profile.png";
import { PostState } from "interface";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { toast } from "react-toastify";

dayjs.locale("ko");
dayjs.extend(relativeTime);

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType;
}

type TabType = "all" | "my";

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const [posts, setPosts] = useState<PostState[]>([]);

  const { user } = useContext(AuthContext);

  const clickToDetail = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    console.log("detail로 눌ㄹ미");
    // e.stopPropagation();
    if (id) {
      navigate(`/posts/${id}`);
    }
  };

  const clickEdit = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    navigate(`/posts/edit/${id}`);
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    e.stopPropagation();

    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");

    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));
      toast.success("게시글을 삭제했습니다.");
      getPosts(); //변경된 post 리스트 가져오기
    }
  };

  const getPosts = async () => {
    setPosts([]); // posts 초기화

    const postsRef = collection(db, "posts");
    // const datas = await getDocs(collection(db, "posts"));
    let postsQuery;

    // 만약 firestore의 orderby를 하고 싶다면 이런식으로
    // const postsRef = collection(db, "posts");
    // const postsQuery = query(postsRef, orderBy("createdAt", "asc"));
    // const queryData = await getDocs(postsQuery);

    if (activeTab === "my" && user) {
      // 나의 글만 필터링
      postsQuery = query(postsRef, where("uid", "==", user.uid));
    } else {
      // 모든 글 보여주기
      postsQuery = postsRef;
    }
    const datas = await getDocs(postsQuery);
    datas?.forEach((doc) => {
      console.log(doc);
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostState]);
    });
  };

  useEffect(() => {
    getPosts();
  }, [activeTab]);

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            className={activeTab === "all" ? "post__navigation--active" : ""}
            onClick={() => setActiveTab("all")}
          >
            전체
          </div>
          <div
            role="presentation"
            className={activeTab === "my" ? "post__navigation--active" : ""}
            onClick={() => setActiveTab("my")}
          >
            나의 글
          </div>
        </div>
      )}
      <div className="post__list">
        {posts?.length > 0 ? (
          posts
            .sort((a, b) => (a.createAt > b.createAt ? -1 : 1))
            .map((post: PostState) => (
              <div
                key={post.id}
                className="post__box"
                onClick={(e) => post.id && clickToDetail(e, post.id)}
              >
                <div className="post__meta-box">
                  <div className="post__profile-box">
                    <div className="post__profile-img">
                      <img
                        src={user?.photoURL ? user?.photoURL : Avatar}
                        alt="profile-img"
                      />
                    </div>
                    <div className="post__author-name">{post.email}</div>
                  </div>
                  {post.email === user?.email && (
                    <div className="post__utils-box">
                      <div
                        className="post__delete"
                        role="presentation"
                        onClick={(e) => post.id && handleDelete(e, post.id)}
                      >
                        삭제
                      </div>
                      <div
                        className="post__edit"
                        onClick={(e) => post.id && clickEdit(e, post.id)}
                      >
                        수정
                      </div>
                    </div>
                  )}
                </div>
                {post.imgUrl.length > 0 && (
                  <div className="post__img">
                    <Carousel imgList={post.imgUrl} />
                  </div>
                )}
                <div className="post__title">{post.title}</div>
                <div className="post__text">{post.summary}</div>
                <div className="post__category">
                  <span>category</span>
                </div>

                <div className="post__info-box">
                  <div className="post__date">
                    {dayjs(post.createAt).fromNow()}
                  </div>
                  ·<div className="post__comment">0개의 댓글</div>
                </div>
              </div>
            ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
