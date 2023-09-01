import {promises as fs} from 'fs';
export class CartManager{
    constructor(path){
        this.path = path;
    }
    async getCarts(){
        const carts = JSON.parse(await fs.readFile(this.path,'utf-8'));
        return carts;
    }
    async addCart(cart){
        const carts = JSON.parse(await fs.readFile(this.path,'utf-8'));
        if(!carts.some((cartBD)=> cartBD.id == cart.id)){
            carts.push(cart);
            await fs.writeFile(this.path,JSON.stringify(carts));
            return(`El carrito fue agregado exitosamente`);
            
        }else{
            return('carrito con id repetido')
        }
    }
    async getCartById(id){
        const carts = JSON.parse(await fs.readFile(this.path,'utf-8'));
        let result = carts.find((cartBD)=>cartBD.id == id);
        if (result) {
            return result;
        }else{
            return false;
        }
    }
    async getProductsById(id){
        const carts = JSON.parse(await fs.readFile(this.path,'utf-8'));
        let cart = carts.find((cartBD)=>cartBD.id == id);
        if (cart) {
            return cart.products;
        }else{
            return false;
        }
    }
    async updateCart(id, cart) {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const index = carts.findIndex(cart => cart.id === id);
        if (index != -1) {
            carts[index].products = cart.products;
            await fs.writeFile(this.path, JSON.stringify(carts));
            return('Producto modificado correctamente');
        } else {
            return('Producto no encontrado');
        }
    
    }
}