import { useEffect, useState, useContext } from "react";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "context/ThemeContext";

import Router from "./components/Router";
import Loading from "components/Loading";

function App() {
  const context = useContext(ThemeContext);
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
    <div className={context.theme === "light" ? "white" : "dark"}>
      <ToastContainer />
      {init ? <Router isAuthEnticated={isAuthEnticated} /> : <Loading />}
    </div>
  );
}

export default App;
