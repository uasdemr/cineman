export type CommentType = {
  _id: string;
  filmId: string;
  author: string;
  emotion: string;
  date: Date;
  comment: string;
  __v: number;
}

export type addCommentType = {
  filmId: string
  comment: {
    author: string
    emotion: string
    comment: string
  }
}

export type RemoveCommentType = {
  commentId: string
  filmId: string
}
