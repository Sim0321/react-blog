import { Link } from "react-router-dom";
import "../styles/components/Header.style.css";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        React Blog
      </Link>
      <div>
        <Link to="/posts/create">글쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">프로필</Link>
      </div>
    </header>
  );
}
