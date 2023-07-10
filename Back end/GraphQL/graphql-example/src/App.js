import './App.css';
import { Routes, Route } from 'react-router-dom';
import { FilmList } from './pages/FilmList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FilmList />} />
      </Routes>
    </div>
  );
}

export default App;
