import { SortingType } from "./types/sorting"

export enum NameSpace {
  data = 'DATA',
  user = 'USER',
  auth = 'AUTH',
}

export enum APIRoute {
  Films = 'api/films',
  RatedFilms = 'api/films/rated',
  MostCommentedFilms = 'api/films/most-commented',
  Login = '/api/login',
  Logout = '/api/logout',
  Users = '/api/users',
  Registration = '/api/registration',
  Refresh = '/api/refresh',
  Comments = '/api/comments',
  Watchlist = '/api/watchlist',
  History = '/api/history',
  Favorites = '/api/favorites',
}

export enum AppRoute {
  Main = "/",
  Login = "/login",
  Favorites = "/favorites",
  Watchlist = '/watchlist',
  History = '/history',
  FilmId = "films/:id",
  Films = '/films',
  NotFound = "*",
}

export const AuthorizationStatus = {
  Auth: true,
  NoAuth: false,
}

export enum UpdateUser {
  Favorites = 'Mark as favorite',
  Towatch = 'Add to watchlist',
  Watched = 'Mark as watched'
}

export enum Filter {
  All = 'allmovies',
  Watchlist = 'towatch',
  History = 'watched',
  Favorites = 'favorites',
}

export const Sorting: SortingType = {
  DateUp: 'dateup',
  DateDown: 'datedown',
  DateDefault: 'datedefault',
  RatingUp: 'ratingup',
  RatingDown: 'ratingdown',
  RatingDefault: 'ratingdefault',
}


export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}
