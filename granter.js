const { Octokit } = require("@octokit/rest");
const express = require("express")

const app = express()
require('dotenv').config()

const octokit = new Octokit({
    auth: process.env.CATALYST_ADMIN_TOKEN
});

const ORGANIZATION = process.env.ORGANIZATION
const PORT = 9999 || process.env.PORT


// retrieve id from github username, useful when adding user to teams via github api
const getUserIdFromUserName = async (userName) => {
    try{
        const response = await octokit.request(`GET /users/${userName}`)
        return Number(response.data.id)
    }
    catch(err){
        console.log(err.response.status, err.response.data)
    }
} 

//get all teams associated with github token
const getAllTeams = async () => {
    try{
        const response = await octokit.request(`GET /orgs/${ORGANIZATION}/teams`)
        const teams = response.data
        console.table(
            teams.map(team => {
                return {
                "Team": team.id,
                "Name": team.name
                }
            })
        )
    }
    catch(err){
        console.log(err.response.status, err.response.data)
    }
}

// gives access to userid with given teams array
const giveTeamsAccess = async (userId, team_ids) => {
    try{
        const response = await octokit.request(`POST /orgs/${ORGANIZATION}/invitations`, {
            invitee_id: userId,
            team_ids : team_ids
        })
        console.log(response.data)
    }
    catch(err){
        console.log(err.response.status, err.response.data)
    }
}

//bulk add users to catalyst
addMultipleUsersToCatalyst = () => {
    const userIds = [58245868] //list of users
    const teamIds = [4064135] //list of teams to give access to
    userIds.forEach(userId => {
        giveTeamsAccess(userId, teamIds)
    })
}

//REST API
app.get('/addUser', async (req, res) => {
    const userId = await getUserIdFromUserName(req.query.username)
    giveTeamsAccess(userId, [Number(process.env.TW_EXPLORER_ID)])
})

app.listen(PORT, () => console.log(`Giving access from ${PORT}`))