import { SyntheticEvent } from "react"

// export type User = {
//   _id: string;
//   name: string;
//   email: string;
//   // updated: Date,
//   created: string,
//   favorites: string[],
//   watched: string[],
//   towatch: string[],
// }
export type User = {
  id: string;
  email: string;
  // updated: Date,
  created: string,
  favorites: string[],
  watched: string[],
  towatch: string[],
  isActivated: boolean,
  comments: string[],
}

export type RegisterUserType = {
  // name: string;
  email: string;
  password: string;
}

export type RegisterResponseType = {
  accessToken: string;
  refreshToken: string;
  user: User
}

export type LoginUserType = {
  email: string;
  password: string;
}

// export type LogInResponseType = {
//     token: string;
//     user: User
// }

export type LogInResponseType = {
  accessToken: string;
  refreshToken: string;
  user: User
}

// export type updateUserType = {
//   user: User;
//   favoriteFilmId: string;
// }

export type updateUserType = {
  user: User;
  option: SyntheticEvent;
}
