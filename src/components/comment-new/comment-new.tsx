import { ChangeEvent } from "react"

type CommentNewType = {
  onCommentChangeHandler: (evt: ChangeEvent<HTMLTextAreaElement>) => void
  onEmojiClickHandler: (evt: ChangeEvent<HTMLInputElement>) => void
  emotion: string
  comment: string
}

function CommentNew({onCommentChangeHandler, onEmojiClickHandler, emotion, comment}: CommentNewType) {
  return (
    <div className="film-details__new-comment">
      <div className="film-details__add-emoji-label">
        {emotion && <img src={`/images/emoji/${emotion}.png`} width="55" height="55" alt="emoji-smile" />}
      </div>

      <label className="film-details__comment-label">
        <textarea
          className="film-details__comment-input"
          placeholder="Select reaction below and write comment here"
          name="comment"
          value={comment}
          onChange={onCommentChangeHandler}
        >
        </textarea>
      </label>

      <div className="film-details__emoji-list">
        <input
          onChange={onEmojiClickHandler}
          className="film-details__emoji-item visually-hidden"
          name="comment-emoji"
          type="radio"
          id="emoji-smile"
          value="smile"
        />
        <label className="film-details__emoji-label" htmlFor="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji" />
        </label>

        <input
          onChange={onEmojiClickHandler}
          className="film-details__emoji-item visually-hidden"
          name="comment-emoji"
          type="radio"
          id="emoji-sleeping"
          value="sleeping"
        />
        <label className="film-details__emoji-label" htmlFor="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji" />
        </label>

        <input
          onChange={onEmojiClickHandler}
          className="film-details__emoji-item visually-hidden"
          name="comment-emoji"
          type="radio"
          id="emoji-puke"
          value="puke"
        />
        <label className="film-details__emoji-label" htmlFor="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji" />
        </label>

        <input
          onChange={onEmojiClickHandler}
          className="film-details__emoji-item visually-hidden"
          name="comment-emoji"
          type="radio"
          id="emoji-angry"
          value="angry"
        />
        <label className="film-details__emoji-label" htmlFor="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji" />
        </label>
      </div>
    </div>
  )
}

export default CommentNew
