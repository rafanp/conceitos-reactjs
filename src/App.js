import React, { useState, useEffect} from "react";
import api from './services/api.js'

import "./styles.css";

function App() {
  const [repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data);
    });
  } , []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Novo repositório ${Date.now()}`,
      url: 'https://github.com/rafanp',
      techs: ['C++',"ReactJS","Node.js"]
    });

    const repository = response.data;

    setRepositories([ ...repositories, repository]);
    console.log(repositories);
  }


  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
    
  }


  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => 
        <li key = {repository.id} > 

          {repository.title} 
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)
      }
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;