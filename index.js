import { Product } from "./Product.js";
import { ProductManager } from "./ProductManager.js";
let productManager = new ProductManager('./products.json');
//obteniendo los productos
productManager.getProducts().then((data)=>{
    console.log('Productos: ',data);
}
);
//añadiendo producto
productManager.addProduct(new Product("Producto Prueba","Este es un producto prueba",200,"sin imagen","abc123",25))
.then(msj => console.log(msj));
//obteniendo los productos
productManager.getProducts().then((data)=>{
    console.log('Productos: ',data);
}
);
//añadiendo un producto repetido
productManager.addProduct(new Product("Producto Prueba","Este es un producto prueba",200,"sin imagen","abc123",25))
.then(msj => console.log(msj));
//obteniendo productos por id
productManager.getProductById(0).then(msj => console.log(msj));
productManager.getProductById(2).then(msj => console.log(msj));
//actualizando producto con id
productManager.updateProduct(2,{name:"Producto Prueba mod",description:"Este es un producto prueba",price:202,thumbnail:"sin imagen",code:"abc123",stock:25})
.then(msj => console.log(msj));
//eliminando producto con id
productManager.deleteProduct(1).then(msj => console.log(msj));
productManager.deleteProduct(2).then(msj => console.log(msj));