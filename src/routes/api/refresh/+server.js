import { fail, redirect } from "@sveltejs/kit";
import { config } from "dotenv"
import * as URL from "url"
config()


import { MongoClient } from 'mongodb';
import SpotifyWebApi from "spotify-web-api-node";
import { stat } from "fs";
import spotify from "@auth/sveltekit/providers/spotify";

//@ts-ignore
const dbClient = new MongoClient(process.env.MONGODB_URL)
const database = dbClient.db("carcontrol");
const acl = database.collection("acl")
const status = database.collection("status")

export async function GET(req) {

    
    if (req.request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response("Error",{
            status: 401
        })
    }

    // @ts-ignore
    const ccreds = await status.findOne({_id: "spotify-creds"})

    if(!ccreds) return new Response("Error",{
        status: 500
    })

    if(Date.now() > ccreds.eat) return new Response("Timed out upstream",{
        status: 511
    })

    const spotify = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENTID,
        clientSecret: process.env.SPOTIFY_SECRET,
        redirectUri: (process.env.NODE_ENV === 'development')?"http://localhost/spotify/callback":"https://carcontrol.aary.dev/spotify/callback"
    }) 

    spotify.setAccessToken(ccreds.token)
    spotify.setRefreshToken(ccreds.refresh)

    const tokenNew = await spotify.refreshAccessToken()

    if(tokenNew.statusCode != 200){
        // @ts-ignore
        await status.findOneAndUpdate({_id: "spotify-creds"},{$set:{eat:0}})
        return new Response("Error",{
            status: 500
        })
    }

    console.log(tokenNew)
    // @ts-ignore
    await status.findOneAndUpdate({_id: "spotify-creds"},
        {
            $set:
            {
                token: tokenNew.body.access_token,
                refresh: tokenNew.body.refresh_token,
                eat: new Date().getTime() + (tokenNew.body.expires_in * 1000)
            }
        }
    )

    return new Response("Success",{
        status: 200
    })


}