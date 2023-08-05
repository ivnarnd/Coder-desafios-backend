import { Console } from 'console';
import {promises as fs} from 'fs';
class Product{
    constructor(title,description,price,thumbnail,code,stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = Product.incrementId();
    }
    static incrementId(){
        if(this.idIncrement){
            this.idIncrement++;
        }else{
            this.idIncrement=1;
        }
        return this.idIncrement;
    }
}
class ProductManager{
    constructor(path){
        this.path = path;
    }
    async addProduct(product){
        const products = JSON.parse(await fs.readFile(this.path,'utf-8'));
        
        if(!products.some((productBD)=> productBD.code == product.code)){
            if(!Object.values(product).some((prop)=>prop == undefined)){
                products.push(product);
                await fs.writeFile(this.path,JSON.stringify(products));
                console.log('El producto fue agregado exitosamente');
            }
            else{
                console.log('Producto con propiedad faltante');
            }
        }else{
            console.log('Producto con codigo repetido')
        }
    }

    async getProducts(){
       const products = JSON.parse(await fs.readFile(this.path,'utf-8'));
       return products;
    }
    async getProductById(id){
        const products = JSON.parse(await fs.readFile(this.path,'utf-8'));
        let result = products.find((productBD)=>productBD.id == id);
        if (result) {
            return result;
        }else{
            return 'Not Found';
        }
    }
    async updateProduct(id, product) {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const index = products.findIndex(prod => prod.id === id)
        if (index != -1) {
            products[index].title = product.title;
            products[index].description = product.description;
            products[index].price = product.price;
            products[index].thumbnail = product.thumbnail;
            products[index].code = product.code;
            products[index].stock = product.stock;
            await fs.writeFile(this.path, JSON.stringify(products));
            return('Producto modificado correctamente')
        } else {
            return('Producto no encontrado');
        }
    
    }
    async deleteProduct(id){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const product = products.find(prod => prod.id === id)
    
        if (product) {
            await fs.writeFile(this.path, JSON.stringify(products.filter(prod => prod.id != id)));
            return('Producto eliminado satisfactoriamente');
        } else {
            return("Producto no encontrado");
        }
    
    }
}

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