import { Router } from "express";
import  {CartManager} from "../CartManager.js";
import { Cart } from "../Cart.js";

let cardManager = new CartManager('./src/carts.json');
const cardsRouter = Router();

cardsRouter.post('/',(req,resp)=>{
    let {products} = req.body;
    let cart = new Cart(products)
    cardManager.addCart(cart)
    .then(msj=>resp.status(200).send(msj))
    .catch(msj=>resp.status(400).send(msj));
});

cardsRouter.get('/:cid',(req,resp)=>{
    cardManager.getProductsById(req.params.cid)
    .then((data)=>{
        if (data){
            resp.status(200).send(data)
        }else{
            resp.status(400).send('El carrito con ese id no existe');
        }
    });
        
    
});



export default cardsRouter;