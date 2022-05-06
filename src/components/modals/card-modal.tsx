import moment from 'moment';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { addFilmToFavoritesAction, addFilmToWatchAction, addFilmToWatchedAction, removeFilmFromFavoritesAction, removeFilmFromToWatchAction, removeFilmFromWatchedAction, addCommentAction } from '../../store/api-actions';
import { closeModal, removeFilmfromFavorites, removeFilmfromToWatch, removeFilmfromWatched } from '../../store/films-slice';
import CommentList from '../comment-list/comment-list';
import CommentNew from '../comment-new/comment-new';


// root element for modal rendering
const renderElement = document.getElementById('root')
if (renderElement) {
  ReactModal.setAppElement(renderElement);
}

function CardModal(): JSX.Element {
  const user = useAppSelector(state => state.USER.user)
  const authorizationStatus = useAppSelector(state => state.USER.authorizationStatus)

  const isModal = useAppSelector(state => state.DATA.isModal)
  const modalData = useAppSelector(state => state.DATA.modalData)

  const [emotion, setEmotion] = useState('')
  const [comment, setComment] = useState('')

  const onCommentChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.currentTarget.value)
  }

  const onEmojiClickHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmotion(evt.currentTarget.value)
  }

  const getComment = () => {
    return {
      emotion: emotion,
      comment: comment,
      author: user.email,
    }
  }

  const clearComment = () => {
    setComment('')
    setEmotion('')
    // Допилить - Убрать чекнутый checkbox
  }

  const onFormSubmitHandler = (evt: KeyboardEvent) => {
    if ((evt.ctrlKey && evt.code === 'Enter') || (evt.ctrlKey && evt.code === 'NumpadEnter')) {
      evt.preventDefault()
      const comment = getComment()
      // Диспатчить тут Санку на сервер
      if (modalData?._id) {
        store.dispatch(addCommentAction({ filmId: modalData?._id, comment: comment }))
      }
      clearComment()

    }
  }

  const closeModalHandler = () => {
    store.dispatch(closeModal())
  }

  useEffect(() => {
    document.addEventListener('keydown', onFormSubmitHandler);
    return () => {
      document.removeEventListener('keydown', onFormSubmitHandler);
    };
  });



  const releaseDate = moment(modalData?.filmInfo.release.date).format('DD MMMM YYYY');
  const runTime = moment().startOf('day').add(modalData?.filmInfo.runtime, 'minutes');
  const runTimeHours = runTime.format('h');
  const runTimeMinutes = runTime.format('mm');
  const runTimeValue = `${runTimeHours + 'h ' + runTimeMinutes + ' m'}`;

  const genres = modalData?.filmInfo.genre.map((genre, key) => {
    return (
      <span className="film-details__genre" key={key}>
        {genre}
      </span>
    );
  });

  const isFavorite = () => {
    if (user.id && modalData && user.favorites.includes(modalData._id)) {
      return true
    } else return false
  }

  const isWatched = () => {
    if (user.id && modalData && user.watched.includes(modalData._id)) {
      return true
    } else return false
  }

  const isToWatch = () => {
    if (user.id && modalData && user.towatch.includes(modalData._id)) {
      return true
    } else return false
  }

  const onFavoriteClickHandler = (evt: SyntheticEvent) => {
    if (user.favorites && modalData) {
      if (!user.favorites.includes(modalData._id)) {
        console.log('NOT includes: ', modalData._id);
        store.dispatch(addFilmToFavoritesAction({ id: modalData._id }))

      } else {
        console.log('includes: ', modalData._id);
        store.dispatch(removeFilmFromFavoritesAction({ id: modalData._id }))
        store.dispatch(removeFilmfromFavorites({ id: modalData._id }))
      }
    }
  }

  const onWatchedClickHandler = (evt: SyntheticEvent) => {
    if (user.watched && modalData) {
      if (!user.watched.includes(modalData._id)) {
        console.log('NOT includes: ', modalData._id);

        store.dispatch(addFilmToWatchedAction({ id: modalData._id }))
      } else {
        console.log('includes: ', modalData._id);
        store.dispatch(removeFilmFromWatchedAction({ id: modalData._id }))
        store.dispatch(removeFilmfromWatched({ id: modalData._id }))
      }
    }
  }

  const onToWatchClickHandler = (evt: SyntheticEvent) => {
    if (user.towatch && modalData) {
      if (!user.towatch.includes(modalData._id)) {
        console.log('NOT includes: ', modalData._id);
        store.dispatch(addFilmToWatchAction({ id: modalData._id }))
      } else {
        console.log('includes: ', modalData._id);
        store.dispatch(removeFilmFromToWatchAction({ id: modalData._id }))
        store.dispatch(removeFilmfromToWatch({ id: modalData._id }))
      }
    }
  }


  const handleAfterOpenFunc = () => { }
  const handleAfterCloseFunc = () => { }
  // const handleRequestCloseFunc = () => { }

  return (
    <ReactModal

      isOpen={
        isModal
  /* Boolean describing if the modal should be shown or not. */}

      onAfterOpen={
        handleAfterOpenFunc
  /* Function that will be run after the modal has opened. */}

      onAfterClose={
        handleAfterCloseFunc
  /* Function that will be run after the modal has closed. */}

      onRequestClose={
        closeModalHandler
  /* Function that will be run when the modal is requested
     to be closed (either by clicking on overlay or pressing ESC).
     Note: It is not called if isOpen is changed by other means. */}

      closeTimeoutMS={
        0
  /* Number indicating the milliseconds to wait before closing
     the modal. */}

      style={
        { overlay: {}, content: {} }
  /* Object indicating styles to be used for the modal.
     It has two keys, `overlay` and `content`.
     See the `Styles` section for more details. */}

      contentLabel={
        "Example Modal"
  /* String indicating how the content container should be announced
     to screenreaders */}

      portalClassName={
        "ReactModalPortal"
  /* String className to be applied to the portal.
     See the `Styles` section for more details. */}

      overlayClassName={
        "ReactModal__Overlay"
  /* String className to be applied to the overlay.
     See the `Styles` section for more details. */}

      id={
        "some-id"
  /* String id to be applied to the content div. */}

      className={
        "ReactModal__Content"
  /* String className to be applied to the modal content.
     See the `Styles` section for more details. */}

      bodyOpenClassName={
        "ReactModal__Body--open"
  /* String className to be applied to the document.body
     (must be a constant string).
     This attribute when set as `null` doesn't add any class
     to document.body.
     See the `Styles` section for more details. */}

      htmlOpenClassName={
        "ReactModal__Html--open"
  /* String className to be applied to the document.html
     (must be a constant string).
     This attribute is `null` by default.
     See the `Styles` section for more details. */}

      ariaHideApp={
        true
  /* Boolean indicating if the appElement should be hidden */}

      shouldFocusAfterRender={
        true
  /* Boolean indicating if the modal should be focused after render. */}

      shouldCloseOnOverlayClick={
        true
  /* Boolean indicating if the overlay should close the modal */}

      shouldCloseOnEsc={
        true
  /* Boolean indicating if pressing the esc key should close the modal
     Note: By disabling the esc key from closing the modal
     you may introduce an accessibility issue. */}

      shouldReturnFocusAfterClose={
        true
  /* Boolean indicating if the modal should restore focus to the element
     that had focus prior to its display. */}

      role={
        "dialog"
  /* String indicating the role of the modal, allowing the 'dialog' role
     to be applied if desired.
     This attribute is `dialog` by default. */}

      preventScroll={
        false
  /* Boolean indicating if the modal should use the preventScroll flag when
     restoring focus to the element that had focus prior to its display. */}

      parentSelector={
        () => document.body
  /* Function that will be called to get the parent element
     that the modal will be attached to. */}

      aria={
        {
          labelledby: "heading",
          describedby: "full_description"
        }
  /* Additional aria attributes (optional). */}

      data={
        { background: "green" }
  /* Additional data attributes (optional). */}

      testId={
        ""
  /* String testId that renders a data-testid attribute in the DOM,
    useful for testing. */}

    //     overlayRef={
    //       setOverlayRef
    // /* Overlay ref callback. */}

    //     contentRef={
    //       setContentRef
    // /* Content ref callback. */}

    //     overlayElement={
    //       (props, contentElement) => <div {...props}>{contentElement}</div>
    // /* Custom Overlay element. */}

    //     contentElement={
    //       (props, children) => <div {...props}>{children}</div>
    // /* Custom Content element. */}
    >


      <section className="film-details">
        <form className="film-details__inner" action="" method="get">
          <div className="film-details__top-container">
            <div className="film-details__close">
              <button
                onClick={() => {
                  closeModalHandler()
                }}
                className="film-details__close-btn"
                type="button">close
              </button>
            </div>
            <div className="film-details__info-wrap">
              <div className="film-details__poster">
                <img
                  className="film-details__poster-img"
                  src={`./${modalData?.filmInfo.poster}`}
                  alt={modalData?.filmInfo.alternativeTitle}
                />

                <p className="film-details__age">{modalData?.filmInfo.ageRating + '+'}</p>
              </div>

              <div className="film-details__info">
                <div className="film-details__info-head">
                  <div className="film-details__title-wrap">
                    <h3 className="film-details__title">{modalData?.filmInfo.title}</h3>
                    <p className="film-details__title-original">{`Original: ${modalData?.filmInfo.alternativeTitle}`}</p>
                  </div>

                  <div className="film-details__rating">
                    <p className="film-details__total-rating">{modalData?.filmInfo.totalRating}</p>
                  </div>
                </div>

                <table className="film-details__table">
                  <tbody><tr className="film-details__row">
                    <td className="film-details__term">Director</td>
                    <td className="film-details__cell">{modalData?.filmInfo.director}</td>
                  </tr>
                    <tr className="film-details__row">
                      <td className="film-details__term">Writers</td>
                      <td className="film-details__cell">{modalData ? modalData.filmInfo.writers.join(', ') : 'No writers..'}</td>
                    </tr>
                    <tr className="film-details__row">
                      <td className="film-details__term">Actors</td>
                      <td className="film-details__cell">{modalData ? modalData.filmInfo.actors.join(', ') : 'No actors..'}</td>
                    </tr>
                    <tr className="film-details__row">
                      <td className="film-details__term">Release Date</td>
                      <td className="film-details__cell">{releaseDate}</td>
                    </tr>
                    <tr className="film-details__row">
                      <td className="film-details__term">Runtime</td>
                      <td className="film-details__cell">{runTimeValue}</td>
                    </tr>
                    <tr className="film-details__row">
                      <td className="film-details__term">Country</td>
                      <td className="film-details__cell">{modalData?.filmInfo.release.releaseCountry}</td>
                    </tr>
                    <tr className="film-details__row">
                      <td className="film-details__term">Genres</td>
                      <td className="film-details__cell">{genres}</td>
                    </tr>
                  </tbody></table>

                <p className="film-details__film-description">{modalData?.filmInfo.description}</p>
              </div>
            </div>

            {authorizationStatus && <section className="film-details__controls">
              <input
                type="checkbox"
                className="film-details__control-input visually-hidden"
                onChange={onToWatchClickHandler}
                checked={isToWatch()}
                id="watchlist"
                name="watchlist"
              />
              <label
                htmlFor="watchlist"
                className="film-details__control-label film-details__control-label--watchlist">
                Add to watchlist
              </label>

              <input
                type="checkbox"
                className="film-details__control-input visually-hidden"
                onChange={onWatchedClickHandler}
                checked={isWatched()}
                id="watched"
                name="watched"
              />
              <label
                htmlFor="watched"
                className="film-details__control-label film-details__control-label--watched">
                Already watched
              </label>

              <input
                type="checkbox"
                className="film-details__control-input visually-hidden"
                onChange={onFavoriteClickHandler}
                checked={isFavorite()}
                id="favorite"
                name="favorite"
              />
              <label
                htmlFor="favorite"
                className={`film-details__control-label film-details__control-label--favorite`}>
                Add to favorites
              </label>
            </section>
            }

          </div>

          <div className="film-details__bottom-container">
            <section className="film-details__comments-wrap">
              <h3 className="film-details__comments-title">Comments <span className="film-details__comments-count">{modalData?.comments.length}</span></h3>
              {modalData && <CommentList comments={modalData?.comments} />}

              {/* Запилить написание комментария.
                Контроллировать форму в состоянии?
                Сделать состояние для каждого элемента комментария, типа:
                  comment: текст комментария
                  emoji: эмоция - картинка-смайлик
                  author: авторизованный пользователь
                */}
              <CommentNew emotion={emotion} comment={comment} onCommentChangeHandler={onCommentChangeHandler} onEmojiClickHandler={onEmojiClickHandler} />
            </section>
          </div>
        </form>
      </section>


    </ReactModal>
  )
}



export default CardModal
