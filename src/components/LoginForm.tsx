import { Link, useNavigate } from "react-router-dom";
import "../styles/components/Form.style.css";
import { useState } from "react";
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loading from "./Loading";

interface LoginState {
  email: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loginInfo, setLoginInfo] = useState<LoginState>({
    email: "",
    password: "",
  });

  const validRegex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요");
      } else {
        setError("");
      }
    }

    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(
        auth,
        loginInfo.email,
        loginInfo.password
      );
      toast.success("로그인에 성공했습니다.");
      setLoginInfo({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error: any) {
      toast.error(error?.code);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <form onSubmit={onSubmit} className="form form--lg">
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <span className="email">이메일</span>
        <input
          type="email"
          name="email"
          id="email"
          required
          autoComplete="off"
          value={loginInfo.email}
          onChange={onChange}
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
          value={loginInfo.password}
          onChange={onChange}
        />
      </div>
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        계정이 없으신가요?
        <Link to="/signup" className="form__link">
          회원가입하기
        </Link>
      </div>

      <div className="form__block">
        <input
          type="submit"
          value="로그인"
          className="form__btn--submit"
          disabled={error?.length > 0}
        />
      </div>
    </form>
  );
}
