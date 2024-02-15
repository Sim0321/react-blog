import { Link } from "react-router-dom";
import "../styles/components/Form.style.css";

export default function LoginForm() {
  return (
    <form action="/post" method="POST" className="form form--lg">
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <span className="email">이메일</span>
        <input
          type="email"
          name="email"
          id="email"
          required
          autoComplete="off"
        />
      </div>
      <div className="form__block">
        <span className="password">비밀번호</span>
        <input
          type="password"
          name="password"
          id="password"
          required
          autoComplete="off"
        />
      </div>

      <div className="form__block">
        계정이 없으신가요?
        <Link to="/signup" className="form__link">
          회원가입하기
        </Link>
      </div>

      <div className="form__block">
        <input type="submit" value="로그인" className="form__btn--submit" />
      </div>
    </form>
  );
}
