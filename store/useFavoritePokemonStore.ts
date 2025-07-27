import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

type FavoritePokemonStore = {
    favoritePokemon: string[];
    addFavoritePokemon: (pokemonID: string) => void;
}
const useFavoritePokemonStore = create<FavoritePokemonStore>()(
    persist(
        (set, get) => ({
            favoritePokemon: [],
            addFavoritePokemon: (name: string) => {
                const current = get().favoritePokemon;
                // check for duplicates
                if (!current.includes(name)) {
                    set({ favoritePokemon: [...current, name] });
                }

            }
        }),
        {
            name: 'favoritePokemonStorage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)

export default useFavoritePokemonStore;