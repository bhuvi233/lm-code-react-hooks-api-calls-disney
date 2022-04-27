import { useContext } from "react";
import { FavouritesContext } from "../App";
import { DisneyCharacter } from "../disney_character";

// for our props we can reuse the DisneyCharacter interface
interface CharacterProps {
    character: DisneyCharacter;
    updateFavourites: (favourites: Array<DisneyCharacter>) => void;
}

// - defining an anonymous type that just has one property - a DisneyCharacter
const Character: React.FC<CharacterProps> = ({
    character,
    updateFavourites,
}) => {
    const characterFavourites = useContext(FavouritesContext);

    const toggleFavouriteForCharacter = (characterId: number) => {
        if (
            characterFavourites.filter(
                (character) => character._id === characterId
            ).length === 0
        ) {
            //add to favourites
            updateFavourites([...characterFavourites, character]);
        } else {
            //remove from favourites
            const updatedFavourites = characterFavourites.filter(
                (character) => character._id !== characterId
            );
            updateFavourites(updatedFavourites);
        }
    };
    console.log(characterFavourites.length);

    return (
        <article className="character-item">
            <h2>{character.name}</h2>

            <div
                className="character-item__actions"
                onClick={() => toggleFavouriteForCharacter(character._id)}
            >
                {characterFavourites.filter(
                    (disCharacter) => disCharacter._id === character._id
                ).length === 0
                    ? "Add to Favourites"
                    : "Favourited"}
            </div>

            <img
                className="character-item__img"
                src={character.imageUrl}
                alt={character.name}
            />
        </article>
    );
};

export default Character;
