import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { FilmsDataType } from '../types/film';
import {
  fetchFavoritesFilmsAction,
  fetchFilmByIdAction,
  fetchFilmsAction,
  fetchToWatchFilmsAction,
  fetchWatchedFilmsAction,
  addCommentAction,
  fetchRatedFilmsAction,
  fetchMostCommentedFilmsAction,
} from './api-actions';

const initialState: FilmsDataType = {
  films: [],
  favoritesFilms: [],
  watchedFilms: [],
  towatchFilms: [],
  topRatedFilms: [],
  mostCommentedFilms: [],
  isModal: false,
  modalData: null,
  sort: '',
  total: 0,
  offset: 0,
  limit: 5,
  isDataLoaded: false,
  isLoading: false,
};

export const filmsSlice = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    incrementOffset: (state, action) => {
      state.offset = action.payload
    },
    clearFilms: (state) => {
      state.films = []
    },
    setOffset: (state) => {
      state.offset = 0
    },
    openModal: (state) => {
      state.isModal = true
    },
    closeModal: (state) => {
      state.isModal = false
      state.modalData = null
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    removeFilmfromFavorites: (state, action) => {
      if (action.payload) {
        const newFavorite = state.favoritesFilms.filter(item => {
          if (item._id !== action.payload.id) {
            return item
          } else { return false }
        })
        state.favoritesFilms = newFavorite
      }
    },
    removeFilmfromWatched: (state, action) => {
      if (action.payload) {
        const newWatched = state.watchedFilms.filter(item => {
          if (item._id !== action.payload.id) {
            return item
          } else { return false }
        })
        state.watchedFilms = newWatched
      }
    },
    removeFilmfromToWatch: (state, action) => {
      if (action.payload) {
        const newTowatchFilms = state.towatchFilms.filter(item => {
          if (item._id !== action.payload.id) {
            return item
          } else { return false }
        })
        state.towatchFilms = newTowatchFilms
      }
    },
    removeCommentFromFilm: (state, action) => {
      if (action.payload) {
        state.films.map(film => {
          if (film._id !== action.payload.filmId) {
            return film
          } else {
            const newComments = film.comments?.filter(comment => comment !== action.payload.commentId)
            film.comments = newComments
            return film
          }
        })
      }
    },
    removeCommentFromModalComments: (state, action) => {
      if (action.payload) {
        if (state.modalData) {
          state.modalData.comments = state.modalData?.comments.filter(comment => comment._id !== action.payload.commentId)
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.films.push(...action.payload.docs)
          state.total = action.payload.totalDocs
          state.isDataLoaded = true
          state.isLoading = false
        }
      })
      .addCase(fetchFavoritesFilmsAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.favoritesFilms = action.payload.favorites
        }
      })
      .addCase(fetchWatchedFilmsAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.watchedFilms = action.payload.watched
        }
      })
      .addCase(fetchToWatchFilmsAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.towatchFilms = action.payload.towatch
        }
      })
      .addCase(fetchFilmByIdAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.modalData = action.payload
        }
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.films.map(film => {
            if (film._id !== action.payload.filmId) {
              return film
            } else {
              film.comments?.push(action.payload._id)
              return film
            }
          })
          state.modalData?.comments.push({ ...action.payload })
        }
      })
      .addCase(fetchRatedFilmsAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.topRatedFilms = action.payload.docs
        }
      })
      .addCase(fetchMostCommentedFilmsAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.mostCommentedFilms = [...action.payload]
        }
      })
  },
});

export const {
  incrementOffset,
  removeFilmfromFavorites,
  removeFilmfromWatched,
  removeFilmfromToWatch,
  removeCommentFromFilm,
  removeCommentFromModalComments,
  clearFilms,
  setOffset,
  openModal,
  closeModal,
  setSort,
} = filmsSlice.actions;
