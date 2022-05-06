import { Film } from "../../types/film"
import FilmList from "../film-list/film-list"

type MostCommentedExtraType = {
  mostCommentedFilms: Film[]
}

function MostCommentedExtra({mostCommentedFilms}: MostCommentedExtraType): JSX.Element {
  return (
    <section className="films-list films-list--extra">
      <h2 className="films-list__title">Most commented</h2>

      <FilmList isExtra={true} films={mostCommentedFilms}/>

    </section>
  )
}

export default MostCommentedExtra
