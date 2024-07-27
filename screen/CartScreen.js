import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../redux/action';

const CartScreen = ({ navigation }) => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const renderCartItem = ({ item }) => {
        const totalPrice = item.price * item.quantity; // Calculate total price based on quantity
        return (
            <View style={styles.cartItem} >
                <Image style={styles.image} source={{ uri: item.image }} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.totalPrice}>Rs {totalPrice}</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="+" onPress={() => dispatch(incrementQuantity(item.id))} />
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <Button title="-" onPress={() => dispatch(decrementQuantity(item.id))} />
                    </View>
                    <Text style={styles.category}>Category: {item.category}</Text>
                </View>
            </View>
        );
    };

    const cartArray = Object.values(cartItems);

    return (
        <View style={styles.container}>
            <FlatList
                data={cartArray}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    cartItem: {
        marginBottom: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        color: '#333',
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 10,
    },
    category: {
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    quantity: {
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CartScreen;
