import  Express from "express";

import prodsRouter from "../src/routes/products.routes.js";
import cardsRouter from "./routes/carts.routes.js";

const PORT = 8080;
let app = Express();

app.use(Express.json());
app.use(Express.urlencoded({extended:true}));

app.use('/api/products',prodsRouter);
app.use('/api/cards',cardsRouter);

app.listen(PORT,()=> console.log(`Servidor corriendo en localhost:${PORT}`));
