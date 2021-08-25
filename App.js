import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalContextProvider } from './app/context/globalContext';

import Home from './app/screens/Home';
import Cart from './app/screens/Cart';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GlobalContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Lista de artículos" component={Home} />
          <Stack.Screen name="Mi Carrito" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContextProvider>
  );
}
