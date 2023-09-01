import  Express from "express";

import prodsRouter from "../src/routes/products.routes.js";
import cardsRouter from "./routes/carts.routes.js";
import {__dirname} from "./path.js";
import path from "path";

const PORT = 8080;
let app = Express();
console.log(__dirname);
app.use(Express.json());
app.use(Express.urlencoded({extended:true}));

app.use('/api/products',prodsRouter);
app.use('/static',Express.static(path.join(__dirname,'/public')))
app.use('/api/carts',cardsRouter);

app.listen(PORT,()=> console.log(`Servidor corriendo en localhost:${PORT}`));
