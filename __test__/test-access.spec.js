const axios = require('axios')

describe('testing access route', () => {
	test('test for invalid user name', async () => {
		const response = await axios.post('http://localhost:9999/access', {
            "usernames": ["Rahil23434", "Prashant2411"],
            "teams":["tw-explorers"]
        })
		console.log(response);
		for(let i=0;i<response.length;i++){
			console.log(response);
			if(i == 0){
				expect(response.status).toEqual(200)	
				expect(response.data.errors.message).toEqual("Invite requires either user or email")
			}
			if(i == 1){
				expect(response.status).toEqual(200)	
				expect(response.data.errors.message).toEqual("Invitee is already a part of this org")
			}
		}
	})
})