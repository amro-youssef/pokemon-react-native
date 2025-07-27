import capitaliseFirstLetter from "@/utils/capitaliseFirstLetter"
import { JSX, useEffect, useState } from "react"
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native"

type PokeBoxProps = {pokemonID: number}

const PokemonBox = ( {pokemonID} : PokeBoxProps) : JSX.Element => {
    const [pokemonName, setPokemonName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() =>  {
        const getName = async (id: number): Promise<void> => {
            try {
                setLoading(true)
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                const data = await res.json()
            
                setPokemonName(capitaliseFirstLetter(data.name))
            } catch (error) {
                console.error("Failed to fetch Pokemon name:", error)
            } finally {
                setLoading(false)
            }
        }

        getName(pokemonID)
    }, [pokemonID])

    return (
        <View style={styles.box}>
            {loading ?
                <ActivityIndicator size="large" color="#acc5fcff" style={styles.img} />
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
        display: 'flex',
        width: 102,
        height: 120,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#e6f1f5',
        margin: 6,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
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
        fontFamily: 'arial',
        fontSize: 16,
        textAlign: 'center',
        flexWrap: 'wrap',
        width: 100
    }

})

export default PokemonBox