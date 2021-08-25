import React, {useContext} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import GlobalContext from '../context/globalContext';

export default function Cart({navigation}) {
  const globalState = useContext(GlobalContext);

  const handleRemoveFromCart = (product) => {
    let cartItems = globalState.cartItems;
    cartItems = cartItems.filter(a => a.id !== product.id);
    globalState.setCartItems(cartItems);
  };

  return (
    <SafeAreaView style={styles.container}>
      {
        globalState.cartItems.length > 0 ?
          <Text style={styles.title}>Tienes {globalState.cartItems.length} productos en tu carrito</Text>
        :
          <Text style={styles.title}>Tu carrito está vacío!</Text>
      }
      <ScrollView>
      <View style={styles.card}>
        {
          globalState.cartItems.length > 0 &&
          globalState.cartItems.map((item) => {
            return (
              <View key={item.id}>
              <View style={styles.rowProduct}>
                <Text 
                  style={styles.name}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.title}</Text>
                <Text style={styles.price}>{item.count} x ${item.price}</Text>
                <TouchableOpacity onPress={() => handleRemoveFromCart(item)}>
                  <Ionicons name="close-circle-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.divider}/>
              </View>
            )
          })
        }
        {
          globalState.cartItems.length > 0 &&
            <>
              <View style={styles.infoRow}>
                <Text style={styles.total}>Subtotal: </Text>
                <Text style={styles.infoPrice}>$ {(globalState.cartItems.reduce((a, c) => (a + c.price * c.count), 0)).toFixed(2)}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.total}>IVA: </Text>
                <Text style={styles.infoPrice}>
                  $ {(globalState.cartItems.reduce((a, c) => (a + c.price * c.count), 0) * 0.16).toFixed(2)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.total}>Total: </Text>
                <Text style={styles.infoPrice}>$ {(globalState.cartItems.reduce((a, c) => (a + c.price * c.count), 0) * 1.16).toFixed(2)}</Text>
              </View>
            </>
        }
      </View>
      </ScrollView>
      {
        globalState.cartItems.length > 0 &&
          <TouchableOpacity style={styles.floatingButton} onPress={() => Alert.alert('Procesador de pagos', 'Saldo insuficiente')}>
            <Text style={styles.floatingButtonText}>Pagar ahora</Text>
            <MaterialCommunityIcons name="credit-card-check" size={24} color='#FFF'/>
          </TouchableOpacity>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C1DDFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    marginTop: '2%',
    marginBottom: '16%',
    padding: '2%',
    borderRadius: 8,
    backgroundColor: '#FFF'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: '2%'
  },
  rowProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
    marginVertical: '2%'
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    width: '65%' 
  },
  price: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    width: '100%'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '2%'
  },
  total: {
    fontSize: 18,
  },
  infoPrice: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  floatingButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
  }
});
