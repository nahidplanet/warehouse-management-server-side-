const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lgtub.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async () => {
  try{
    await client.connect();
    const productCollections = client.db("rayz").collection("product");

    // PRODUCT 
    app.get('/product',async (req,res)=>{
      const query = {};
      const cursor = productCollections.find(query);
      const products = await cursor.toArray();
      res.send(products);
    })
    // PRODUCT DETAILS BY ID 
    app.get('/product/:id',async (req,res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const product = await productCollections.findOne(query);
      res.send(product);
    })




  }finally{
    // client.close();
  }

}
run().catch(console.dir);


app.get("/",(req,res)=>{
  res.send("Rayz API Home");
});
app.listen(port,()=>{
  console.log("Rayz Server Is Running",port);
})