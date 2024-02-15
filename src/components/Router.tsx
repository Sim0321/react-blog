import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "pages/main";
import PostList from "pages/posts";
import PostDetail from "pages/posts/detail";
import PostCreate from "pages/posts/create";
import PostEdit from "pages/posts/edit";
import Profile from "pages/profile";
import LoginPage from "pages/login";
import SignupPage from "pages/signup";

interface RouterProps {
  isAuthEnticated: boolean;
}

export default function Router({ isAuthEnticated }: RouterProps) {
  return (
    <Routes>
      {isAuthEnticated ? (
        <>
          <Route path="/" element={<MainPage />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/create" element={<PostCreate />} />
          <Route path="/posts/edit/:id" element={<PostEdit />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<LoginPage />} />
        </>
      )}
    </Routes>
  );
}
