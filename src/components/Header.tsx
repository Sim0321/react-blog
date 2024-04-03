import { Link } from "react-router-dom";
import "../styles/components/Header.style.css";
import Icon from "./Icon";
import { useContext } from "react";
import ThemeContext from "context/ThemeContext";

export default function Header() {
  const context = useContext(ThemeContext);

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        React Blog
      </Link>
      <div className="header__menu">
        <Link to="/posts/create">글쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">프로필</Link>

        {context.theme === "light" ? (
          <Icon
            name="IconSun"
            size={30}
            onClick={context.toggleMode}
            className="header__theme-btn"
          />
        ) : (
          <Icon
            name="IconMoon"
            size={30}
            onClick={context.toggleMode}
            className="header__theme-btn"
          />
        )}
      </div>
    </header>
  );
}
