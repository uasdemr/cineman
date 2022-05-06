import { useEffect } from "react"
import { useAppSelector } from "../../hooks"
import { store } from "../../store"
import { fetchWatchedFilmsAction } from "../../store/api-actions"
import FilmList from "../film-list/film-list"

function History() {
  const films = useAppSelector(state => state.DATA.watchedFilms)
  // const [favorites, setFavorites] = useState<Film[]>([])


  useEffect(() => {
    store.dispatch(fetchWatchedFilmsAction({}))
    // setFavorites(films)
  }, [])


  return (
    <section className="films">
      {!films && <div>Загрузка...</div>}
      <FilmList isExtra={false} films={films} />
    </section>
  )
}

export default History
