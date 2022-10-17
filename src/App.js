import { useState } from "react";
import "./App.css";
import { Note } from "./components/Note";

/**
 * Renderizando colleciones:
 * 
 * 1. Los arreglos son la mejor opcion para almacenar datos, estos permiten devolver arreglos vacion en caso de fallo
 * 2. cuando se itera una lista de elementos react requiere que indiquemos un indice unico, (no usar el index del arreglo [value, index])
 * 2.2 No usar Math.random, en casos especiales preferiblemente usar lo contradicho en el 2.
 * 3. Los componentes se puede modularizar, js modules, exportar por default o declarandolos, (declara requiere entre llaves llamar el mismo param exportado)
 * 4. 
 */

const notesList = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.0982",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only  JavaScript",
    date: "2019-05-30T19:20.298Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods",
    date: "2019-05-30T19:20:14.298D",
    important: true,
  },
];

/**
 * Formularios y eventos:
 * Para almacenar informacion de un input y usarlo en otro nodo, usaremos un usestate como variable de intercambio
 * handleclick creara un objeto con los datos capturados por handlechange.
 * !Importante! En react no se deben mutar los obj y arrays, para ello creamos un nuevo elemento
 */


function App() {

  const [notes, setNotes] = useState(notesList);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);


  const handleChange = (e) => {
    setNewNote(e.target.value);
  }

  const handleClick = (e) => {
    console.log("crear nota");
    e.preventDefault();

    // Agregar nueva nota a la lista de objetos
    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    console.log(noteToAddToState);
    // agregamos a la lista de notas el obj:
    setNotes(notes.concat(noteToAddToState));
    // limpiamos el input:
    setNewNote("");
  }

  const handleShowAll = () => {
    setShowAll(() => !showAll);
  }


  /**
   * notes: pasa por un filtro, si showall es true, muestra todas las notas, de lo contrario
   * solo mostrara las que contengan true y pasan por el map.
   */

  return (
    <div className="App">
      <h1>Notes</h1>
      <button onClick={handleShowAll}>{showAll ? "Show only important" : "Show All"}</button>
      <ul>
        {notes
          .filter(note => {
            if (showAll) return true;
            return note.important === true; // filtra todas las notas por la porpiedad important = true
          })
          .map((note) => (<Note
            key={note.id}
            id={note.id}
            content={note.content}
            date={note.date}
          />))}
      </ul>

      <form onSubmit={handleClick}>
        <input type="text" onChange={handleChange} />
        <button type="submit">Crear Nota</button>
      </form>
    </div>
  );
}

export default App;
