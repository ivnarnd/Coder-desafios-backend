import  Express from "express";
import multer from "multer";
import prodsRouter from "../src/routes/products.routes.js";
import cardsRouter from "./routes/carts.routes.js";
import {__dirname} from "./path.js";
import path from "path";
const PORT = 8080;
let app = Express();
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'src/public/img');
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}${file.originalname}`);
    }
})
const upload = multer({storage:storage});
app.use(Express.json());
app.use(Express.urlencoded({extended:true}));
app.use('/static',Express.static(path.join(__dirname,'/public')))

app.use('/api/products',prodsRouter);
app.use('/api/carts',cardsRouter);
app.post('/upload',upload.single('product'),(req,resp)=>{
    console.log(req.file);
    console.log(req.body);
    resp.status(200).send('Imagen subida');
})
app.listen(PORT,()=> console.log(`Servidor corriendo en localhost:${PORT}`));
