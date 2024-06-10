import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FavoriScreen from './component/FavoriScreen';
import Details from './component/Details';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen({ navigation, route }) {
    const [drinksData, setDrinksData] = useState([]);
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

    useEffect(() => {
        const fetchDrinks = async () => {
            for (const letter of letters) {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
                const data = await response.json();
                if (data.drinks) {
                    setDrinksData(oldDrinksData => [...oldDrinksData, ...data.drinks]);
                }
            }
        };
        fetchDrinks();
    }, []);

    const handleAddToFavorites = (item) => {
        route.params.setFavorites((oldFavorites) => [...oldFavorites, item]);
    };

    return (
        <View style={styles.container}>
            <Text style={{ marginTop: 10, marginBottom: 50, fontWeight: 'bold' }}>Bar à Cocktail Slim Shady</Text>
            <FlatList
                data={drinksData}
                keyExtractor={(item) => item.idDrink}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Cover style={styles.imageCard} source={{ uri: item.strDrinkThumb }} />
                        <Card.Content>
                            <View style={styles.containerCard}>
                                <Text style={styles.titleCard}>{item.strDrink}</Text>
                                <Ionicons name="heart" size={30} color="red" style={{ marginTop: 10 }} onPress={() => handleAddToFavorites(item)} />
                                <Ionicons name="eye" size={30} color="blue" style={{ marginTop: 10 }} onPress={() => navigation.navigate('Details', { item })} />
                            </View>
                        </Card.Content>
                    </Card>
                )}
            />
        </View>
    );
}

function HomeStack({ route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                initialParams={{ setFavorites: route.params.setFavorites }}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
    );
}

export default function App() {
    const [favorites, setFavorites] = useState([]);

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Accueil"
                    component={HomeStack}
                    initialParams={{ setFavorites }}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Favoris"
                    children={() => <FavoriScreen favorites={favorites} setFavorites={setFavorites} />}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="heart" size={size} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
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
    titleContainer: {
        padding: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleCard: {
        marginTop: 10,
        marginLeft: 10,
        textAlign: 'center',
        fontSize: 20,
        padding: 0,
    },
    containerCard: {
        padding: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
