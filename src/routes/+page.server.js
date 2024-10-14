import { fail } from "@sveltejs/kit";
import { config } from "dotenv"
import * as URL from "url"
config()

import { MongoClient } from 'mongodb';

//@ts-ignore
const dbClient = new MongoClient(process.env.MONGODB_URL)
const database = dbClient.db("carcontrol");
const acl = database.collection("acl")
const status = database.collection("status")

export const load = async (event) => {
    const session = await event.locals.auth();
    
    if (!session?.user) {
      return {
        access: 0,
        list: null,
        status: null
        
      }; //Not logged in => No access
    }

    const adminID = await acl.findOne({
        "_id" : {
            //@ts-ignore
            "$eq" : "admin-email"
        }
    })


    const emaillist = await acl.findOne({
        "_id":{
            //@ts-ignore
            "$eq":"acl"
        }
    })

    const cstatus = await status.findOne({
        "_id":{
            //@ts-ignore
            "$eq":"status"
        }
    })

    if(adminID?.email == session.user.email){
        return {
            access: 2,
            // @ts-ignore
            list: emaillist.emails,
            // @ts-ignore
            status: cstatus.status
            
            
        }
    }

    if(emaillist?.emails.includes(session.user.email)){
        return {
            access: 1,
            list: null,
            //@ts-ignore
            status: cstatus.status
        }
    }

    return {
        access: 0,
        list: null,
        status: null
    }
}

export const actions = {
    invokespotify : async (event) => {
        const session = await event.locals.auth();
    
        if (!session?.user) {
            // @ts-ignore
            return fail(401, "Not logged in"); //Not logged in => No access
        }

        const adminID = await acl.findOne({
            "_id" : {
                //@ts-ignore
                "$eq" : "admin-email"
            }
        })
    
        //@ts-ignore
        const emaillist = await acl.findOne({
            "_id":{
                //@ts-ignore
                "$eq":"acl"
            }
        })

        if(session.user.email != adminID?.email && !emaillist?.emails.includes(session.user.email)){
            // @ts-ignore
            return fail(403, "unauthorized")
        }

        //AUTHORIZED

        const cstatus = await status.findOne({
            "_id":{
                //@ts-ignore
                "$eq":"status"
            }
        })

        if(!cstatus?.status){
            // @ts-ignore
            return fail(423, "playback disallowed")
        }

        const request = event.request
        const data = await request.formData()
        const spotifyUrl = data.get("spotifyurl")

        if(!spotifyUrl){
            return fail(400)
        }

        if(!stringIsAValidUrl(spotifyUrl)){
            return fail(400)
        }

        const spotifyURLParsed = new URL.URL(spotifyUrl.toString().trim())
         
        if(!(spotifyURLParsed.hostname == "open.spotify.com") || !spotifyURLParsed.pathname.startsWith("/track")){
            return fail(400)
        }

        //Parsed and valid
        
    }
}

const stringIsAValidUrl = (/** @type {string | { toString: () => string; }} */ s) => {
    try {
      new URL.URL(s);
      return true;
    } catch (err) {
      return false;
    }
  };