import { CommentType } from "../../types/comment"
import CommentItem from "../comment-item/comment-item"

type CommentListType = {
  comments: CommentType[]
}

function CommentList({ comments }: CommentListType) {
  return (
    <ul className="film-details__comments-list">
      {comments.map(comment => <CommentItem comment={comment} key={comment._id} />)}
    </ul>
  )
}

export default CommentList
