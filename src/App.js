import React, { useState } from "react";
import './App.css';
import FormModal from './FormModal';
import SearchResults from './SearchResults';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const openModal = (db) => {
    setSelectedDatabase(db);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/mysql/search?query=${searchQuery}`);
      const result = await response.json();
      setSearchResults(result);
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Select the Database</h1>
      <div className="button-group">
        <button onClick={() => openModal('mysql')}>MySQL</button>
        <button onClick={() => openModal('neo4j')}>Neo4J</button>
        <button onClick={() => openModal('solr')}>Apache SOLR</button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <SearchResults results={searchResults} />
      {isModalOpen && (
        <FormModal 
          isOpen={isModalOpen} 
          toggleModal={closeModal} 
          database={selectedDatabase}
        />
      )}
    </div>
  );
}

export default App;
