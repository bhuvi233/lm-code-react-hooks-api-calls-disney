import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/header";
import CharacterContainer from "./components/character_container";
import Navigation from "./components/navigation";
import { DisneyCharacter } from "./disney_character";
import axios from "axios";

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [characterFavourites, setCharacterFavourites] = useState<
        Array<number>
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
        getCharacters(currentPage);
    }, [currentPage]);

    return (
        <div className="page">
            <Header currentPage={currentPage} />
            <Navigation
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <CharacterContainer
                characters={characters}
                characterFavourites={characterFavourites}
                updateFavourites={setCharacterFavourites}
            />
        </div>
    );
};

export default App;
