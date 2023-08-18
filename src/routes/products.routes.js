import { Router } from "express";
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

export default prodsRouter;