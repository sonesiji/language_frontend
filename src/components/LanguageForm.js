import React, { useState } from 'react';
import axios from 'axios';
import './language.css';

const LanguageForm = () => {
  const [language, setLanguage] = useState({
    title: '',
    description: '',
    meaning: '',
    status: 'to_learn',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLanguage(prevLanguage => ({
      ...prevLanguage,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/languagelist/', language);
      console.log('Response:', response);
      setLanguage({
        title: '',
        description: '',
        meaning: '',
        status: 'to_learn'
      });
      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while adding the language.');
      setIsLoading(false);
    }
  };

  return (
    <div className="language-form-container">
      <h2 className="form-title">Add New Language</h2>
      <form onSubmit={handleSubmit} className="language-form">
        <div className="form-group">
          <input
            type="text"
            name="title"
            value={language.title}
            onChange={handleChange}
            placeholder="Title"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={language.description}
            onChange={handleChange}
            placeholder="Description"
            className="form-input"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <textarea
            name="meaning"
            value={language.meaning}
            onChange={handleChange}
            placeholder="Meaning"
            className="form-input"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <select
            name="status"
            value={language.status}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="to_learn">To Learn</option>
            <option value="learned">Learned</option>
            <option value="forgot">Forgot</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={Intl.DateTimeFormat().resolvedOptions().timeZone}
            readOnly
            className="form-input"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className={`submit-button ${isLoading ? 'loading' : ''}`}>
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default LanguageForm;
