import React, { useCallback, useState } from 'react';
import axios from 'axios';

const CreateNewVeggie = () => {
    const [formFields, setFormFields] = useState({
        name: '',
        color: '',
    });
    const [validationErrors, setValidationErrors] = useState({
        name: '',
        color: '',
    });
    const [networkState, setNetworkState] = useState({
        error: '',
        isLoading: false,
        isSuccess: false,
    });

    const changeHandle = (e) => {
        setFormFields({
            ...formFields,
            [e.target.id]: e.target.value,
        });
    };

    const validateField = useCallback((e) => {
        if (e.target.value.trim() === '') {
            setValidationErrors({
                ...validationErrors,
                [e.target.id]: 'This field cannot be empty!',
            });

            return false;
        } else {
            setValidationErrors({
                ...validationErrors,
                [e.target.id]: '',
            });
        }

        return true;
    });

    const createVeggie = async () => {
        if (
            validationErrors.color.length ||
            validationErrors.name.length ||
            !formFields.color ||
            !formFields.name
        ) {
            return;
        }

        try {
            setNetworkState({
                ...networkState,
                isLoading: true,
                isSuccess: false,
                error: '',
            });

            await axios.post('http://localhost:5000/create_veggie', {
                name: formFields.name,
                color: formFields.color,
            });

            setNetworkState({
                ...networkState,
                isLoading: false,
                isSuccess: true,
            });
        } catch (e) {
            setNetworkState({
                ...networkState,
                error: e.message,
                isLoading: false,
                isSuccess: false,
            });
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            {networkState.isSuccess && (
                <p style={{ color: 'green' }}>
                    Successfully created a new veggie!
                </p>
            )}
            <div>
                <label htmlFor="name">Name of new Veggie</label>
                <input
                    onBlur={validateField}
                    type="text"
                    id="name"
                    onChange={changeHandle}
                />
                {validationErrors.name && (
                    <p style={{ color: 'red' }}>{validationErrors.name}</p>
                )}
            </div>
            <div>
                <label htmlFor="color">Color of new Veggie</label>
                <input
                    onBlur={validateField}
                    type="text"
                    id="color"
                    onChange={changeHandle}
                />
                {validationErrors.color && (
                    <p style={{ color: 'red' }}>{validationErrors.color}</p>
                )}
            </div>
            <button onClick={createVeggie} disabled={networkState.isLoading}>
                Create
            </button>
        </form>
    );
};

export default CreateNewVeggie;
