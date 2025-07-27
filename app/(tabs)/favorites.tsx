import useFavoritePokemonStore from "@/store/useFavoritePokemonStore";
import capitaliseFirstLetter from "@/utils/capitaliseFirstLetter";
import { JSX } from "react";
import { Text, View, StyleSheet } from "react-native";




const FavoritesScreen = (): JSX.Element => {
    const { addFavoritePokemon, favoritePokemon } = useFavoritePokemonStore();

    return (
        <View>
            <Text style={styles.header}>These are your FAVORITE Pokemon:</Text>

            {favoritePokemon.map((name) => {
                return <Text style={styles.text} key={name}>{capitaliseFirstLetter(name)}</Text>
            })}

        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center',
        fontFamily: 'arial',
        fontSize: 18,
        textAlign: 'center',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
        borderColor: '#d6d3d3ff'
    },

    header: {
        fontSize: 20,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },


})

export default FavoritesScreen