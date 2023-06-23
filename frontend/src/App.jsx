import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Main from './pages/Main';
import ShowAllVeggies from './pages/ShowAllVeggies';
import CreateNewVeggie from './pages/CreateNewVeggie';
import ShowSingleVeggie from './pages/ShowSingleVeggie';
import ShowSingleVeggieById from './pages/ShowSingleVeggieById';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/showAllVeggies" element={<ShowAllVeggies />} />
                <Route path="/createNewVeggie" element={<CreateNewVeggie />} />
                <Route
                    path="/showSingleVeggie"
                    element={<ShowSingleVeggie />}
                />
                <Route
                    path="/showSingleVeggie/:name"
                    element={<ShowSingleVeggieById />}
                />
            </Routes>
        </Layout>
    );
}

export default App;
