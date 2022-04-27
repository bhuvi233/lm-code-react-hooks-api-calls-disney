// our props have two properties - a number, and a function that takes a number and returns void

import { useContext, useState } from "react";
import { FavouritesContext } from "../App";
import { DisneyCharacter } from "../disney_character";

// we can define this as an interface
interface NavigationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    updateCharacters: (characters: Array<DisneyCharacter>) => void;
}

const Navigation: React.FC<NavigationProps> = ({
    currentPage,
    setCurrentPage,
    updateCharacters,
}) => {
    const { favourites } = useContext(FavouritesContext);

    const [showAllCharacters, setshowAllCharacters] = useState<boolean>(true);

    const nextPage = () => {
        const newPageNumber = currentPage + 1;
        setCurrentPage(newPageNumber);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            const newPageNumber = currentPage - 1;
            setCurrentPage(newPageNumber);
        }
    };

    const showFavourites = () => {
        updateCharacters(favourites);
        setshowAllCharacters(false);
        setCurrentPage(0);
    };

    const showAll = () => {
        setCurrentPage(1);
        setshowAllCharacters(true);
    };

    return showAllCharacters ? (
        <div className="navigation">
            <div className="navigation__item">
                <button className="navigation__button" onClick={prevPage}>
                    Prev Page
                </button>
            </div>
            <div className="navigation__item">
                <button className="navigation__button" onClick={showFavourites}>
                    Show Favourites
                </button>
            </div>
            <div className="navigation__item">
                <button className="navigation__button" onClick={nextPage}>
                    Next Page
                </button>
            </div>
        </div>
    ) : (
        <div className="navigation">
            <div className="navigation__item">
                <button className="navigation__button" onClick={showAll}>
                    Show All
                </button>
            </div>
        </div>
    );
};

export default Navigation;
