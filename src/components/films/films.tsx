import { useAppSelector } from "../../hooks"
import FilmList from "../film-list/film-list"
import MostCommentedExtra from "../most-commented-extra/most-commented-extra"
import ShowMoreButton from "../show-more-button/show-more"
import TopRatedExtra from "../top-rated-extra/top-rated-extra"

function Films() {
  const films = useAppSelector(state => state.DATA.films)
  const topRatedFilms = useAppSelector(state => state.DATA.topRatedFilms)
  const mostCommentedFilms = useAppSelector(state => state.DATA.mostCommentedFilms)

  return (
    <section className="films">
      <FilmList isExtra={false} films={films}/>
      <ShowMoreButton />
      <TopRatedExtra topRatedFilms={topRatedFilms} />
      <MostCommentedExtra mostCommentedFilms={mostCommentedFilms} />
    </section>
  )
}

export default Films
