import { useState } from "react"
import { store } from "../../store"
import { setSort } from "../../store/films-slice"

function Sorting(): JSX.Element {
  const [byDate, setByDate] = useState<string | undefined>('')
  const [byRating, setByRating] = useState<string | undefined>('')

  const byDateClickHandler = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault()
    if(byRating) {
      setByRating('')
    }
    if (byDate === '') {
      setByDate(evt.currentTarget.dataset.dateAsc)
      store.dispatch(setSort(evt.currentTarget.dataset.dateAsc))
      return
    } else if (byDate === evt.currentTarget.dataset.dateAsc) {
      setByDate(evt.currentTarget.dataset.dateDesc)
      store.dispatch(setSort(evt.currentTarget.dataset.dateDesc))
      return
    } else if (byDate === evt.currentTarget.dataset.dateDesc) {
      setByDate('')
      store.dispatch(setSort(''))
      return
    }
  }

  const byRatingClickHandler = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault()
    if(byDate) {
      setByDate('')
    }
    if (byRating === '') {
      setByRating(evt.currentTarget.dataset.ratingAsc)
      store.dispatch(setSort(evt.currentTarget.dataset.ratingAsc))
      return
    } else if (byRating === evt.currentTarget.dataset.ratingAsc) {
      setByRating(evt.currentTarget.dataset.ratingDesc)
      store.dispatch(setSort(evt.currentTarget.dataset.ratingDesc))
      return
    } else if (byRating === evt.currentTarget.dataset.ratingDesc) {
      setByRating('')
      store.dispatch(setSort(''))
      return
    }
  }

  return (
    <ul className="sort">

      <li>
        <a
          href="/#"
          className={`sort__button ${byDate !== '' ? 'sort__button--active' : ''}`}
          onClick={byDateClickHandler}
          data-date-asc="dateAsc"
          data-date-desc="dateDesc"
        >
          Sort by date
        </a>
      </li>

      <li>
        <a
          href="/#"
          className={`sort__button ${byRating !== '' ? 'sort__button--active' : ''}`}
          onClick={byRatingClickHandler}
          data-rating-asc="ratingAsc"
          data-rating-desc="ratingDesc"
        >
          Sort by rating
        </a>
      </li>

    </ul>
  )
}

export default Sorting
