import { SyntheticEvent } from "react"
import { useAppSelector } from "../../hooks"
import { store } from "../../store"
import { closeLoginDialog, closeRegisterDialog, toggleLoginDialog, toggleRegisterDialog } from "../../store/user-slice"
import LogIn from "../log-in/log-in"
import Register from "../register/register"

function UserNav(): JSX.Element {
  const registerOpen = useAppSelector(state => state.USER.isRegister)
  const loginOpen = useAppSelector(state => state.USER.isLogin)

  const onLogInClickHandler = (evt: SyntheticEvent) => {
    evt.preventDefault()
    store.dispatch(toggleLoginDialog())
    if (registerOpen) {
      store.dispatch(closeRegisterDialog())
    }
  }

  const onRegisterClickHandler = (evt: SyntheticEvent) => {
    evt.preventDefault()
    store.dispatch(toggleRegisterDialog())
    if (loginOpen) {
      store.dispatch(closeLoginDialog())
    }
  }

  return (
    <div className="user-login">
      <div className="user-login__form-wrapper">
        <a onClick={onLogInClickHandler} className="user-login__link" href="/#">Login</a>
        <a onClick={onRegisterClickHandler} className="user-login__link" href="/#">Register</a>
        {loginOpen && <LogIn />}
        {registerOpen && <Register />}
      </div>
    </div>
  )
}

export default UserNav
