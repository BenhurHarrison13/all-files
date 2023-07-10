import { useParams } from "react-router";
import { useCharacter } from "../hooks/useCharacter"
import './CharacterList.css';



export const Character = () => {

    const {id} = useParams();

    const {data, loading, error} = useCharacter(id);

    console.log({data,loading,error});

    if(loading) return <div>loading......</div>;

    if(error) return <div>Something went wrong</div>;

    return(
        <div className="Character">
            <img src={data.character.image} width={750} height={750} alt="" />
            <div className="Character-content">
                <h1>{data.character.name}</h1>
                <div className="Character-episode">
                    {data.character.episode.map(episode => {
                        return(
                            <div>
                                {episode.name} - <b>{episode.episode}</b>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}