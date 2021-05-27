import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context'
import logo from '../logo.svg';

const TEST_CREDENTIALS = {
    login: 'user',
    password: '123'
}

const Login = () => {
    const context = useContext(AppContext);
    const { user, setUser } = context
    const history = useHistory()
    const { push: routerPush } = history
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onSubmit = () => {
        // fake auth
        if (login === TEST_CREDENTIALS.login && password === TEST_CREDENTIALS.password) {
            setUser({
                login,
                token: 'test.token.123'
            })
            routerPush('/dashboard')
        } else {
            setError('Wrong username or password')
            setTimeout(() => {
                setError('')
            }, 2000)
        }
    }

    useEffect(() => {
        if (user)
            routerPush('/dashboard')
    }, [user, routerPush])

    return (
        <div className="login">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Login</h1>
            <div className="loginField">
                <span>Username:</span>
                <input
                    autoFocus
                    placeholder={TEST_CREDENTIALS.login}
                    type="text"
                    value={login}
                    onChange={event => setLogin(event.target.value)} />
            </div>
            <div className="loginField">
                <span>Password:</span>
                <input
                    placeholder={TEST_CREDENTIALS.password}
                    type="password"
                    value={password}                    
                    onChange={event => setPassword(event.target.value)} />
            </div>
            <button type="button" className="btn" onClick={onSubmit}>Login</button>
            {error && <div className="error-field">
                {error}
            </div>}
        </div>
    )
}

export default Login