import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShowSingleVeggie = () => {
    const [name, setName] = useState('');
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate();

    const validateName = () => {
        if (!name.trim().length) {
            setIsValid(false);
            return false;
        } else {
            setIsValid(true);
            return true;
        }
    };

    useEffect(() => {
        validateName();
    }, [name]);

    const searchHandle = () => {
        if (!validateName()) {
            return;
        }

        return navigate(`/showSingleVeggie/${name}`);
    };

    return (
        <div>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            {!isValid && (
                <p>Name of the veggie must have at least one character</p>
            )}
            <button type="button" onClick={searchHandle}>
                Search
            </button>
        </div>
    );
};

export default ShowSingleVeggie;
