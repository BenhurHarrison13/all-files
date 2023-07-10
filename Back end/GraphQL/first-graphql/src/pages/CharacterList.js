import { useCharacters } from '../hooks/useCharacters';
import './CharacterList.css';
import {Link} from 'react-router-dom'


export const CharacterList = () => {

    const {error, data, loading} = useCharacters();
    
    if(loading) return <div>loading......</div>;

    if(error) return <div>Something went wrong</div>;

    return(
        <div className='CharacterList'>
            {data.characters.results.map((character) => {
                return(
                    <Link to={`/${character.id}`}>
                        <img src={character.image} alt="loading...."/>
                        <h2>{character.name}</h2>
                    </Link>
                );
            })}
        </div>
    );
}