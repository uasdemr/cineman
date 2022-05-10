import React, { ChangeEvent, FormEvent, useState } from 'react'
import { store } from '../../store';
import { registerationUserAction } from '../../store/api-actions';

function Register(): JSX.Element {

  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });

  const handleAuthDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData({
      ...authData,
      [name]: value,
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const user = {
      email: authData.email,
      password: authData.password,
    };
    store.dispatch(registerationUserAction(user))

  };

  return (
    <form onSubmit={handleSubmit} className="user-register__form" action="/#">
      <h3 className='user-register__title'>Registration</h3>
      <div className="user-register__input-wrapper">
        <input onChange={handleAuthDataChange} className="user-register__input" type="email" name="email" placeholder="Enter Email" />
        <input onChange={handleAuthDataChange} className="user-register__input" type="password" name="password" placeholder="Enter Password" />
      </div>
      <div className="user-register__button-wrapper">
        <button className="user-register__button" type="submit">Send</button>
      </div>
    </form>
  )
}

export default Register
