const { Octokit } = require("@octokit/rest");
const express = require("express")
const cors = require("cors")

const app = express()
require('dotenv').config()

let oktokit

const getOctokit = async (token) => {
    return await new Octokit({
        auth: token
    })
}

const ORGANIZATION = process.env.ORGANIZATION
const PORT = 9999 || process.env.PORT


// retrieve id from github username, useful when adding user to teams via github api
const getUserIdFromUserName = async (userName, oktokit) => {
    try{
        const response = await octokit.request(`GET /users/${userName}`)
        return Number(response.data.id)
    }
    catch(err){
        return err
    }
} 
//get all teams associated with github token
const getAllTeams = async () => {
    try{
        const response = await octokit.request(`GET /orgs/${ORGANIZATION}/teams`)
        const teams = response.data.map(team => {
            return {Name: team.name, Id: team.id}
        })
        return teams
    }
    catch(err){
        return err
    }
}

// gives access to email with given teams array
const giveTeamsAccess = async (email, teamIds) => {
    try{
        const response = await octokit.request(`POST /orgs/${ORGANIZATION}/invitations`, {
            email: email,
            team_ids : teamIds
        })
        response
    }
    catch(err){
        return err
    }
}

const getTeamIds = async (teams) => {
    try{
        const teamIds = []
        for(let team of teams){
            let resp = await octokit.request(`GET /orgs/${ORGANIZATION}/teams/${team}`)
            teamIds.push(Number(resp.data.id))
        }
        return teamIds
    }catch(err){
        return err
    }
}

//REST API
app.use(express.json())
app.use(cors())

app.post('/access', async (req, res) => {
    ghtoken = req.headers.authorization.split(" ")[1]
    octokit = await getOctokit(ghtoken)
    let emails = req.body.emails
    let teamsIds = await getTeamIds(req.body.teams)
    teamsIds = teamsIds.length==0 ? [Number(process.env.TW_EXPLORER_ID)] : teamsIds
    responses = []
    for(let email of emails){
        let teamAccessResponse = await giveTeamsAccess(email, teamsIds)
        console.log(teamAccessResponse);
        responses.push({status:teamAccessResponse.status, body:teamAccessResponse.response.data})
    }
    res.send(responses)
})

app.get('/teams', async (req, res) => {
    ghtoken = req.headers.authorization.split(" ")[1]
    octokit = await getOctokit(ghtoken)
    const teams = await getAllTeams()
    res.send(teams)
})

app.listen(PORT, () => console.log(`Giving access from ${PORT}`))