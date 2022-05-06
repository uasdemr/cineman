import React, { ChangeEvent, FormEvent, useState } from 'react'
import { store } from '../../store'
import { loginUserAction } from '../../store/api-actions'


function LogIn() {

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
        store.dispatch(loginUserAction(user))

      };

    return (
        <form onSubmit={handleSubmit} className="user-login__form" action="/#">
            <h3 className='user-login__title'>Login</h3>
            <div className="user-login__input-wrapper">
                <input onChange={handleAuthDataChange} className="user-login__input" type="email" name="email" placeholder="Enter Email" />
                <input onChange={handleAuthDataChange} className="user-login__input" type="password" name="password" placeholder="Enter Password" />
            </div>
            <div className="user-login__button-wrapper">
                <button className="user-login__button" type="submit">Send</button>
            </div>
        </form>
    )
}

export default LogIn
