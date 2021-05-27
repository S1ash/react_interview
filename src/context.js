import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const STORE_USER_NAME = 'user.info'

export const defaultState = {
    user: null,
    setUser: () => { }
};

const AppContext = React.createContext(defaultState);

AppContext.displayName = 'AppContext';

export default AppContext

const getUser = () => {
    try {
        const user = localStorage.getItem(STORE_USER_NAME)
        if (user) return JSON.parse(user)
    } catch (error) {
        console.error('error', error)
    }
}

export const AppContextProvider = ({ children }) => {
    const user = getUser()
    const history = useHistory()
    const { push: routerPush } = history
    const [state, setState] = useState(user)

    const value = {
        user: state,
        setUser: (payload) => {
            if (payload) {
                setState(payload)
                localStorage.setItem(STORE_USER_NAME, JSON.stringify(payload))
            } else {
                setState(null)
                localStorage.setItem(STORE_USER_NAME, '')
            }
        }
    }

    useEffect(() => {
        (() => {
            const user = getUser()
            if (user) setState(prevUser => prevUser && prevUser.token === user.token ? prevUser : user)
        })()
    }, [])

    useEffect(() => {
        if (!state) routerPush('/')
    }, [state, routerPush])

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
