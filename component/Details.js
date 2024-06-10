import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Details({ route }) {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.strDrink}</Text>
            <Text style={styles.description}>Category: {item.strCategory}</Text>
            <Text style={styles.description}>Alcoholic: {item.strAlcoholic}</Text>
            <Text style={styles.description}>Glass: {item.strGlass}</Text>
            <Text style={styles.description}>Instructions: {item.strInstructions}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default Details;
