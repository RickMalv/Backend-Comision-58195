const express = require('express');
const ProductManager = require('./ProductManger');

const server = express();
const port = 3000; 

server.use(express.urlencoded({extended:true}));

const manager = new ProductManager('./src/products.json')

server.get('/',(req, res)=>{
    res.send('HEllo world')
})

server.get('/products', async (req, res)=>{
    let products = await manager.getProducts();

    const {description} = req.query;
    
    if(description){
        products = products.filter(p=>p.description.includes(description))
    }

    res.send(products)
})


server.listen(port, ()=>console.log(`Server up and running on port ${port}`));