import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default function Product({data, handleAddToCart, counter, setCounter}) {
    const {title, price, description, image} = data;

    return(
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: image}} />
            </View>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.rowPrice}>
                <Text style={styles.offer}>Llévalo por </Text>
                <Text style={styles.price}>$ {price}</Text>
                <TouchableOpacity style={styles.button} onPress={() => {setCounter(counter+1); handleAddToCart(data)}}>
                    <Text style={styles.buttonText}>Agregar al carrito</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        margin: '2%',
        padding: '4%',
        borderRadius: 8,
        backgroundColor: '#FFF'
    },
    title: {
        fontSize: 22, 
        fontWeight: 'bold',
        marginBottom: '2%'
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: '1%'
    },
    image: {
        width: 140,
        height: 180
    },
    description: {
        fontSize: 16,
        marginVertical: '1%'
    },
    rowPrice: {
        flexDirection: 'row',
        height: 45,
        justifyContent: 'space-between',        
        alignItems: 'center'
    },
    offer: {
        fontSize: 18,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        borderTopRightRadius: 50,
        borderBottomEndRadius: 50,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        backgroundColor: '#F47205'
    },
    buttonText: {
        color: '#FFF'
    }
});