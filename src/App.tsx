import { useEffect, useState } from "react";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "./components/Router";
import Loading from "components/Loading";

function App() {
  const auth = getAuth(app);

  // auth를 체크하지 전에 (initialize 전)에는 loader를 띄워주는 용도(로그인이 되어있고 새로고침 시 router가 인식하지 못해 login페이지를 보여줬다가 main으로 가지는 이슈)
  const [init, setInit] = useState<boolean>(false);

  // auth의 currentUser가 있으면 true 없으면 false
  const [isAuthEnticated, setIsAuthEnticated] = useState<boolean>(
    !!auth?.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthEnticated(true);
      } else {
        setIsAuthEnticated(false);
      }
      setInit(true);
    });
  }, [auth]);
  return (
    <>
      <ToastContainer />
      {init ? <Router isAuthEnticated={isAuthEnticated} /> : <Loading />}
    </>
  );
}

export default App;
