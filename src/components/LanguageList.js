import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './languageList.css';

const LanguageList = () => {
  const [languageList, setLanguageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [languageToDelete, setLanguageToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editLanguage, setEditLanguage] = useState(null);
  

  useEffect(() => {
    const fetchLanguageList = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/languagelist/');
        setLanguageList(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'An error occurred');
        setLoading(false);
      }
    };
    

    fetchLanguageList();
  }, []);

  const handleDelete = (language) => {
    setLanguageToDelete(language);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/languagelist/${languageToDelete.id}/`);
      setLanguageList(prevList => prevList.filter(language => language.id !== languageToDelete.id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleEdit = (language) => {
    setEditLanguage(language);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:8000/api/languagelist/${editLanguage.id}/`, editLanguage);
      setLanguageList(prevList => prevList.map(language =>
        language.id === editLanguage.id ? editLanguage : language
      ));
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };
  const hideDeleteConfirmation = () => {
    setLanguageToDelete(null);
    setShowDeleteModal(false);
  };
  

  const formatDate = (dateStr, timeZone) => {
    const date = new Date(dateStr);
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: timeZone,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const filteredList = languageList.filter(language =>
    language.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error fetching data: {error}</div>;
  }

  return (
    <div className="language-list-container">
      <div className="header">
        <h1>Language List</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Meaning</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map(language => (
              <tr key={language.id}>
                <td>{language.title}</td>
                <td>{language.description}</td>
                <td>{language.meaning}</td>
                <td>{language.status}</td>
                <td>{formatDate(language.created_at, 'UTC')}</td>
                <td>{formatDate(language.updated_at, 'UTC')}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(language)}>Edit</button>
                  <button onClick={() => handleDelete(language)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Language</h2>
            <input
              type="text"
              placeholder="Title"
              value={editLanguage?.title || ''}
              onChange={(e) => setEditLanguage({ ...editLanguage, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={editLanguage?.description || ''}
              onChange={(e) => setEditLanguage({ ...editLanguage, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Meaning"
              value={editLanguage?.meaning || ''}
              onChange={(e) => setEditLanguage({ ...editLanguage, meaning: e.target.value })}
            />
            <select
              value={editLanguage?.status || 'to_learn'}
              onChange={(e) => setEditLanguage({ ...editLanguage, status: e.target.value })}
            >
              <option value="to_learn">To Learn</option>
              <option value="learned">Learned</option>
              <option value="forgot">Forgot</option>
            </select>
            <div className="button-container">
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Delete Language</h2>
            <p>Are you sure you want to delete "{languageToDelete?.title}"?</p>
            <div className="button-container">
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={hideDeleteConfirmation} className="cancel-btn">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageList;
