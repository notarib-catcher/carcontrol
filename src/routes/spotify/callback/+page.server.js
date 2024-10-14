import { fail, redirect } from "@sveltejs/kit";
import { config } from "dotenv"
import * as URL from "url"
config()


import { MongoClient } from 'mongodb';
import SpotifyWebApi from "spotify-web-api-node";

//@ts-ignore
const dbClient = new MongoClient(process.env.MONGODB_URL)
const database = dbClient.db("carcontrol");
const acl = database.collection("acl")
const status = database.collection("status")

export const load = async (event) => {
    const session = await event.locals.auth();
    
    if (!session?.user) {
        throw redirect(302, "/") //Not logged in => No access
    }

    const adminID = await acl.findOne({
        "_id" : {
            //@ts-ignore
            "$eq" : "admin-email"
        }
    })

    if(session.user.email != adminID?.email){
        throw redirect(302, "/")
    }

    const code = event.url.searchParams.get('code')

    if(!code){
        throw redirect(302, "/spotify?failed")
    }

    const spotify = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENTID,
        clientSecret: process.env.SPOTIFY_SECRET,
        redirectUri: (process.env.NODE_ENV === 'development')?"http://localhost/spotify/callback":"https://carcontrol.aary.dev/spotify/callback"
    }) 

    const tokens = await spotify.authorizationCodeGrant(code)

    spotify.setAccessToken(tokens.body.access_token)

    const email = await spotify.getMe()

    

    await status.findOneAndUpdate({
        _id:{
            // @ts-ignore
            "$eq":"spotify-creds"
        }
    },{
        $set:{
            token: tokens.body.access_token,
            refresh: tokens.body.refresh_token,
            eat: new Date().getTime() + (tokens.body.expires_in * 1000),
            email: email.body.email
        }
    })

    return {
        success: true,
        as: email.body.email
    }


}