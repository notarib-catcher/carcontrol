import { fail, redirect } from "@sveltejs/kit";
import * as URL from "url"
import { config } from "dotenv"
import "spotify-web-api-node"


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


    const spotify = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENTID,
        clientSecret: process.env.SPOTIFY_SECRET,
        redirectUri: (process.env.NODE_ENV === 'development')?"http://localhost/spotify/callback":"https://carcontrol.aary.dev/spotify/callback"
    }) 

    return {
        signinURL: spotify.createAuthorizeURL(
            ["user-read-currently-playing","user-modify-playback-state","user-read-playback-position","user-read-email"],
            "online",true
        )
    }

}