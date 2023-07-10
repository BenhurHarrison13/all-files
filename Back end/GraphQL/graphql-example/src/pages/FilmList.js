import { useCharacters } from '../hooks/useCharacters';
import './FilmList.css';


export const FilmList = () => {

    const {error, data, loading} = useCharacters();
    
    if(loading) return <div>loading......</div>;

    if(error) return <div>Something went wrong</div>;

    
    const films = data?.allFilms?.films;

  return (
    <div className='film-list'>
    <h1>Film List</h1>
    {films.map(film => (
      <div key={film.title} className='film'>
        <h3>{film.title}</h3>
        <p>Director: {film.director}</p>
        <p>Release Date: {film.releaseDate}</p>
        {film.speciesConnection.species.map(species => (
          <div key={species.name} className='species'>
            <p>Species: {species.name}</p>
            <p>Classification: {species.classification}</p>
            <p>Homeworld: {species.homeworld?.name || 'Unknown'}</p>
          </div>
        ))}
      </div>
    ))}
  </div>
  );
}