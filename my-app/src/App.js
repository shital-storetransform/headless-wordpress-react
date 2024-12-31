// src/App.js
import React from 'react';
import './App.css';
import Header from './Component/Header';  // Import Header
import Footer from './Component/Footer';  // Import Footer
import Posts from './posts';  // Assuming Posts component for displaying posts
import Banner from './Component/Banner';
import Products from './Component/Product';
// import BuddyPanel from './Component/BuddyPanel';



function App() {
    return (
        <div className="App">
            <Header />   {/* Display WordPress Header */}
            {/* <BuddyPanel/> */}
            <Banner /> 
            <Posts />    {/* Display WordPress Posts */}
            <Products/>
            <Footer />   {/* Display WordPress Footer */}
        </div>
    );
}

export default App;
