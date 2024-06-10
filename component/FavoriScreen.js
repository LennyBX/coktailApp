import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Card } from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons";

function FavoriScreen({ favorites, setFavorites }) {

    const deleteItemToFavorites = (itemToDelete) => {
        setFavorites(favorites.filter(item => item.idDrink !== itemToDelete.idDrink));
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.idDrink}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Cover style={styles.imageCard} source={{ uri: item.strDrinkThumb }} />
                        <Card.Content>
                            <View style={styles.containerCard}>
                                <Text style={styles.titleCard}>{item.strDrink}</Text>
                                <Ionicons name="trash" size={30} color="red" style={{ marginTop: 10 }} onPress={() => deleteItemToFavorites(item)} />
                            </View>
                        </Card.Content>
                    </Card>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        margin: 10,
        padding: 0,
    },
    imageCard: {
        width: '100%',
        height: 300,
    },
    containerCard: {
        padding: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleCard: {
        marginTop: 10,
        marginLeft: 10,
        textAlign: 'center',
        fontSize: 20,
        padding: 0,
    },
});

export default FavoriScreen;
