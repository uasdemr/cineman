import { SyntheticEvent } from 'react'
import { useNavigate } from 'react-router'
import { store } from '../../../store'
import { logoutUserAction } from '../../../store/api-actions'
import { User } from '../../../types/user'

type UserProfileType = {
  user: User
}

function UserProfile({ user }: UserProfileType) {

  const navigate = useNavigate()

  const onLogOutClickHandler = (evt: SyntheticEvent) => {
    store.dispatch(logoutUserAction())
    navigate('/')
  }
  return (
    <section className="profile__user-wrapper">
      <article className="profile__user">
        <p className="profile__user-text">Favorites: <span>{user && user.favorites.length}</span></p>
        <p className="profile__user-text">Watched: <span>{user && user.watched.length}</span> </p>
        <p className="profile__user-text">To watch: <span>{user && user.towatch.length}</span></p>
        <hr />
        <div className="profile__user-actions">
          <button onClick={onLogOutClickHandler} className="profile__user-logout">LogOut</button>
        </div>
      </article>
    </section>
  )
}

export default UserProfile
