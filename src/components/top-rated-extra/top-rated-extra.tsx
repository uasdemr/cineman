import { Film } from "../../types/film"
import FilmList from "../film-list/film-list"

type TopRatedExtraType = {
  topRatedFilms: Film[]
}

function TopRatedExtra({topRatedFilms}: TopRatedExtraType): JSX.Element {
  return (
    <section className="films-list films-list--extra">
      <h2 className="films-list__title">Top rated</h2>

      <FilmList isExtra={true} films={topRatedFilms} />
    </section>
  )
}

export default TopRatedExtra
