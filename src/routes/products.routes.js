import { Router } from "express";
import  {ProductManager} from "../ProductManager.js";
import { Product } from "../Product.js";

let productManager = new ProductManager('./src/products.json');
const prodsRouter = Router();

prodsRouter.get('/',(req,res)=>{
    const{limit} = req.query;
    productManager.getProducts().then((data)=>{
        if(limit){
            res.status(200).send(data.slice(0,limit));
        }else{
            res.status(200).send(data);
        }
    });
});

prodsRouter.get('/:pid',(req,res)=>{
    productManager.getProductById(req.params.pid).then((data)=>{
        if (data){
            res.status(200).send(data);
        }else{
            res.status(404).send('El producto no existe');
        }
    });
});
prodsRouter.post('/',(req,res)=>{
    let product = {};
    let {title,description,price,thumbnail,code,stock,category,status} = req.body;
    if(title && description && price && code && stock && category){
        productManager.getProductByCode(code).then((resp)=>{
            if(resp){
                res.status(400).send('Producto ya existente');
            }else{
                product = new Product(title,description,price,thumbnail,code,stock,category,status);
                productManager.addProduct(product)
                .then(resp => res.status(200).send(resp))
                .catch(error => res.status(400).send(error));
            }
        });
    }else{
        res.status(404).send('Los campos son obligatorios');
    }
    
});
prodsRouter.put('/:pid',(req,res)=>{
    productManager.updateProduct(parseInt(req.params.pid),req.body)
    .then( msj => res.status(200).send(msj))
    .catch(msj=>res.status(400).send(msj));
});
prodsRouter.delete('/:pid',(req,res)=>{
    productManager.deleteProduct(parseInt(req.params.pid))
    .then( msj => res.status(200).send(msj))
    .catch(msj=>res.status(400).send(msj));
});


export default prodsRouter;