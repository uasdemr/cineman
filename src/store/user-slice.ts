import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, Filter, NameSpace } from '../const';
import { User } from '../types/user';
import {
  addFilmToFavoritesAction,
  addFilmToWatchAction,
  addFilmToWatchedAction,
  checkAuthAction,
  loginUserAction,
  logoutUserAction,
  registerationUserAction,
  removeFilmFromFavoritesAction,
  removeFilmFromToWatchAction,
  removeFilmFromWatchedAction,
  addCommentAction,
} from './api-actions';


type initialStateType = {
  user: User;
  isLoading: boolean;
  isRegister: boolean;
  isLogin: boolean;
  filter: string;
  // sorting: string;
  authorizationStatus: boolean,
}

const initialState: initialStateType = {
  user: {
    id: '',
    // name: '',
    email: '',
    // updated: Date,
    isActivated: false,
    created: '',
    favorites: [],
    watched: [],
    towatch: [],
    comments: [],
  },
  filter: Filter.All,
  // sorting: '',
  isLoading: false,
  isRegister: false,
  isLogin: false,
  authorizationStatus: AuthorizationStatus.NoAuth,
};



export const userSlice = createSlice({
  name: NameSpace.user,
  initialState,
  reducers: {
    toggleLoginDialog: (state) => {
      state.isLogin = !state.isLogin
    },
    closeLoginDialog: (state) => {
      state.isLogin = false
    },
    toggleRegisterDialog: (state) => {
      state.isRegister = !state.isRegister
    },
    closeRegisterDialog: (state) => {
      state.isRegister = false
    },
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    loadUserFromStorage: (state, action) => {
      if (action.payload !== '') {
        const user = action.payload
        state.user = user;
      }
    },
    setIsLoading: (state, action) => {
      if (action.payload !== '') {

        state.isLoading = action.payload
      }
    },
    addFilmToFavorites: (state, action) => {
      if (action.payload) {
        state.user.favorites.push(action.payload.id)
        // state.isLoading = false
      }
    },
    addFilmToWatch: (state, action) => {
      if (action.payload) {
        state.user.towatch.push(action.payload.id)
        // state.isLoading = false
      }
    },
    removeCommentFromUser: (state, action) => {
      if (action.payload) {
        state.user.comments = state.user.comments.filter(comment => comment !== action.payload.commentId)
        // state.isLoading = false
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerationUserAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user
        }
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user
        }
      })
      .addCase(logoutUserAction.fulfilled, (state) => {
        state.user = {} as User
      })
      .addCase(checkAuthAction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = { ...action.payload }
          state.isLoading = false
        }
      })
      .addCase(addFilmToFavoritesAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload
        }
      })
      .addCase(removeFilmFromFavoritesAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload
        }
      })
      .addCase(addFilmToWatchAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload
        }
      })
      .addCase(removeFilmFromToWatchAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload
        }
      })
      .addCase(addFilmToWatchedAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload
        }
      })
      .addCase(removeFilmFromWatchedAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload
        }
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.user.comments.push(action.payload._id)
        }
      })
  },
});

export const {
  toggleLoginDialog,
  toggleRegisterDialog,
  closeLoginDialog,
  closeRegisterDialog,
  requireAuthorization,
  loadUserFromStorage,
  setIsLoading,
  addFilmToFavorites,
  removeCommentFromUser,
  addFilmToWatch,
} = userSlice.actions;
