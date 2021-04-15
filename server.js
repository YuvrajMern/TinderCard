import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js'
import Cors from 'cors';

//App Config

const app=express();
const port=process.env.port||8001

//Middle wares
app.use(express.json());
app.use(Cors());//Cors consists of headers



//DB config
const connection_url='mongodb+srv://yuvraj:yUvraj@9@cluster0.cmnws.mongodb.net/mernstack?retryWrites=true&w=majority'

mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("Connected Sucessfully")
    }).catch((err)=>{
    console.log("not connected")
    });

//API endpoints
app.get('/',(req,res)=>{ 
    res.status(200).send("Hello world");
})

app.post('/tinder/card',(req,res)=>{
    const dbCard=req.body;
    Cards.create(dbCard,(err,data)=>{

     if(err)
     {
      res.status(500).send(err)
     }else{
      res.status(201).send(data);
     }
    })

})

app.get('/tinder/card',(req,res)=>{
    Cards.find((err,data)=>{
if(err)
{
    res.status(500).send(err);
}else{
res.status(201).send(data);
console.log(data);
}
    })
})

//Listener
app.listen(port,()=>{
    console.log(`listining on localhost: ${port}`)
})

