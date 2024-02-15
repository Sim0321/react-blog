import { useState } from "react";
import { Link } from "react-router-dom";
import { app } from "firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Loading from "./Loading";

interface InfoState {
  email: string;
  password: string;
  password_confirm: string;
}
export default function SignupForm() {
  // 1. input에 디바운스 걸기
  // 2. input을 ref로
  // 3. 비밀번호 암호화(hash)

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [signupInfo, setSignupInfo] = useState<InfoState>({
    email: "",
    password: "",
    password_confirm: "",
  });

  // 정규식을 빼서 onChange 될 때마다 변수 선언이 아닌 재사용(최적화)
  const validRegex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = e.target;
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
      } else if (
        signupInfo.password_confirm?.length > 0 &&
        value !== signupInfo.password_confirm
      ) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.");
      } else {
        setError("");
      }
    }

    if (name === "password_confirm") {
      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요");
      } else if (value !== signupInfo.password) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.");
      } else {
        setError("");
      }
    }

    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(
        auth,
        signupInfo.email,
        signupInfo.password
      );
      toast.success("회원가입에 성공했습니다.");
      setSignupInfo({
        email: "",
        password: "",
        password_confirm: "",
      });
    } catch (error: any) {
      toast.error(error?.code);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <form onSubmit={onSubmit} className="form form--lg">
      <h1 className="form__title">회원가입</h1>
      <div className="form__block">
        <span className="email">이메일</span>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={onChange}
          autoComplete="off"
          value={signupInfo.email}
        />
      </div>
      <div className="form__block">
        <span className="password">비밀번호</span>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={onChange}
          autoComplete="off"
          value={signupInfo.password}
        />
      </div>

      <div className="form__block">
        <span className="password_confirm">비밀번호 확인</span>
        <input
          type="password"
          name="password_confirm"
          id="password_confirm"
          required
          onChange={onChange}
          autoComplete="off"
          value={signupInfo.password_confirm}
        />
      </div>
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        계정이 이미 있으신가요?
        <Link to="/login" className="form__link">
          로그인하기
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
