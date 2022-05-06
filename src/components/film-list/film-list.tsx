import { useAppSelector } from "../../hooks"
import { Film } from "../../types/film";
import FilmCard from "../film-card/film-card"
type FilmListType = {
  isExtra: boolean;
  films: Film[];
}

function FilmList({ isExtra, films }: FilmListType): JSX.Element {

  const isDataLoaded = useAppSelector(state => state.DATA.isDataLoaded)

  if (isExtra) {
    films = films.slice(0, 2)
  }

  return (
    <section className="films-list">
      <h2 className="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div className="films-list__container">
        {!isDataLoaded && <div>Загрузка...</div>}
        {films.map(card => <FilmCard card={card} key={card._id} />)}
      </div>

    </section>
  )
}

export default FilmList
