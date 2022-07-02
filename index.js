const express = require('express');
const { MongoClient } = require('mongodb');
const cors= require('cors');
const app = express();
const port = process.env.PORT  || 5000;

// middleware
app.use(cors());
app.use(express.json());


// passs: fWc1TEgiKZZzF82M
// user : emaAppUser

const uri = "mongodb+srv://emaAppUser:fWc1TEgiKZZzF82M@cluster0.q8coo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        console.log('db connect success fully');
        const database = client.db('online_shop');
        const productCollection = database.collection('products');


        app.get('/products' , async(req , res)=>{
            const page = req.query.page;
            const size = parseInt(req.query.size);

            const cursor = productCollection.find({});
            const count = await cursor.count();


            let products;
            if(page){
                products= await cursor.skip(page*size).limit(size).toArray();
            }else{
                products = await cursor.toArray();
            }

            res.send(
                {
                    count , products
                });

        } );
    }
    finally{
        // await client.close();
    }

}

run().catch(console.dir)

app.get('/' , (req, res)=>{
    res.send('ema app 3')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))