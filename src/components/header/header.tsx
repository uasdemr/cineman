import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks"
import LoggedIn from "../logged-in/logged-in"
import UserNav from "../user-nav/user-nav"

function Header() {
  const authorizationStatus = useAppSelector(state => state.USER.authorizationStatus)
  const isLoading = useAppSelector(state => state.USER.isLoading)

  return (
    <header className="header">
      <Link to='/films'>
        <h1 className="header__logo logo">Cinemaddict</h1>
      </Link>
      {authorizationStatus && <LoggedIn />}
      {!authorizationStatus && !isLoading && <UserNav />}

    </header>
  )
}

export default Header
