import  Express from "express";
import multer from "multer";
import prodsRouter from "../src/routes/products.routes.js";
import cardsRouter from "./routes/carts.routes.js";
import {__dirname} from "./path.js";
import { Server, Socket } from "socket.io";
import path from "path";
import { engine } from "express-handlebars";
import { ProductManager } from "./ProductManager.js";
import { Product } from "./Product.js";

const PORT = 8080;
let app = Express();
const productManager = new ProductManager('./src/products.json');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'src/public/img');
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}${file.originalname}`);
    }
});
const server = app.listen(PORT,()=> console.log(`Servidor corriendo en localhost:${PORT}`));

app.engine('handlebars',engine());
app.set('view engine','handlebars');
app.set('views',path.resolve(__dirname,'./views'));

const upload = multer({storage:storage});
app.use(Express.json());
app.use(Express.urlencoded({extended:true}));
app.use('/static',Express.static(path.join(__dirname,'/public')))

const io = new Server(server);

io.on('connection',(socket)=>{
    console.log('Servidor socket io conectado: ');
    socket.on('AddProduct',(product) =>{
        let productOb = new Product(product);
        productManager.addProduct(productOb).then(data => console.log(`producto agregado: ${data}`));
    });
    socket.on('Products',()=> productManager.getProducts().then(data =>  socket.emit('ProdsResp',data))
    );
});

app.use('/api/products',prodsRouter);
app.get('/static',(req,res)=>{
    productManager.getProducts().then(data => res.render('home',
    {
        arrProducts: data,
        js:"./js/script.js"
    }))
});
app.get('/static/realtimeproducts',(req,res)=>{
    res.render('realTimeProducts',
    {
        js:"./js/realTimeProducts.js"
    })
});
app.use('/api/carts',cardsRouter);
app.post('/upload',upload.single('product'),(req,resp)=>{
    console.log(req.file);
    console.log(req.body);
    resp.status(200).send('Imagen subida');
})

