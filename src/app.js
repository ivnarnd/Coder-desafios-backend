import  Express from "express";
import { ProductManager } from "./ProductManager.js";
const PORT = 8080;
let app = Express();
let productManager = new ProductManager('./src/products.json');

app.get('/products',(req,res)=>{
    const{limit} = req.query;
    productManager.getProducts().then((data)=>{
        if(limit){
            res.send(data.slice(0,limit));
        }else{
            res.send(data);
        }
    });
});
app.get('/products/:id',(req,res)=>{
    productManager.getProductById(req.params.id).then((data)=>{
        if (data){
            res.send(data);
        }else{
            res.send('El producto no existe');
        }
    });
});
app.listen(PORT,()=> console.log(`Servidor corriendo en localhost:${PORT}`));
