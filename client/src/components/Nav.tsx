import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import authService from "../utils/auth";

// Define the Nav component
const Nav: React.FC = () => {
  // Apollo Client and query for user data
  const client = useApolloClient();
  const { data, loading } = useQuery(GET_CURRENT_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(authService.loggedIn());
  
  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(authService.loggedIn());
    };

    // Listen for custom auth events
    window.addEventListener("login", handleAuthChange);
    window.addEventListener("logout", handleAuthChange);

    return () => {
      window.removeEventListener("login", handleAuthChange);
      window.removeEventListener("logout", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    try {
      client.clearStore();
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("logout")); // Trigger logout event
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="animate-pulse h-6 bg-gray-600 rounded w-20" />
     </nav>
    );
  }
  console.log("Is logged in:", authService.loggedIn())
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <NavLink to="/" >
            <img src="./images/DamicklesnPints.png" alt="Logo" style={styles.logo} />
          </NavLink> 
        </li>
        {!isAuthenticated ? (
          <li>
            <NavLink to="/login" style={styles.link}>Login</NavLink>
          </li>
        ) : (
          <>
          {data?.currentUser && (
            <li style={styles.navItem}>
              <span>Welcome, {data.currentUser.username}!</span>
            </li>
          )}
            <li style={styles.navItem}>
          <NavLink to="/" style={styles.link}>Home</NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink to="/menu" style={styles.link}>Menu Editor</NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink to="/reservation" style={styles.link}>Reservation Management</NavLink>
        </li>
            <li style={styles.navItem}>
              <button onClick={handleLogout} style={styles.button}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// Styles for the nav component
const styles = {
  nav: {
    backgroundColor: "#282c34",
    padding: "10px",
  },
  navList: {
    listStyleType: "none",
    display: "flex",
    justifyContent: "space-around",
    margin: 0,
    padding: 0,
  },
  navItem: {
    color: "white",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
  button: {
    backgroundColor: "#61dafb",
    border: "none",
    color: "black",
    padding: "5px 10px",
    cursor: "pointer",
  },
  logo: {
    height: "40px", // Adjust the size as needed
    marginRight: "20px", // Space between logo and nav items
  },
};

export default Nav;

