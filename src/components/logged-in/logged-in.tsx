import { useState } from "react";
import { useAppSelector } from "../../hooks";
import UserProfile from "../header/user-profile/user-profile";

function LoggedIn() {
  const reduxUser = useAppSelector(state => state.USER.user)
  const [isProfil, setIsProfile] = useState(false)

  const onImgClickHandler = () => {
    setIsProfile(!isProfil)
  }

  return (
    <section className="header__profile profile">
      <p className="profile__rating">{reduxUser && reduxUser.email}</p>
      <img onClick={onImgClickHandler} className="profile__avatar" src="/images/bitmap@2x.png" alt="Avatar" width="35" height="35" />
      {isProfil && <UserProfile user={reduxUser} />}
    </section>
  )
}

export default LoggedIn
