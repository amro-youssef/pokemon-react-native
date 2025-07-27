import ListRow from "@/components/ListRow";
import useFavoritePokemonStore from "@/store/useFavoritePokemonStore";
import capitaliseFirstLetter from "@/utils/capitaliseFirstLetter";
import { useLocalSearchParams } from "expo-router";
import { JSX, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View, Image, Button } from "react-native";
import Toast from 'react-native-toast-message'


const DetailsScreen = () : JSX.Element => {

    type PokemonInfo = {
        name: string;
        height: number;
        weight: string;
        species: string
        baseStats: BaseStats;
        sprite: string;
        numGames: number
    }

    type BaseStats = {
        hp: number,
        attack: number,
        defence: number,
        specialAttack: number,
        specialDefense: number,
        speed: number,
    }

    type SearchParams = {pokemonID? : string}
    const { pokemonID } = useLocalSearchParams<SearchParams>()
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>({name: '', height: 0, weight: '', species: '',
                     baseStats: {hp: 0, attack: 0, defence: 0, specialAttack: 0, specialDefense: 0, speed: 0}, sprite: '', numGames: 0})

    type FavoritePokemonStore = {
        addFavoritePokemon: (name: string) => void;
        favoritePokemon: string[];
    }
    const { addFavoritePokemon, favoritePokemon }: FavoritePokemonStore = useFavoritePokemonStore();

    useEffect(() : void => {
        console.log("use effect")
        const fetchInfo = async () => {
            try {
                const info = await getPokemonInfo();
                setPokemonInfo(info);
            } catch (error) {
                console.error("Failed to get Pokemon info:", error)
            }
        };
        fetchInfo();
    }, [])

    const getPokemonInfo  = async () : Promise<PokemonInfo> => {

        try{

            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
            const data = await res.json()
        
            const baseStats: BaseStats = {
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defence: data.stats[2].base_stat,
                specialAttack: data.stats[3].base_stat,
                specialDefense: data.stats[4].base_stat,
                speed: data.stats[5].base_stat,
            }
    
            return {
                name: data.name,
                height: data.height,
                weight: data.weight,
                species: data.species.name,
                baseStats: baseStats,
                sprite: data.sprites.front_default,
                numGames: data.game_indices.length
            }
        } catch (error) {
            console.error("Failed to retrieve Pokemon info", error)
            Toast.show({
                type: 'error',
                text1: `Failed to retrieve Pokemon info`,
            });

            return pokemonInfo
        }
    }

    const buttonPress = () : void => {
        if (pokemonInfo.name !== ''){
            addFavoritePokemon(pokemonInfo.name)
            Toast.show({
                type: 'success',
                text1: `Added ${capitaliseFirstLetter(pokemonInfo.name)} to Favorites`,
            });
        }

    }

    return (
        <View style={styles.view}>
            <Text style={styles.header}>{capitaliseFirstLetter(pokemonInfo.name)}</Text>

            <View style={styles.img_view}>
                {pokemonInfo.sprite !== "" ? 

                    <Image
                        style={styles.img}
                        source={{
                            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`
                        }}
                    />  :
                    <ActivityIndicator size="large" color="#acf6fcff" />
                }
            </View>

            <ListRow title="Height" value={pokemonInfo.height}/>
            <ListRow title="Weight" value={pokemonInfo.weight}/>
            <ListRow title="Species" value={pokemonInfo.species}/>
            <ListRow title="HP" value={pokemonInfo.baseStats.hp}/>
            <ListRow title="Attack" value={pokemonInfo.baseStats.attack}/>
            <ListRow title="Defence" value={pokemonInfo.baseStats.defence}/>
            <ListRow title="Special Attack" value={pokemonInfo.baseStats.specialAttack}/>
            <ListRow title="Special Defence" value={pokemonInfo.baseStats.specialDefense}/>
            <ListRow title="Speed" value={pokemonInfo.baseStats.speed}/>
            <ListRow title="Number of Games Appeared In:" value={pokemonInfo.numGames}/>

            <View style={styles.button}>
                <Button title="Add to Favorites" onPress={buttonPress}/>
            </View>

            <Toast position="bottom"/>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center',
        alignContent: 'center',
        fontFamily: 'arial',
        fontSize: 18,
        textAlign: 'center',
        flexWrap: 'wrap',
        // width: 100,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },

    img_view: {

        alignItems: 'center'
    },

    img: {
        height:180,
        width: 120
    },

    view: {
        width: '100%',
        height: '100%',
        fontSize: 24,
        alignContent: 'center'
    },

    header: {
        fontSize: 24,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        paddingTop: 10
    },

    value: {
        width: "49%"
        // marginRight: 50
    },

    button: {
        marginTop: 10,
    }

})

export default DetailsScreen