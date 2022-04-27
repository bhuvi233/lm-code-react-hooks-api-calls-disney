import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/header";
import CharacterContainer from "./components/character_container";
import Navigation from "./components/navigation";
import { DisneyCharacter } from "./disney_character";
import axios from "axios";

export const FavouritesContext = React.createContext<DisneyCharacter[]>([]);

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [characterFavourites, setCharacterFavourites] = useState<
        Array<DisneyCharacter>
    >([]);

    // Some dummy state representing disney characters
    const [characters, setCharacters] = useState<Array<DisneyCharacter>>([]);

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
        <FavouritesContext.Provider value={characterFavourites}>
            <div className="page">
                <Header currentPage={currentPage} />
                <Navigation
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    updateCharacters={setCharacters}
                />
                <CharacterContainer
                    characters={characters}
                    updateFavourites={setCharacterFavourites}
                />
            </div>
        </FavouritesContext.Provider>
    );
};

export default App;
