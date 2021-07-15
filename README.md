# Give access to organization and assign to a team

set github token and organization name in .env, check env-default for reference

### Run the server locally using
```
npm start
```


### Request format
route: post /access
{
    "emails": ["email1", "email2"],
    "teams" : ["team-name"]
}

route: get /teams
