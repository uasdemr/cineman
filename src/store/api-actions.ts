import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, store } from "./index";
import { APIRoute, AuthorizationStatus } from "../const";
import { Film, GetFilmsType, ModalDataType } from "../types/film";
import { LogInResponseType, LoginUserType, RegisterResponseType, RegisterUserType, User } from "../types/user";
import { dropToken, saveToken } from "../services/token";
import { saveUser } from "../services/user";
import { closeLoginDialog, closeRegisterDialog, removeCommentFromUser, requireAuthorization, setIsLoading } from "./user-slice";
import axios from "axios";
import { removeCommentFromFilm, removeCommentFromModalComments } from "./films-slice";
import { addCommentType, RemoveCommentType } from "../types/comment";
import { errorHandle } from "../services/error-handle";

export const fetchUsers = () => {
  try {
    return api.get<User[]>(APIRoute.Users)
  } catch (error) {
    console.log(error);
  }
}

export const fetchFilmsAction = createAsyncThunk(
  'app/fetchFilms',
  async ({ offset, limit, sort }: { offset: number, limit: number, sort?: string }) => {
    try {
      const { data } = await api.get<GetFilmsType>(APIRoute.Films + `?offset=${offset}&limit=${limit}&sorting=${sort}`);
      return data
    } catch (error) {
      errorHandle(error)
    }
  },
);

export const fetchRatedFilmsAction = createAsyncThunk(
  'app/fetchRatedFilms',
  async () => {
    try {
      const { data } = await api.get<GetFilmsType>(APIRoute.RatedFilms);
      return data
    } catch (error) {
      errorHandle(error)
    }
  },
);

export const fetchMostCommentedFilmsAction = createAsyncThunk(
  'app/fetchMostCommentedFilms',
  async () => {
    try {
      const { data } = await api.get<Film[]>(APIRoute.MostCommentedFilms);
      return data
    } catch (error) {
      errorHandle(error)
    }
  },
);

export const fetchFilmByIdAction = createAsyncThunk(
  'app/fetchFilmById',
  async (id: string) => {
    try {
      const { data } = await api.get<ModalDataType>(APIRoute.Films + `/${id}`);
      return data
    } catch (error) {
      console.log(error);

      errorHandle(error)
    }
  },
);

export const addCommentAction = createAsyncThunk(
  'app/addComment',
  async ({ filmId, comment }: addCommentType) => {
    try {
      const { data } = await api.post(APIRoute.Films + `/comments/${filmId}`, comment);
      return data
    } catch (error) {
      errorHandle(error)
    }
  },
);

export const removeCommentAction = createAsyncThunk(
  'app/removeComment',
  async ({ filmId, commentId }: RemoveCommentType) => {
    try {
      debugger
      const { data } = await api.delete(APIRoute.Films + `/comments/${filmId}/${commentId}`);
      store.dispatch(removeCommentFromFilm({ filmId, commentId }))
      store.dispatch(removeCommentFromModalComments({ filmId, commentId }))
      store.dispatch(removeCommentFromUser({ filmId, commentId }))
      return data
    } catch (error) {
      errorHandle(error)
    }
  },
);

export const fetchFavoritesFilmsAction = createAsyncThunk(
  'app/fetchFavoritesFilms',
  async ({ offset, limit }: { offset?: number, limit?: number }) => {
    try {
      const { data } = await api.get(APIRoute.Films + `/favorites`);
      return data
    } catch (error) {
      errorHandle(error)
    }
  },
);

export const fetchWatchedFilmsAction = createAsyncThunk(
  'app/fetchWatchedFilms',
  async ({ offset, limit }: { offset?: number, limit?: number }) => {
    try {
      const { data } = await api.get(APIRoute.Films + `/watched`);
      return data
    } catch (error) {
      errorHandle(error)
    }
  },
);

export const fetchToWatchFilmsAction = createAsyncThunk(
  'app/fetchToWatchFilms',
  async ({ offset, limit }: { offset?: number, limit?: number }) => {
    try {
      const { data } = await api.get(APIRoute.Films + `/towatch`);
      return data
    } catch (error) {
      errorHandle(error)
    }
  },
);

export const registerationUserAction = createAsyncThunk(
  'user/registerUser',
  async (user: RegisterUserType) => {
    try {
      const { data } = await api.post<RegisterResponseType>(APIRoute.Registration, user);
      saveToken(data.accessToken)
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth))
      store.dispatch(closeRegisterDialog());
      return data
    } catch (error) {
      errorHandle(error)
    }
  },
);

export const loginUserAction = createAsyncThunk(
  'user/loginUser',
  async (authData: LoginUserType) => {
    try {
      const { data } = await api.post<LogInResponseType>(APIRoute.Login, authData)
      saveToken(data.accessToken)
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth))
      store.dispatch(closeLoginDialog())
      return data
    } catch (error) {
      console.log(error);
      errorHandle(error)
    }
  },
);

export const logoutUserAction = createAsyncThunk(
  'user/logoutUser',
  async () => {
    try {
      const { data } = await api.post(APIRoute.Logout)
      dropToken()
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth))
      return data
    } catch (error) {
      errorHandle(error)
    }
  },
)

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async (_arg, { dispatch }) => {
    try {
      const response = await axios.get(`https://limitless-mountain-87015.herokuapp.com${APIRoute.Refresh}`, { withCredentials: true });

      saveToken(response.data.accessToken)
      dispatch(requireAuthorization(AuthorizationStatus.Auth));

      return response.data.user
    } catch (error) {
      errorHandle(error);
      dispatch(setIsLoading(false))
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const addFilmToFavoritesAction = createAsyncThunk(
  'user/addFavorites',
  async ({ id }: { id: string }) => {
    try {
      const { data } = await api.post(`${APIRoute.Users}/favorites/${id}`);
      saveUser(data)
      return data
    } catch (error) {
      errorHandle(error)
    }
  }
)

export const removeFilmFromFavoritesAction = createAsyncThunk(
  'user/removeFavorites',
  async ({ id }: { id: string }) => {
    try {
      const { data } = await api.delete(`${APIRoute.Users}/favorites/${id}`);
      saveUser(data)
      return data
    } catch (error) {
      errorHandle(error)
    }
  }
)

export const addFilmToWatchAction = createAsyncThunk(
  'user/addToWatch',
  async ({ id }: { id: string }) => {
    try {
      const { data } = await api.post(`${APIRoute.Users}/towatch/${id}`);
      saveUser(data)
      return data
    } catch (error) {
      errorHandle(error)
    }
  }
)

export const removeFilmFromToWatchAction = createAsyncThunk(
  'user/removeToWatch',
  async ({ id }: { id: string }) => {
    try {
      const { data } = await api.delete(`${APIRoute.Users}/towatch/${id}`);
      saveUser(data)
      return data
    } catch (error) {
      errorHandle(error)
    }
  }
)

export const addFilmToWatchedAction = createAsyncThunk(
  'user/addWatched',
  async ({ id }: { id: string }) => {
    try {
      const { data } = await api.post(`${APIRoute.Users}/watched/${id}`);
      saveUser(data)
      return data
    } catch (error) {
      errorHandle(error)
    }
  }
)

export const removeFilmFromWatchedAction = createAsyncThunk(
  'user/removeWatched',
  async ({ id }: { id: string }) => {
    try {
      const { data } = await api.delete(`${APIRoute.Users}/watched/${id}`);
      saveUser(data)
      return data
    } catch (error) {
      errorHandle(error)
    }
  }
)
