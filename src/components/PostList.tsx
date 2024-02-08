import { Link } from "react-router-dom";

interface PostListProps {
  hasNavigation?: boolean;
}

export default function PostList({ hasNavigation = true }: PostListProps) {
  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div className="post__navigation--active">전체</div>
          <div>나의 글</div>
        </div>
      )}
      <div className="post__list">
        {[...Array(3)].map((e, i) => (
          <div key={i} className="post__box">
            <Link to={`/posts/${i}`}>
              <div className="post__meta-box">
                <div className="post__profile-box">
                  <div className="post__profile-img"></div>
                  <div className="post__author-name">test@naver.com</div>
                </div>
                <div className="post__utils-box">
                  <div className="post__delete">삭제</div>
                  <div className="post__edit">수정</div>
                </div>
              </div>
              <div className="post__img"></div>
              <div className="post__title">게시글{i}</div>
              <div className="post__text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
                distinctio, laborum aliquid exercitationem nihil iure
                consectetur quo eaque, tempora error itaque soluta. Eligendi
                soluta distinctio assumenda rerum repudiandae ipsam aut.
              </div>
              <div className="post__category">
                <span>category</span>
              </div>

              <div className="post__info-box">
                <div className="post__date">2023.6.13 금요일</div>·
                <div className="post__comment">0개의 댓글</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
