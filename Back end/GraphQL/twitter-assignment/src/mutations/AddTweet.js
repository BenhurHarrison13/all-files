import { gql } from '@apollo/client'

export const ADD_DATA_MUTATION = gql`
    mutation createTweet($body: String!) {
      createTweet(body: $body){
        id
        body
    }
}
`