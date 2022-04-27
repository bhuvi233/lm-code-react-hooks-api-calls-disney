// note the anonymous type here for our props
// - a simple type like this doesn't always NEED an interface declaration
const Header: React.FC<{ currentPage: number }> = ({ currentPage }) => (
    <header className="header__container">
        <h1 className="header__title">The World of Disney</h1>
        {currentPage > 0 ? (
            <p className="header__page-count "> Page: {currentPage}</p>
        ) : null}
    </header>
);

export default Header;
