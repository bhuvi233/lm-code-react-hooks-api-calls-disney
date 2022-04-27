import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/header";
import CharacterContainer from "./components/character_container";
import Navigation from "./components/navigation";
import { DisneyCharacter } from "./disney_character";
import axios from "axios";

export interface IFavourites {
    favourites: DisneyCharacter[];
    updateFavourites: (favourites: Array<DisneyCharacter>) => void;
}

export const FavouritesContext = React.createContext<IFavourites>({
    favourites: [],
    updateFavourites() {},
});

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [favourites, setFavourites] = useState<Array<DisneyCharacter>>([]);

    // Some dummy state representing disney characters
    const [characters, setCharacters] = useState<Array<DisneyCharacter>>([]);

    const updateFavourites = (characters: DisneyCharacter[]) => {
        setFavourites(characters);
    };

    const getCharacters = async (pageNumber: number) => {
        const apiResponse = await axios.get(
            `http://api.disneyapi.dev/characters?page=${pageNumber}`
        );
        setCharacters(apiResponse.data.data);
    };

    useEffect(() => {
        if (currentPage <= 0) return;
        getCharacters(currentPage);
    }, [currentPage]);

    return (
        <FavouritesContext.Provider value={{ favourites, updateFavourites }}>
            <div className="page">
                <Header currentPage={currentPage} />
                <Navigation
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    updateCharacters={setCharacters}
                />
                <CharacterContainer
                    characters={characters}
                    /*updateFavourites={setCharacterFavourites}*/
                />
            </div>
        </FavouritesContext.Provider>
    );
};

export default App;
