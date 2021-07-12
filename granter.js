var request = require('request');

var headers = {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${GH_TOKEN}`,
    'user-agent': 'none'
};

var options = {
    url: 'https://api.github.com/orgs/rahil-rehan/memberships/RahilRehan',
    method: 'PUT',
    headers: headers
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
    console.log(response.body)
}

request(options, callback);