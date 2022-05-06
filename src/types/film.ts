import { CommentType } from "./comment";

export type Film = {
  _id: string,
  filmInfo: {
    title: string,
    alternativeTitle: string,
    totalRating: number,
    poster: string,
    ageRating: number,
    director: string,
    writers: [string],
    actors: [string],
    release: {
      date: Date,
      releaseCountry: string,
    },
    runtime: number,
    genre: [string],
    description: string,
  },
  comments?: string[]
}

export type ModalDataType = {
  _id: string,
  filmInfo: {
    title: string,
    alternativeTitle: string,
    totalRating: number,
    poster: string,
    ageRating: number,
    director: string,
    writers: [string],
    actors: [string],
    release: {
      date: Date,
      releaseCountry: string,
    },
    runtime: number,
    genre: [string],
    description: string,
  },
  comments: CommentType[]
}

export type FilmsDataType = {
  films: Film[],
  favoritesFilms: Film[],
  watchedFilms: Film[],
  towatchFilms: Film[],
  topRatedFilms: Film[],
  mostCommentedFilms: Film[],
  isModal: boolean,
  modalData: ModalDataType | null,
  sort: string,
  total: number;
  offset: number;
  limit: number;
  isDataLoaded: boolean,
  isLoading: boolean,
}

export type GetFilmsType = {
  docs: Film[],
  totalDocs: number,
  offset: number,
  limit: number,
  totalPages: number,
  page: number,
  pagingCounter: number,
  hasPrevPage: boolean,
  hasNextPage: boolean,
  prevPage: number | null,
  nextPage: number,
}
