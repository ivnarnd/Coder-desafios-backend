import  Express from "express";
import multer from "multer";
import prodsRouter from "../src/routes/products.routes.js";
import cardsRouter from "./routes/carts.routes.js";
import {__dirname} from "./path.js";
import { Server } from "socket.io";
import path from "path";
import { engine } from "express-handlebars";

const PORT = 8080;
let app = Express();
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
let messages = [];
io.on('connection',(socket)=>{
    console.log('Servidor socket io conectado: ');
    socket.on('messageConecction',(info)=>{
        if(info.role === 'Admin'){
            socket.emit('messageControl',`${info.user} Bienvenido Usted es Admin`);
        }else{
            socket.emit('messageControl',`Usted no es Admin`);
        }
    });
    socket.on('message',(infoMessage)=>{
        messages.push(infoMessage);
        socket.emit('messages',messages);
    })
});

app.use('/api/products',prodsRouter);
app.get('/static',(req,res)=>{res.render('chat')});
app.use('/api/carts',cardsRouter);
app.post('/upload',upload.single('product'),(req,resp)=>{
    console.log(req.file);
    console.log(req.body);
    resp.status(200).send('Imagen subida');
})

