export default function PostDetail() {
  return (
    <>
      <div className="post__detail">
        <div className="post__box">
          <div className="post__title">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </div>
          <div className="post__profile-box">
            <div className="post__profile-img"></div>
            <div className="post__author-name">test@naver.com</div>
            <div className="post__date">2023.6.13 금요일</div>
          </div>
          <div className="post__utils-box">
            <div className="post__delete">삭제</div>
            <div className="post__edit">수정</div>
          </div>
          <div className="post__text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
            distinctio, laborum aliquid exercitationem nihil iure consectetur
            quo eaque, tempora error itaque soluta. Eligendi soluta distinctio
            assumenda rerum repudiandae ipsam aut.
          </div>
        </div>
      </div>
    </>
  );
}
