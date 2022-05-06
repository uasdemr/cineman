import { useEffect } from "react"
import { useAppSelector } from "../../hooks"
import { store } from "../../store"
import { fetchFavoritesFilmsAction } from "../../store/api-actions"
import FilmList from "../film-list/film-list"

function Favorites() {
  const films = useAppSelector(state => state.DATA.favoritesFilms)

  useEffect(() => {
    store.dispatch(fetchFavoritesFilmsAction({}))
  }, [])


  return (
    <section className="films">
      {!films && <div>Загрузка...</div>}
      <FilmList isExtra={false} films={films} />
    </section>
  )
}

export default Favorites
