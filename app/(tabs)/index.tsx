import PokemonBox from "@/components/PokemonBox"
import { useRouter } from "expo-router"
import { JSX, useEffect, useState } from "react"
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"

const SearchScreen = () : JSX.Element  => {
    const [searchText, setSearchText] = useState<string>('')
    const [pokemonIDList, setPokemonIDList] = useState<number[]>([])

    const search = async (text: string): Promise<void> => {
        setSearchText(text.toLowerCase())

        // get all pokemon data
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
        const data = await res.json()

        const filteredPokemon = data.results.filter((result: any) => 
            result.name.startsWith(text.toLowerCase())
        )

        // extracts URLs of Pokemon starting with entered text
        const URLs = filteredPokemon.map((pokemon: any) => pokemon.url)

        // extract PokemonID from URLs
        const pokemonIDs = URLs.map((url: string) =>
            Number(url.substring(
                url.slice(0, -1).lastIndexOf("/") + 1,
                url.lastIndexOf("/")
            ))
        )

        setPokemonIDList(pokemonIDs)
    }

    useEffect(() => {
      // load pokemon on first render
      search("")
    }, [])


    const router = useRouter()
    const openDetailsPage = (ID: number): void => {
      router.push({
        pathname: '/details',
        params: {pokemonID: ID}
      })
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search for Pokemon"
                placeholderTextColor="#888"
                value={searchText}
                onChangeText={search}
                style={styles.input}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}

            />

            <FlatList
                data={pokemonIDList}
                horizontal={false}
                style={styles.outputBox}
                keyExtractor={item => item.toString()}
                numColumns={3}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.flatListContent}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openDetailsPage(item)}>
                      <PokemonBox pokemonID={item} />
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 16,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  outputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  flatListContent: {
    paddingBottom: 16,
    paddingTop: 10
  },
  columnWrapper: {
    paddingHorizontal: 8,
    marginBottom: 8,
  },
});

export default SearchScreen