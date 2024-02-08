import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div>
      <header>
        <div>
          <Link to="/posts/create">글쓰기</Link>
          <Link to="/posts">게시글</Link>
          <Link to="/profile">프로필</Link>
        </div>
      </header>
      <div className="post__navigation">
        <div className="post__navigation--active">전체</div>
        <div>나의 글</div>
      </div>
      <div className="post__list">
        {[...Array(10)].map((e, i) => (
          <div key={i} className="post__box">
            <Link to={`/posts/${i}`}>
              <div className="post__profile-box">
                <div className="post__profile-img"></div>
                <div className="post__author-name">test@naver.com</div>
                <div className="post__date">2023.6.13 금요일</div>
              </div>
              <div className="post__title">게시글{i}</div>
              <div className="post__text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
                distinctio, laborum aliquid exercitationem nihil iure
                consectetur quo eaque, tempora error itaque soluta. Eligendi
                soluta distinctio assumenda rerum repudiandae ipsam aut.
              </div>
              <div className="post__utils-box">
                <div className="post__delete">삭제</div>
                <div className="post__edit">수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <footer>
        <Link to="/posts/create">글쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">프로필</Link>
      </footer>
    </div>
  );
}
