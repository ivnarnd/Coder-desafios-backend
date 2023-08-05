import { log } from 'console';
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
        this.products = [];
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
}

let productManager = new ProductManager('./products.json');
console.log('Productos: ',productManager.getProducts());
productManager.addProduct(new Product("Producto Prueba","Este es un producto prueba",200,"sin imagen","abc123",25));
console.log('Productos: ',productManager.getProducts());
productManager.addProduct(new Product("Producto Prueba","Este es un producto prueba",200,"sin imagen","abc123",25));
console.log(productManager.getProductById(0));
console.log(productManager.getProductById(1));