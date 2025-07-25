import PokemonBox from "@/components/PokemonBox"
import { useState } from "react"
import { FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"

const SearchScreen: React.FC = ( {navigation} : any ) => {
    const [searchText, setSearchText] = useState<string>('')
    const [pokemonIDList, setPokemonIDList] = useState<number[]>([])

    const data = Array.from({ length: 20 }, (_, i) => ({ id: i.toString(), title: `Item ${i + 1}` }));


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

    const openDetailsPage = (ID: number): void => {

    }



    return (
        <View style={styles.container}>
            {/* <Text>Search Screen</Text> */}
            <TextInput
                placeholder="Search for Pokemon"
                value={searchText}
                onChangeText={search}
                style={styles.input}

            />

            {/* <BottomBar navigation={navigation} currentScreen="SwipeScreen" /> */}
            {/* <ScrollView style={styles.outputBox}>
                <View style={styles.pokemonboxList}>
                    {pokemonIDList.map((ID: number) => 
                        <TouchableOpacity key={ID} onPress={() => {console.log(`Pressed ${ID}`)}}>
                        <PokemonBox pokemonID={ID}/>
                    </TouchableOpacity>
                    )}
                </View>


            </ScrollView> */}

            <ScrollView style={styles.outputBox}>
                <FlatList
                    data={pokemonIDList}
                    keyExtractor={item => item.toString()}
                    numColumns={3}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.flatListContent}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => console.log(`Pressed ${item}`)}>
                        <PokemonBox pokemonID={item} />
                        </TouchableOpacity>
                    )}
                
                />
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // flex: 1,
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
  item: {
    padding: 10,
    fontSize: 16,
  },
  outputBox: {

    borderWidth: 1,
    borderColor: '#ccc',
    // width: '100%',
    height: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap'

  },

  flatListContent: {
    paddingBottom: 16,
    paddingTop: 10
  },

  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 8,
  },

//   pokemonboxList: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     width: 120,
//     justifyContent: 'flex-start',
//     // flexGrow: 1
    
//     // paddingHorizontal: 0
//   }
});

export default SearchScreen