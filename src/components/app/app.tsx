import { useEffect } from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { getToken } from "../../services/token"
import { store } from "../../store"
import { checkAuthAction, fetchMostCommentedFilmsAction, fetchRatedFilmsAction } from "../../store/api-actions"
import { loadUserFromStorage } from "../../store/user-slice"
import Favorites from "../favorites/favorites"
import Films from "../films/films"
import History from "../history/history"
import Layout from "../layout/layout"
import PrivateRoute from "../private-router/private-router"
import Stats from "../stats/stats"
import WatchList from "../watch-list/watch-list"

function App(): JSX.Element {
  let authorizationStatus = useAppSelector(state => state.USER.authorizationStatus)

  useEffect(() => {
    store.dispatch(fetchRatedFilmsAction())
    store.dispatch(fetchMostCommentedFilmsAction())

  }, [])

  useEffect(() => {
    const token = getToken()
    if (token) {
      const parseToken = token.split('.')[1]
      const user = JSON.parse(atob(parseToken))
      delete user.exp
      delete user.iat
      store.dispatch(loadUserFromStorage(user))
      store.dispatch(checkAuthAction());
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          {/* <Route path="films"> */}
            <Route index element={<Films />} />

            <Route
              path="favorites"
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <Favorites />
                </PrivateRoute>
              }
            />

            <Route
              path="history"
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <History />
                </PrivateRoute>
              }
            />

            <Route
              path="watchlist"
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <WatchList />
                </PrivateRoute>
              }
            />

            <Route
              path="stats"
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <Stats />
                </PrivateRoute>
              }
            />

          {/* </Route> */}
        </Route>

        <Route path="*" element={
          <>
            <h1>
              404.
              <br />
              <small>Page not found</small>
            </h1>
            <Link to='/'>Go to main page</Link>
          </>
        }
        />
      </Routes>

    </BrowserRouter>
  )
}

export default App
