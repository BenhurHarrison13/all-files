const data = require("./db.json");



exports.resolvers = {
    Query: {
      Tweet: (parent, { id }) => {
        return data.tweets.find(tweet => tweet.id === id);
      },
      Tweets: (parent, { limit, skip, sort_field, sort_order }) => {
        let tweets = data.tweets;
        return tweets;
      },
      TweetsMeta: () => {
        return { count: data.tweets.length };
      },
      User: (parent, { id }) => {
        return data.users.find(user => user.id === id);
      },
      Notifications: (parent, { limit }) => {
        let notifications = data.notifications;
  
        if (limit) {
          notifications = notifications.slice(0, limit);
        }
  
        return notifications;
      },
      NotificationsMeta: () => {
        return { count: data.notifications.length };
      },
    },

    Mutation: {
      createTweet: (parent, { body }) => {
        const createTweet = {
          id: String(data.tweets.length + 1),
          body,
          date: new Date().toISOString(),
          Author: {
            id: "4",
            username: "Benhur Harrison",
            first_name: "Benhur",
            last_name: "Harrison",
            full_name: "Benhur Harrison",
            avatar_url: "https://clipart-library.com/new_gallery/335-3350454_twitter-logo-inside-a-gear-api-twitter.png"
          },
          Stats: {
            views: 0,
            likes: 0,
            retweets: 0,
            responses: 0
          }
        };
  
        data.tweets.push(createTweet);
  
        return createTweet;
      },
  

      deleteTweet: (parent, { id }) => {
        const tweetIndex = data.tweets.findIndex((tweet) => tweet.id === id);
  
        if (tweetIndex > -1) {
          const deletedTweet = data.tweets.splice(tweetIndex, 1);
          return deletedTweet[0];
        }
      },
      markTweetRead: (parent, { id }) => {
        const tweet = data.tweets.find(tweet => tweet.id === id);
        tweet.markAsRead = !tweet.markAsRead;
  
        return tweet.markAsRead;
      },
      
    },
  };