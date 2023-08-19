import {promises as fs} from 'fs';
export class ProductManager{
    constructor(path){
        this.path = path;
    }
    async addProduct(product){
        const products = JSON.parse(await fs.readFile(this.path,'utf-8'));
        console.log (product);
        if(!products.some((productBD)=> productBD.code == product.code)){
            if(!Object.values(product).some((prop)=>prop == undefined)){
                products.push(product);
                await fs.writeFile(this.path,JSON.stringify(products));
                return(`El producto ${product.title} fue agregado exitosamente`);
            }
            else{
                return('Producto con propiedad faltante');
            }
        }else{
            return('Producto con codigo repetido')
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
            return false;
        }
    }
    async getProductByCode(code){
        const products = JSON.parse(await fs.readFile(this.path,'utf-8'));
        let result = products.find((productBD)=>productBD.code == code);
        if (result) {
            return result;
        }else{
            return false;
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