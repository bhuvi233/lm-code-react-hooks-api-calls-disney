import { useContext } from "react";
import { FavouritesContext } from "../App";
import { DisneyCharacter } from "../disney_character";

// for our props we can reuse the DisneyCharacter interface
interface CharacterProps {
    character: DisneyCharacter;
    //updateFavourites: (favourites: Array<DisneyCharacter>) => void;
}

// - defining an anonymous type that just has one property - a DisneyCharacter
const Character: React.FC<CharacterProps> = ({
    character,
    //updateFavourites,
}) => {
    const { favourites, updateFavourites } = useContext(FavouritesContext);

    const toggleFavouriteForCharacter = (characterId: number) => {
        if (
            favourites.filter((character) => character._id === characterId)
                .length === 0
        ) {
            //add to favourites
            updateFavourites([...favourites, character]);
        } else {
            //remove from favourites
            const updatedFavourites = favourites.filter(
                (character) => character._id !== characterId
            );
            updateFavourites(updatedFavourites);
        }
    };
    console.log(favourites.length);

    return (
        <article className="character-item">
            <h2>{character.name}</h2>

            <div
                className="character-item__actions"
                onClick={() => toggleFavouriteForCharacter(character._id)}
            >
                {favourites.filter(
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
