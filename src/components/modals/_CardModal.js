import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import uniqid from 'uniqid';
import { useAppSelector } from '../../hooks';

// import { Comment } from '../Comment';

// import {
//   updateFilm,
//   createNewComment,
//   // deleteLocalComment,
// } from '../../redux/filmReducer';

// import { setPopUpInvisible, deleteCommentById } from '../../actions/modalAction';

function PopUpModal() {
  const dispatch = useDispatch();

// Запрашивать состоние модальника [GET]'/films/filmId'
  // const film = useAppSelector((state) => state.DATA.films.modal?);
  // const [state, setState] = useState(film);
  const [emoji, setEmoji] = useState(null);
  const [comment, setComment] = useState('');
  // let [comments, setComments] = useState(film.comments);

  // const emojiClick = (evt: SyntheticEvent) => {
  //   setEmoji(evt.target.value);
  //   console.log(emoji);
  // };

  // const commentEnter = (evt: SyntheticEvent) => {
  //   setComment(evt.target.value);
  // };

  // const emojiImg = emoji ? (
  //   <img src={`./images/emoji/${emoji}.png`} width="30" height="30" alt="emoji" />
  // ) : null;

  // const sendForm = (e: SyntheticEvent) => {
  //   if (e.ctrlKey && e.keyCode == 13) {
  //     dispatch(
  //       createNewComment({
  //         comment,
  //         emotion: emoji,
  //         filmId: state.id,
  //       }),
  //     ).then((resp) => {
  //       comments.push(resp);
  //       setComments([...comments]);
  //     });
  //   }
  // };

  // const deleteCommentClick = (commentId) => {
  //   dispatch(deleteCommentById(commentId)).then((resp) => {
  //     // Комментарий не удаляется из карточки каталога при удалении из попапа
  //     // dispatch(deleteLocalComment(state.id, commentId));
  //     // setComments(
  //     //   comments.filter((item) => {
  //     //     if (item.id !== resp._id) {
  //     //       return item;
  //     //     }
  //     //   }),
  //     // );
  //   });
  // };

  const newPostElement = React.createRef();

  // useEffect(() => {
  //   document.addEventListener('keydown', sendForm);
  //   return () => {
  //     document.removeEventListener('keydown', sendForm);
  //   };
  // });

  // const ageRating = state.filmInfo.ageRating ? state.filmInfo.ageRating + ' +' : '';
  // const writers = state.filmInfo.writers.join(', ');
  // const actors = state.filmInfo.actors.join(', ');
  // const releaseDate = moment(state.filmInfo.release.date).format('DD MMMM YYYY');
  // const runTime = moment().startOf('day').add(state.filmInfo.runtime, 'minutes');
  // const runTimeHours = runTime.format('h');
  // const runTimeMinutes = runTime.format('mm');
  // const runTimeValue = `${runTimeHours + 'h ' + runTimeMinutes + ' m'}`;
  // const genres = state.filmInfo.genre.map((genre, key) => {
  //   return (
  //     <span className="film-details__genre" key={key}>
  //       {genre}
  //     </span>
  //   );
  // });

  // const filmCommentsLength = comments.length;

  // const isFavorite = state.userDetails.favorite ? 'checked' : '';
  // const isWatchlist = state.userDetails.watchlist ? 'checked' : '';
  // const isAlreadyWatched = state.userDetails.alreadyWatched ? 'checked' : '';

  const isOpen = true
  // const commentElements = comments.map((comment) => {
  //   return comment ? (
  //     <Comment comment={comment} deleteCommentClick={deleteCommentClick} />
  //   ) : (
  //     ''
  //   );
  // });

  // const closePopUpButtonClick = () => {
  //   dispatch(setPopUpInvisible());
  // };

  // const closePopUpKeyDown = (e) => {
  //   dispatch(setPopUpInvisible());
  // };

  // const favoritePopUpClick = () => {
  //   state.userDetails.favorite = !state.userDetails.favorite;

  //   dispatch(updateFilm(state.id, { ...state }))
  //     .then(() => {
  //       setState({ ...state });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const addToWatchlistPopUpClick = () => {
  //   state.userDetails.watchlist = !state.userDetails.watchlist;
  //   dispatch(updateFilm(state.id, { ...state }))
  //     .then((resp) => {
  //       setState({ ...state });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const markAsWatchedPopUpClick = () => {
  //   state.userDetails.alreadyWatched = !state.userDetails.alreadyWatched;
  //   dispatch(updateFilm(state.id, { ...state }))
  //     .then(() => {
  //       setState({ ...state });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const RootElement = () => document.getElementById('root')
if(!RootElement) {
  return
}
  return (
    <Modal
      isOpen={Boolean(isOpen)}
      ariaHideApp={false}
      overlayClassName="modal fade show"
      bodyOpenClassName="modal-open"
      className="modal-dialog modal-dialog-centered"
      parentSelector={RootElement}
      // onRequestClose={closePopUpKeyDown}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <section id={state.id} className="film-details">
        <form className="film-details__inner" action="" method="get">
          <div className="film-details__top-container">
            <div className="film-details__close">
              <button
                className="film-details__close-btn"
                type="button"
                onClick={closePopUpButtonClick}
              >
                close
              </button>
            </div>
            <div className="film-details__info-wrap">
              <div className="film-details__poster">
                <img
                  className="film-details__poster-img"
                  src={'./' + state.filmInfo.poster}
                  alt=""
                />

                <p className="film-details__age">{ageRating}</p>
              </div>

              <div className="film-details__info">
                <div className="film-details__info-head">
                  <div className="film-details__title-wrap">
                    <h3 className="film-details__title">{state.filmInfo.title}</h3>
                    <p className="film-details__title-original">
                      Original: {state.filmInfo.alternativeTitle}
                    </p>
                  </div>

                  <div className="film-details__rating">
                    <p className="film-details__total-rating">
                      {state.filmInfo.totalRating}
                    </p>
                  </div>
                </div>

                <table className="film-details__table">
                  <tbody>
                    <tr className="film-details__row">
                      <td className="film-details__term">Director</td>
                      <td className="film-details__cell">{state.filmInfo.director}</td>
                    </tr>
                    <tr className="film-details__row">
                      <td className="film-details__term">Writers</td>
                      <td className="film-details__cell">{writers}</td>
                    </tr>
                    <tr className="film-details__row">
                      <td className="film-details__term">Actors</td>
                      <td className="film-details__cell">{actors}</td>
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
                      <td className="film-details__cell">
                        {state.filmInfo.release.releaseCountry}
                      </td>
                    </tr>
                    <tr className="film-details__row">
                      <td className="film-details__term">Genres</td>
                      <td className="film-details__cell">{genres}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="film-details__film-description">
                  {state.filmInfo.description}
                </p>
              </div>
            </div>

            <section className="film-details__controls">
              <input
                type="checkbox"
                className="film-details__control-input visually-hidden"
                id="watchlist"
                name="watchlist"
                checked={isWatchlist}
                onChange={addToWatchlistPopUpClick}
              />
              <label
                htmlFor="watchlist"
                className="film-details__control-label film-details__control-label--watchlist"
              >
                Add to watchlist
              </label>

              <input
                type="checkbox"
                className="film-details__control-input visually-hidden"
                id="watched"
                name="watched"
                checked={isAlreadyWatched}
                onChange={markAsWatchedPopUpClick}
              />
              <label
                htmlFor="watched"
                className="film-details__control-label film-details__control-label--watched"
              >
                Already watched
              </label>

              <input
                type="checkbox"
                className="film-details__control-input visually-hidden"
                id="favorite"
                name="favorite"
                checked={isFavorite}
                onChange={favoritePopUpClick}
              />
              <label
                htmlFor="favorite"
                className="film-details__control-label film-details__control-label--favorite"
              >
                Add to favorites
              </label>
            </section>
          </div>

          <div className="film-details__bottom-container">
            <section className="film-details__comments-wrap">
              <h3 className="film-details__comments-title">
                Comments{' '}
                <span className="film-details__comments-count">{filmCommentsLength}</span>
              </h3>

              <ul className="film-details__comments-list">{commentElements}</ul>

              <div className="film-details__new-comment">
                <div className="film-details__add-emoji-label">{emojiImg}</div>

                <label className="film-details__comment-label">
                  <textarea
                    className="film-details__comment-input"
                    placeholder="Select reaction below and write comment here"
                    name="comment"
                    onChange={commentEnter}
                    ref={newPostElement}
                    value={comment}
                  ></textarea>
                </label>

                <div className="film-details__emoji-list">
                  <input
                    className="film-details__emoji-item visually-hidden"
                    name="comment-emoji"
                    type="radio"
                    id="emoji-smile"
                    value="smile"
                    onClick={emojiClick}
                  />
                  <label className="film-details__emoji-label" htmlFor="emoji-smile">
                    <img
                      src="./images/emoji/smile.png"
                      width="30"
                      height="30"
                      alt="emoji"
                    />
                  </label>

                  <input
                    className="film-details__emoji-item visually-hidden"
                    name="comment-emoji"
                    type="radio"
                    id="emoji-sleeping"
                    value="sleeping"
                    onClick={emojiClick}
                  />
                  <label className="film-details__emoji-label" htmlFor="emoji-sleeping">
                    <img
                      src="./images/emoji/sleeping.png"
                      width="30"
                      height="30"
                      alt="emoji"
                    />
                  </label>

                  <input
                    className="film-details__emoji-item visually-hidden"
                    name="comment-emoji"
                    type="radio"
                    id="emoji-puke"
                    value="puke"
                    onClick={emojiClick}
                  />
                  <label className="film-details__emoji-label" htmlFor="emoji-puke">
                    <img
                      src="./images/emoji/puke.png"
                      width="30"
                      height="30"
                      alt="emoji"
                    />
                  </label>

                  <input
                    className="film-details__emoji-item visually-hidden"
                    name="comment-emoji"
                    type="radio"
                    id="emoji-angry"
                    value="angry"
                    onClick={emojiClick}
                  />
                  <label className="film-details__emoji-label" htmlFor="emoji-angry">
                    <img
                      src="./images/emoji/angry.png"
                      width="30"
                      height="30"
                      alt="emoji"
                    />
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
      </section>
    </Modal>
  );
}

export default PopUpModal;
