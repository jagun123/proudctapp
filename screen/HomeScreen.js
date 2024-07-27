import { View, FlatList, Text, TouchableOpacity, Modal, Button, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import store from '../redux/store';
import { addToCart } from '../redux/action';

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const handleProductPress = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const handleAddToCart = () => {
        store.dispatch(addToCart(selectedProduct));
        setModalVisible(false);
        navigation.navigate('Cart');
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleProductPress(item)}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>Rs {item.price}</Text>
                <Text style={styles.category}>Category: {item.category}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
           
            {selectedProduct && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Image style={styles.modalImage} source={{ uri: selectedProduct.image }} />
                            <Text>Description: {selectedProduct.description}</Text>
                            <View style={styles.button}>
                                <Button title="Add to Cart" onPress={handleAddToCart} />
                                <Button title="Close" onPress={() => setModalVisible(false)} />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 20,
    },
    item: {
        marginBottom: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        padding: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
    },
    price: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 10,
    },
    category: {
        marginTop: 40,
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 10,
    },
    button: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
    },
    modalPrice: {
        fontSize: 18,
        color: '#333',
        marginBottom: 15,
    },
    modalImage: {
        width: 120,
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
});
