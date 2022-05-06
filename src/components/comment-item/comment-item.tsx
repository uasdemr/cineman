import { SyntheticEvent } from 'react'
import moment from "moment";
import { CommentType } from "../../types/comment"
import { store } from '../../store';
import { removeCommentAction } from '../../store/api-actions';
import { useAppSelector } from '../../hooks';

type CommentItemType = {
  comment: CommentType
}

function CommentItem({ comment }: CommentItemType): JSX.Element {
  const modalData = useAppSelector(state => state.DATA.modalData)

  const commentDate = moment(comment.date).format('YYYY/MM/DD HH:mm');

  const deleteComment = (evt: SyntheticEvent) => {
    evt.preventDefault()
    if(modalData) {
      store.dispatch(removeCommentAction({ commentId: comment._id, filmId: modalData._id }))
    }
  }

  return (
    <li className="film-details__comment">
      <span className="film-details__comment-emoji">
        <img
          src={`/images/emoji/${comment.emotion}.png`}
          width="55"
          height="55"
          alt={`emoji-${comment.emotion}`}
        />
      </span>
      <div>
        <p className="film-details__comment-text">{comment.comment}</p>
        <p className="film-details__comment-info">
          <span className="film-details__comment-author">{comment.author}</span>
          <span className="film-details__comment-day">{commentDate}</span>

          <button
            onClick={(evt) => {
              deleteComment(evt)
            }}
            className="film-details__comment-delete">
            Delete
          </button>
        </p>
      </div>
    </li>
  )
}

export default CommentItem
