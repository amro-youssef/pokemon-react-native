import { useEffect, useState } from "react"
import { Image, StyleSheet, Text, View, ActivityIndicator } from "react-native"


const PokemonBox = ( {pokemonID} : any) => {
    const [pokemonName, setPokemonName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() =>  {
        const getName = async (id: number): Promise<void> => {
            try {
                setLoading(true)
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                const data = await res.json()
            
                setPokemonName(data.name.charAt(0).toUpperCase() + data.name.slice(1))
            } catch (error) {
                console.error("Failed to fetch Pokémon name:", error)
            } finally {
                setLoading(false)
            }
        }

        getName(pokemonID)
    }, [pokemonID])

    const getName = async (id: number): Promise<string> => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        
        return data.name
    }

    return (
        <View style={styles.box}>
            {loading ?
                <ActivityIndicator size="large" color="#acf6fcff" />
            :
            <Image
                source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`
                }}
                style={styles.img}
            />
            }
            <Text style={styles.text}>{pokemonName}</Text>

            {/* <BottomBar navigation={navigation} currentScreen="SwipeScreen" /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        // flex: 1,
        display: 'flex',
        // width: '100%',
        width: 102,
        height: 120,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#e6f1f5',
        // padding: 8,
        margin: 6,
        alignContent: 'center',
        // justifyContent: 'center'
        
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,

        // Shadow for Android
        elevation: 5,
    },
    img: {
        width: 90,
        height: '45%',
        marginTop: 12,
        marginBottom: 15,
        

    },
    text: {
        justifyContent: 'center',
        // alignContent: 'center',
        fontFamily: 'arial',
        fontSize: 16,
        textAlign: 'center',
        flexWrap: 'wrap',
        width: 100
    }

})

export default PokemonBox