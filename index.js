const express=require("express")
const app=express()

require('dotenv').config()
const cors=require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express')
app.use(cors())
const port = process.env.PORT || 5000;
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hello Olipur  backend sever")
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7auxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const Volunteercollection=client.db("Olipur").collection("volunteer")
       app.get('/volunteer',async(req,res)=>{
        const query={}
        const result=Volunteercollection.find(query)
        const review=await result.toArray()
        res.send(review)
       })
       //post data
       app.post('/volunteer',async(req,res)=>{
        const newUser=req.body
        console.log('adding new user',newUser);
        const result=await Volunteercollection.insertOne(newUser)
        res.send(result)
    })

    }
    finally{

    }

}
run().catch(console.dir)
app.listen(port,()=>{
    console.log(`Running server ${port}`);
})