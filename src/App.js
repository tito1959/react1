import './App.css';
import { Note } from './components/Note';

const notes = [
  {
    id: 1,
    title: "Nota 1",
    body: "Test Nota 1 hacia el componente List..."
  }
]

function App() {
  return (
    <div className="App">
      <Note notes={notes} />
    </div>
  );
}

export default App;
