// src/Component/Footer.js
import React, { useEffect, useState } from 'react';

function Footer() {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        // Fetch footer menu items from the WordPress REST API
        fetch('http://wordpress-project.local/wp-json/wp/v2/footer-menu')
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setMenuItems(data); // Store menu items in state
                } else {
                    console.error('Invalid menu data format:', data);
                }
            })
            .catch((error) => console.error('Error fetching footer menu data:', error));
    }, []);

    if (!menuItems.length) {
        return <div>Loading Footer...</div>; // Show loading state while data is being fetched
    }

    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-column">
                    <p>&copy; {new Date().getFullYear()} Wordpress Project. All Rights Reserved.</p>
                </div>
                <div className="menu-column">
                    <ul className="footer-menu">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <a href={item.url}>{item.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
