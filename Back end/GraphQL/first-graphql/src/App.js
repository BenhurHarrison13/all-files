import './App.css';
import { Character } from './pages/Character';
import { CharacterList } from './pages/CharacterList';
import { Routes, Route } from 'react-router-dom';
import { Search } from './pages/Search';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:id" element={<Character />} />
      </Routes>
    </div>
  );
}

export default App;
