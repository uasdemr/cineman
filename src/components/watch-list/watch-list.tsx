import { useEffect } from "react"
import { useAppSelector } from "../../hooks"
import { store } from "../../store"
import { fetchToWatchFilmsAction } from "../../store/api-actions"
import FilmList from "../film-list/film-list"

function WatchList() {
  const films = useAppSelector(state => state.DATA.towatchFilms)

  useEffect(() => {
    store.dispatch(fetchToWatchFilmsAction({}))
  }, [])

  return (
    <section className="films">
      {!films && <div>Загрузка...</div>}
      <FilmList isExtra={false} films={films} />
    </section>
  )
}

export default WatchList
