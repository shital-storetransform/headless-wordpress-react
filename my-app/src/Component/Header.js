import React, { useEffect, useState } from 'react';
// import './Header.css';  // Make sure to import the CSS file

function Header() {
    const [siteData, setSiteData] = useState(null);
    const [menus, setMenus] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to control mobile menu visibility

    useEffect(() => {
        // Fetch site settings (like title, description, logo, etc.)
        fetch('http://wordpress-project.local/wp-json/wp/v2/settings')
            .then((response) => response.json())
            .then((data) => setSiteData(data))
            .catch((error) => console.error('Error fetching site settings:', error));

        // Fetch menus from the WP REST API Menus plugin endpoint
        fetch('http://wordpress-project.local/wp-json/wp/v2/menus')
            .then((response) => response.json())
            .then((data) => {
                console.log('Menus Data:', data);  // Log menu data to check structure
                if (Array.isArray(data) && data.length > 0) {
                    setMenus(data); // Set the entire data as menu items if it's flat
                    console.log('Menus state updated:', data); // Log updated state
                } else {
                    console.log('No menus found or menu data structure is different.');
                }
            })
            .catch((error) => console.error('Error fetching menus:', error));
    }, []);

    // If site data is still being fetched, show loading message
    if (!siteData) {
        return <div>Loading...</div>;
    }

    console.log("Menus State in render:", menus); // Log state in render

    // Toggle mobile menu visibility
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="site-header">
            <div className="site-info">
                {/* Display site title */}
                <h1>{siteData.name}</h1>
                <p>{siteData.description}</p>
            </div>

            {/* Mobile menu toggle button */}
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                ☰
            </button>

            {/* Render navigation menu if available */}
            {menus.length > 0 ? (
                <nav className={`site-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul>
                        {menus.map((item) => (
                            <li key={item.ID}>
                                <a href={item.url}>{item.title}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            ) : (
                <p>No menu items available</p>
            )}

            {/* Optionally, add a logo if available */}
            {siteData.logo && (
                <div className="site-logo">
                    <img src={siteData.logo} alt="Site Logo" />
                </div>
            )}
        </header>
    );
}

export default Header;
