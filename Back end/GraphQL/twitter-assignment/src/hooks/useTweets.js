import {useQuery, gql} from '@apollo/client'



const GET_TWEETS = gql`
    query {
        Tweets {
            id
            body
            date
            markAsRead
            Author {
                username
                full_name
                avatar_url
            }
            Stats {
                views
                likes
                retweets
                responses
            }
        }
    }
`


export const useTweets = () => {

    const {error, data, loading, refetch} = useQuery(GET_TWEETS);

    return{
        error,
        data,
        loading,
        refetch,
    }
}