import { gql } from '@apollo/client'

export const DELETE_DATA_MUTATION = gql`
  mutation deleteTweet($id: ID!) {
    deleteTweet(id: $id) {
      id
      body
      date
      Author {
        id
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
`;