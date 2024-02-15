import { useState } from "react";
import { app } from "firebaseApp";
import { getAuth } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "./components/Router";

function App() {
  const auth = getAuth(app);

  // firebase Auth가 인증되었으면 true로 변경해주는 로직 추가
  const [isAuthEnticated, setIsAuthEnticated] = useState<boolean>(
    !!auth?.currentUser
  );
  return (
    <>
      <ToastContainer />
      <Router isAuthEnticated={isAuthEnticated} />
    </>
  );
}

export default App;
