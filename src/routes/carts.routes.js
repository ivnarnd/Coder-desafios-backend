import { Router } from "express";
import  {CartManager} from "../CartManager.js";
import {Cart} from "../Cart.js";
import { ProductManager } from "../ProductManager.js";
let productManager = new ProductManager('./src/products.json');
let cartManager = new CartManager('./src/carts.json');
const cartsRouter = Router();
cartsRouter.get('/',(req,res)=>{
    const{limit} = req.query;
    cartManager.getCarts().then((data)=>{
        if(limit){
            res.status(200).send(data.slice(0,limit));
        }else{
            res.status(200).send(data);
        }
    });
});

cartsRouter.post('/',(req,resp)=>{
    let cart = new Cart()
    cartManager.addCart(cart)
    .then(msj=>resp.status(200).send(msj))
    .catch(msj=>resp.status(400).send(msj));
});

cartsRouter.get('/:cid',(req,resp)=>{
    cartManager.getProductsById(req.params.cid)
    .then((data)=>{
        if (data){
            resp.status(200).send(data)
        }else{
            resp.status(400).send('El carrito con ese id no existe');
        }
    });
        
    
});
cartsRouter.post('/:cid/product/:pid',async (req,resp)=>{
    let {cid,pid} = req.params;
    let {quantity} = req.body;
    let product = await productManager.getProductById(pid);
    let cart = await cartManager.getCartById(cid);
    if(cart){
        if(product){
            let ind = cart.products.findIndex(productBD => productBD.id == pid);
            if(ind !== -1){
                cart.products[ind].quantity += quantity;
            }else{
                cart.products.push({"id":pid,"quantity":1});
            }
            cartManager.updateCart(cid,cart).then(data => console.log(data));
            resp.status(200).send(`El Producto fue agregado satisfactoriamente`);
            
        }else{
            resp.status(400).send(`El Producto con el id ${pid} no existe`);
        }
        
    }else{
        resp.status(400).send(`El carrito con el id ${cid} no existe`);
    }

   
    
});



export default cartsRouter;