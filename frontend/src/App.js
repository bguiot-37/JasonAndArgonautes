import logo from './logo.png';
import './App.css';
import axios from "axios";
import {useState, useEffect} from "react";

function App() {
  const [argonautes, setArgonautes] = useState([]);
  const [addNomMembre, setAddNomMembre] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:8080/')
      .then((res) => setArgonautes(res.data));
  }, []);


  const addArgonaute = () => {
    axios
      .post('http://localhost:8080/', {
        nom: addNomMembre
      })
      .then((res) => {
        setArgonautes(res.data);
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <img src={logo} className="App-logo" alt="logo" />
          Les Argonautes
        </h1> 
      </header>
      <main>
        <h2>Ajouter un(e) Argonaute</h2>
          <form className="new-member-form">
            <label>Nom de l'Argonaute</label>
            <input id="name" name="nom" type="text" placeholder="Charalampos" onChange={(e) => setAddNomMembre(e.target.value)} />
            <button type="submit" onClick={addArgonaute}>Envoyer</button>
          </form>
        <h2>Membres de l'équipage</h2>
        <ul className="member-list">
          {argonautes.map((argonaute, index) => (
          <li className="member-item" key={index}>{argonaute.nom}</li>
          ))}
        </ul>
      </main>
      <footer>
        <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
      </footer>
    </div>
  );
}

export default App;
