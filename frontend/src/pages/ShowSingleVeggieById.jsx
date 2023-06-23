import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ShowSingleVeggieById = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [veggie, setVeggie] = useState();

    useEffect(() => {
        if (!name) {
            return navigate(-1);
        }

        const fetchVeggie = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/veggie/${name.toLowerCase()}`
                );
                setVeggie(data);
            } catch (e) {
                setVeggie(e.message);
            }
        };

        fetchVeggie();
    }, []);

    return <div>{JSON.stringify(veggie)}</div>;
};

export default ShowSingleVeggieById;
