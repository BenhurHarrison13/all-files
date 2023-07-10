import styled from 'styled-components';
import { useTweets } from './hooks/useTweets';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DATA_MUTATION } from './mutations/AddTweet';
import { DELETE_DATA_MUTATION } from './mutations/DeleteTweet';
import { MARK_TWEET_MUTATION } from './mutations/markAsRead';
import { Box, Button, InputAdornment, TextField, Stack } from '@mui/material';
import TwitterIcon from '@material-ui/icons/Twitter';

const TwitterFeedContainer = styled(Box)`
  padding: 1.25rem;
  width: 600px;
  margin: 0 auto;
`;

const TweetContainer = styled(Box)`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const TweetHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Avatar = styled('img')`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const AuthorDetails = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const Username = styled('div')`
  font-weight: bold;
`;

const FullName = styled('div')`
  color: #888;
`;

const TweetBody = styled('div')`
  margin: 10px 0;
`;


const Stat = styled('div')`
  color: #888;
`;

const DeleteButton = styled(Button)`
  color: red;
  flex: 0 0 auto;
`;

const Status = styled.a`
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

const SearchBarContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SearchBarForm = styled('form')`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchBarInput = styled(TextField)`
  color: #888;
  width: 100%;
`;

const SearchBarSubmitButton = styled(Button)`
  color: #888;
  margin-left: 8px;
`;

const App = () => {
  const { loading, error, data, refetch } = useTweets();
  const [createTweet] = useMutation(ADD_DATA_MUTATION);
  const [deleteTweet] = useMutation(DELETE_DATA_MUTATION);
  const [markTweetRead] = useMutation(MARK_TWEET_MUTATION);
  const [body, setBody] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handelSubmit = async (body) => {
    await createTweet({variables:{body}});
    refetch();
  }
  const handleDelete = async (id) => {
    await deleteTweet({ variables: { id } });
    refetch();
  };

  const markingAsRead = async (id) => {
    await markTweetRead({ variables: { id } });
    refetch();
  };

  return (
    <TwitterFeedContainer>
      <SearchBarContainer>
        <SearchBarForm
          onSubmit={() => {handelSubmit(body)}}>
          <TwitterIcon sx={{ color: '#888', marginRight: 1 }} />
          <SearchBarInput
            type="text"
            name="body"
            value={body}
            size='small'
            onChange={handleChange}
            placeholder="Tweet to @Twitterapi"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchBarSubmitButton type="submit" style={{textTransform:'none'}} size='small'>Submit</SearchBarSubmitButton>
                </InputAdornment>
              ),
            }}
          />
        </SearchBarForm>
      </SearchBarContainer>
      {data.Tweets.map((tweet) => (
        <TweetContainer key={tweet.id}>
          <TweetHeader>
            <Avatar src={tweet.Author.avatar_url} alt="Avatar" />
            <AuthorDetails>
              <Username>{tweet.Author.username}</Username>
              <FullName>{tweet.Author.full_name}</FullName>
            </AuthorDetails>
          </TweetHeader>
          <TweetBody>{tweet.body}</TweetBody>
          <Stack direction='row' justifyContent='space-between'>
            <Stack direction='row' spacing={2}>
              <Stat>Views: {tweet.Stats.views}</Stat>
              <Stat>Likes: {tweet.Stats.likes}</Stat>
              <Stat>Retweets: {tweet.Stats.retweets}</Stat>
              <Stat>Responses: {tweet.Stats.responses}</Stat>
            </Stack>  
            <Status onClick={() => markingAsRead(tweet.id)}>
                {tweet.markAsRead ? (
                  <Status style={{ color: 'green' }}>Read</Status>
                ) : (
                  <Status style={{ color: 'red' }}>Mark as Read</Status>
                )}
              </Status>
            <DeleteButton onClick={() => handleDelete(tweet.id)} style={{textTransform:'none'}} size='small'>Delete</DeleteButton>
          </Stack>
        </TweetContainer>
      ))}
    </TwitterFeedContainer>
  );
};

export default App;
