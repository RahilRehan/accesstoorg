# Give access to organization and assign to a team

change env according to env-default
set github token and organization name

### Run the server locally using
```
npm start
```


### Request format
route: post /access
{
    "usernames": ["user1", "user2"],
    "teams" : ["team-name"]
}

route: get /teams
