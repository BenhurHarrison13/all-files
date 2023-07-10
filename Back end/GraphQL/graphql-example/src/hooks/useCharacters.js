import {useQuery, gql} from '@apollo/client'



const GET_CHARACTERS = gql`
  query {
    allFilms {
      films {
        title
        director
        releaseDate
        speciesConnection {
          species {
            name
            classification
            homeworld {
              name
            }
          }
        }
      }
    }
  }
`


export const useCharacters = () => {

    const {error, data, loading} = useQuery(GET_CHARACTERS);

    return{
        error,
        data,
        loading
    }
}