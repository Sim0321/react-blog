import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/main";
import PostList from "../pages/posts";
import PostDetail from "../pages/posts/detail";
import PostCreate from "../pages/posts/create";
import PostEdit from "../pages/posts/edit";
import Profile from "../pages/profile";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/posts/create" element={<PostCreate />} />
      <Route path="/posts/edit/:id" element={<PostEdit />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
