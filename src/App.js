import React, { useState, useEffect } from 'react';

import './App.css';
import LanguageForm from './components/LanguageForm';
import LanguageList from './components/LanguageList';
import Login from './components/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  useEffect(() => {
    alert('Username: admin\nPassword: password');
  }, []);
  

  const styles = {
    logoutButton: {
      padding: '12px 24px',
      borderRadius: '4px',
      background: '#dc3545',
      color: '#fff',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '20px',
    },
    logoutButtonHover: {
      background: '#c82333',
    },
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1 className="header-title">Company Dictionary</h1>
          <p className="header-subtitle">Discover and Learn Languages</p>
        </div>
      </header>
      <main className="App-main">
        <div className="container">
          {!isLoggedIn ? (
            <Login onLogin={handleLogin} />
          ) : (
            <>
              <button
                style={styles.logoutButton}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.logoutButtonHover.background}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.logoutButton.background}
                onClick={handleLogout}
              >
                Logout
              </button>
              <h2 className="section-title">Add New Language</h2>
              <LanguageForm />
              <hr className="divider" />
              <h2 className="section-title">Languages List</h2>
              <LanguageList />
            </>
          )}
        </div>
      </main>
      <footer className="App-footer">
        <div className="footer-content">
          <p className="footer-text">Crafted with ❤️ by Your Company</p>
        </div>
      </footer>
    </div>
  );
};

export default App;