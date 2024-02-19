import AuthContext from "context/AuthContext";
import "../styles/components/Profile.style.css";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import { useContext } from "react";
import Avatar from "../assets/png/profile.png";

export default function Profile() {
  // const auth = getAuth(app);
  const { user } = useContext(AuthContext);
  console.log(user);

  // console.log(user);

  const onsignOut = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      toast.success("로그아웃 되었습니다.");
    } catch (error: any) {
      toast.error(error?.code);
    }
  };

  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image">
          <img
            src={user?.photoURL ? user?.photoURL : Avatar}
            alt="profile-img"
          />
        </div>
        <div>
          <div className="profile__email">{user?.email}</div>
          <div className="profile__name">
            {user?.displayName || user?.email?.split("@")[0]}
          </div>
        </div>
      </div>
      <div role="presentation" className="profile__logout" onClick={onsignOut}>
        로그아웃
      </div>
    </div>
  );
}
