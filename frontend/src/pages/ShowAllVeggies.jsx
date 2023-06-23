import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ShowAllVeggies = () => {
    const [veggies, setVeggies] = useState([]);
    const [networkState, setNetworkState] = useState({
        error: '',
        isLoading: false,
        isSuccess: false,
    });

    useEffect(() => {
        const fetchVeggies = async () => {
            try {
                setNetworkState({
                    isLoading: true,
                    isSuccess: false,
                    error: '',
                });

                const { data } = await axios.get(
                    'http://localhost:5000/veggies'
                );

                setVeggies(data);

                setNetworkState({
                    isLoading: false,
                    isSuccess: true,
                    error: '',
                });
            } catch (e) {
                setNetworkState({
                    isLoading: false,
                    isSuccess: false,
                    error: e.message,
                });
            }
        };

        fetchVeggies();
    }, []);

    return <div>{JSON.stringify(veggies)}</div>;
};

export default ShowAllVeggies;
