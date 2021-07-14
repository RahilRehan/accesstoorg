const axios = require('axios')

describe('testing access route', () => {
	test('test invalid user', async () => {
		const response = await axios.post('http://localhost:9999/access', {
            "usernames": ["Rahil23434"],
            "teams":["tw-explorers"]
        })
		for(let i=0;i<response.length;i++){
			if(i == 0){
				expect(response.data.status).toEqual(422)
			}
		}
	})

	test('test for user who is already present', async () => {
		const response = await axios.post('http://localhost:9999/access', {
            "usernames": ["Prashant2411"],
            "teams":["tw-explorers"]
        })
		for(let i=0;i<response.length;i++){
			if(i == 0){
				expect(response.data.status).toEqual(422)
			}
		}
	})

	test('test for empty user list', async () => {
		const response = await axios.post('http://localhost:9999/access', {
            "usernames": [],
            "teams":["tw-explorers"]
        })
		expect(response.data.length).toEqual(0)
	})

	test('test for empty teams list, will default to tw-explorers and check for user who is alredy present', async () => {
		const response = await axios.post('http://localhost:9999/access', {
            "usernames": ["Prashant2411"],
            "teams":[]
        })
		for(let i=0;i<response.length;i++){
			if(i == 0){
				expect(response.data.status).toEqual(422)
			}
		}
	})
	// test('test for bad credentials', async () =>{
	// 	const response = await axios.post('http://localhost:9999/access', {
    //         "usernames": ["Prashant2411"],
    //         "teams":[]
    //     })
	// 	for(let i=0;i<response.length;i++){
	// 		if(i == 0){
	// 			expect(response.body.message).toEqual("Bad credentials")
	// 		}
	// 	}
	// })
})

describe('testing teams route', () => {
	test('get all teams of org', async () =>{
		const response = await axios('http://localhost:9999/teams')
		expect(response.status).toEqual(200)
		expect(response.data)
	})
	// test('test for bad credentials', async () =>{
	// 	const response = await axios('http://localhost:9999/teams')
	// 	expect(response.data.response.data.message).toEqual("Bad credentials")
	// })
})