import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import GlobalContext from '../context/globalContext';
import Product from '../components/Product';
import Loading from '../components/Loading';

export default function Home({navigation}) {
  const globalState = useContext(GlobalContext);
  const [update, setUpdate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate("Mi Carrito")}>
              <Text style={styles.cartText}>Ver Carrito</Text>
              <Ionicons name="cart-sharp" size={24} color={'#F47205'} />
            </TouchableOpacity>
        ),
    });
}, [navigation, globalState.cartItems]);
  
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetch('https://fakestoreapi.com/products')
      .then( res => res.json() )
      .then( json => globalState.setArticles(json) )
      .catch(e => Alert.alert('Error al obtener los articulos',e))
      setIsLoading(false);
    })()
  }, [])

  const getNumber = () => {
    let increment = 0;
    globalState.cartItems.forEach( item => {
      increment += item.count
    });
    return increment;
  }

  const handleAddToCart = (item) => {
    const cartItems = globalState.cartItems;
    let productAlreadyInCart = false;
      cartItems.forEach(cp => {
        if (cp.id === item.id) {
          cp.count += 1;
          productAlreadyInCart = true;
        }
      });
      if (!productAlreadyInCart) {
        cartItems.push({ ...item, count: 1 });
      }
      globalState.setCartItems(cartItems);
      setUpdate(update+1);
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        globalState.articles.length > 0 &&
        <FlatList 
          data={globalState.articles} 
          renderItem={ ({item}) => <Product data={item} handleAddToCart={handleAddToCart} /> }
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={<View style={styles.span}></View>}
        />
      }
      {
        globalState.articles.length > 0 &&
        <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate("Mi Carrito")}>
          <Text style={styles.floatingButtonText}>Ver {getNumber()} artículos</Text>
          <Ionicons name="cart-sharp" size={24} color={'#FFF'} />
        </TouchableOpacity>
      }
      {
        isLoading &&
        <Loading isVisible={isLoading} text={'Cargando...'}/>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C1DDFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F47205'
  },
  floatingButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: '45%',
    bottom: 15,
    borderRadius: 50,
    backgroundColor: '#F47205',
    elevation: 15
  },
  floatingButtonText: {
    fontSize: 16,
    color: '#FFF'
  },
  span: {
    padding: '10%'
  }
});
