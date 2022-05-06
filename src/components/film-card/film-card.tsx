import { SyntheticEvent } from "react"
import { useAppSelector } from "../../hooks"
import { store } from "../../store"
import {
  addFilmToFavoritesAction,
  addFilmToWatchAction,
  addFilmToWatchedAction,
  fetchFilmByIdAction,
  removeFilmFromFavoritesAction,
  removeFilmFromToWatchAction,
  removeFilmFromWatchedAction
} from "../../store/api-actions"

import {
  openModal,
  removeFilmfromFavorites,
  removeFilmfromToWatch,
  removeFilmfromWatched
} from "../../store/films-slice"

import { Film } from "../../types/film"
import getLimitDescription from "../../utils"

type FilmCardType = { card: Film }

function FilmCard({ card }: FilmCardType) {
  const user = useAppSelector(state => state.USER.user)

  const onFavoriteClickHandler = (evt: SyntheticEvent) => {
    if (user.favorites && card) {
      if (!user.favorites.includes(card._id)) {
        store.dispatch(addFilmToFavoritesAction({ id: card._id }))
      } else {
        store.dispatch(removeFilmFromFavoritesAction({ id: card._id }))
        store.dispatch(removeFilmfromFavorites({ id: card._id }))
      }
    }
  }

  const onWatchedClickHandler = (evt: SyntheticEvent) => {
    if (user.watched && card) {
      if (!user.watched.includes(card._id)) {
        store.dispatch(addFilmToWatchedAction({ id: card._id }))
      } else {
        store.dispatch(removeFilmFromWatchedAction({ id: card._id }))
        store.dispatch(removeFilmfromWatched({ id: card._id }))
      }
    }
  }

  const onToWatchClickHandler = (evt: SyntheticEvent) => {
    if (user.towatch && card) {
      if (!user.towatch.includes(card._id)) {
        store.dispatch(addFilmToWatchAction({ id: card._id }))
      } else {
        store.dispatch(removeFilmFromToWatchAction({ id: card._id }))
        store.dispatch(removeFilmfromToWatch({ id: card._id }))
      }
    }
  }

  const isFavorite = () => {
    if (user.id && user.favorites.includes(card._id)) {
      return 'film-card__controls-item--active'
    } else return ''
  }

  const isWatched = () => {
    if (user.id && user.watched.includes(card._id)) {
      return 'film-card__controls-item--active'
    } else return ''
  }

  const isToWatch = () => {
    if (user.id && user.towatch.includes(card._id)) {
      return 'film-card__controls-item--active'
    } else return ''
  }

  const onCardClickHandler = (id: string) => {
    store.dispatch(fetchFilmByIdAction(id))
    store.dispatch(openModal())
  }

  const filmDescription = getLimitDescription(card.filmInfo.description);

  return (
    <article className="film-card">
      <h3 className="film-card__title">{card.filmInfo.title}</h3>
      <p className="film-card__rating">{card.filmInfo.totalRating}</p>
      <p className="film-card__info">
        <span className="film-card__year">{card.filmInfo.release.date}</span>
        <span className="film-card__duration">1h 55m</span>
        <span className="film-card__genre">{card.filmInfo.genre.join(', ')}</span>
      </p>

      <img
        onClick={() => { onCardClickHandler(card._id) }}
        src={'/' + card.filmInfo.poster}
        alt=""
        className="film-card__poster"
      />

      <p className="film-card__description">{filmDescription}</p>

      <a href="/#" className="film-card__comments">{card.comments ? card.comments.length : 0} comments</a>

      <div className="film-card__controls">
        <button
          onClick={(evt) => { onToWatchClickHandler(evt) }}
          className={`film-card__controls-item button film-card__controls-item--add-to-watchlist ${isToWatch()}`}
          type="button"
        >
          Add to watchlist
        </button>

        <button
          onClick={(evt) => { onWatchedClickHandler(evt) }}
          className={`film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched()}`}
          type="button"
        >
          Mark as watched
        </button>

        <button
          onClick={(evt) => { onFavoriteClickHandler(evt) }}
          className={`film-card__controls-item button film-card__controls-item--favorite ${isFavorite()}`}
          type="button"
        >
          Mark as favorite
        </button>
      </div>

    </article>
  )
}

export default FilmCard
