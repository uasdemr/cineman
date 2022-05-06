import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks"

function Navigation(): JSX.Element {
  const user = useAppSelector(state => state.USER.user)
  const authorizationStatus = useAppSelector(state => state.USER.authorizationStatus)
  const [filter, setFilter] = useState<string | undefined>('all')

  useEffect(() => {
    setFilter('all')
  }, [authorizationStatus])

  return ((
    <nav className="main-navigation">
      <div className="main-navigation__items">
        <Link
          to="/"
          className={`main-navigation__item ${filter === 'all' ? 'main-navigation__item--active' : ''}`}
          data-all="all"
          onClick={(evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => { setFilter(evt.currentTarget.dataset.all) }}
        >
          All movies
        </Link>

        <Link
          to="/watchlist"
          className={`main-navigation__item ${filter === 'watchlist' ? authorizationStatus && 'main-navigation__item--active' : ''}`}
          data-watchlist="watchlist"
          onClick={(evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => { authorizationStatus && setFilter(evt.currentTarget.dataset.watchlist) }}
        >
          Watchlist
          {
            user.towatch ? <span className="main-navigation__item-count">{user.towatch.length}</span> : ''
          }
        </Link>

        <Link
          to="/history"
          className={`main-navigation__item ${filter === 'history' ? authorizationStatus && 'main-navigation__item--active' : ''}`}
          data-history="history"
          onClick={(evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => { authorizationStatus && setFilter(evt.currentTarget.dataset.history) }}
        >
          History
          {user.watched ? <span className="main-navigation__item-count">{user.watched.length}</span> : ''}
        </Link>

        <Link
          to="/favorites"
          className={`main-navigation__item ${filter === 'favorites' ? authorizationStatus && 'main-navigation__item--active' : ''}`}
          onClick={(evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => { authorizationStatus && setFilter(evt.currentTarget.dataset.favorites) }}
          data-favorites="favorites"
        >
          Favorites
          {user.favorites ? <span className="main-navigation__item-count">{user.favorites.length}</span> : ''}
        </Link>
      </div>
      <Link
        to="/stats"
        className={`main-navigation__additional ${filter === 'stats' ? authorizationStatus && 'main-navigation__item--active' : ''}`}
        onClick={(evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => { authorizationStatus && setFilter(evt.currentTarget.dataset.stats) }}
        data-stats="stats"
      >
        Stats
      </Link>
    </nav>
  ))
}

export default Navigation
