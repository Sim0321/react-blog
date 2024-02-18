import { useNavigate } from "react-router-dom";
import Carousel from "components/Carousel";
import { useContext, useEffect, useState } from "react";
import "../styles/components/PostList.style.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { Link } from "react-router-dom";

interface PostListProps {
  hasNavigation?: boolean;
}

interface PostState {
  id: string;
  title: string;
  summary: string;
  content: string;
  createAt: string;
  email: string;
  imgUrl: string[] | [];
}

type TabType = "all" | "my";

export default function PostList({ hasNavigation = true }: PostListProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [posts, setPosts] = useState<PostState[]>([]);

  const { user } = useContext(AuthContext);

  const clickToDetail = (id: string) => {
    navigate(`/posts/${id}`);
  };

  const getPosts = async () => {
    const datas = await getDocs(collection(db, "posts"));

    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostState]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);
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
          posts.map((post) => (
            <div
              key={post.id}
              className="post__box"
              onClick={() => clickToDetail(post.id)}
            >
              <div className="post__meta-box">
                <div className="post__profile-box">
                  <div className="post__profile-img"></div>
                  <div className="post__author-name">{post.email}</div>
                </div>
                {post.email === user?.email && (
                  <div className="post__utils-box">
                    <div className="post__delete">삭제</div>
                    <div className="post__edit">
                      <Link to={`/posts/edit/${post.id}`}>수정</Link>
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
                <div className="post__date">{post.createAt}</div>·
                <div className="post__comment">0개의 댓글</div>
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
