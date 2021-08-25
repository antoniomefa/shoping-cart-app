import React, { createContext, useState } from 'react';

const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
    const [articles, setArticles] = useState([]); // Guarda la lista de articulos
    const [cartItems, setCartItems] = useState([]); // Guarda los articulos seleccionados

    return (
        <GlobalContext.Provider value={{ articles, setArticles, cartItems, setCartItems }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;