import  Express from "express";

import prodsRouter from "../src/routes/products.routes.js";

const PORT = 8080;
let app = Express();

app.use(Express.json());
app.use(Express.urlencoded({extended:true}));

app.use('/api/products',prodsRouter);


app.listen(PORT,()=> console.log(`Servidor corriendo en localhost:${PORT}`));
