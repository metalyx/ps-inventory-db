import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <button>
                    <Link to={'/'}>Go home</Link>
                </button>
                <button>
                    <Link to={'/createNewVeggie'}>Create a Veggie</Link>
                </button>
                <button>
                    <Link to={'/showAllVeggies'}>Show 'em all!</Link>
                </button>
                <button>
                    <Link to={'/showSingleVeggie'}>Show one Veggie</Link>
                </button>
            </nav>
        </header>
    );
};

export default Header;
