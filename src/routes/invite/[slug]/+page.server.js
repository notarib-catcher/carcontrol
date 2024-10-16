import { fail, redirect } from "@sveltejs/kit";
import { config } from "dotenv"
import * as URL from "url"
config()

import SpotifyWebApi from "spotify-web-api-node";

import { MongoClient } from 'mongodb';

//@ts-ignore
const dbClient = new MongoClient(process.env.MONGODB_URL)
const database = dbClient.db("carcontrol");
const acl = database.collection("acl")
const status = database.collection("status")

export const load = async (event) => {
    const session = await event.locals.auth();
    
    const slug = event.params.slug

    if (!session?.user) {
        throw redirect(302, "/signin/"+slug)
    }

    // @ts-ignore
    const invite = await acl.findOne({_id: "invite"})
    if(!invite){
        throw redirect(302, "/?failinvite")
    }

    if(invite.content == ""){
        throw redirect(302, "/?failinvite")
    }

    if(invite.content != slug){
        throw redirect(302, "/?failinvite")
    }

    // @ts-ignore
    const aclList = await acl.findOne({_id: "acl"})

    // @ts-ignore
    if(aclList.emails.includes(session.user.email)){
        throw redirect(302, "/?alreadywhitelisted")
    }

    const adminID = await acl.findOne({
        "_id" : {
            //@ts-ignore
            "$eq" : "admin-email"
        }
    })

    // @ts-ignore
    if(adminID.email == session.user.email){
        throw redirect(302, "/?alreadywhitelisted")
    }

    // @ts-ignore
    aclList.emails.push(session.user.email)

    // @ts-ignore
    await acl.findOneAndUpdate({_id: "acl"},{
        $set:{
            // @ts-ignore
            emails: aclList.emails
        }
    })

    if((invite.uses + 1) >= invite.maxuses){
        await acl.findOneAndUpdate({
            // @ts-ignore
            _id:"invite"
        },{
            $set:{
                content:"",
                uses:0
            }
        })
    }

    else{
        await acl.findOneAndUpdate({
            // @ts-ignore
            _id:"invite"
        },{
            $inc: "uses"
        })
    }

    throw redirect(302,"/?whitelisted")

}