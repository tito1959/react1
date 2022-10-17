import "./App.css";

/**
 * Renderizando colleciones:
 */

const notes = [
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

function App() {
  return (
    <div className="App">
      <ul>
        {notes.map((note) => (
          <li key={note.id} >
            <p>{note.content}</p>
            <small>
              <time>{note.date}</time>
            </small>
            <hr></hr>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
