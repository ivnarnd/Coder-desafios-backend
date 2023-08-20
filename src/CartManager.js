import {promises as fs} from 'fs';
export class CartManager{
    constructor(path){
        this.path = path;
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
    async getProductsById(id){
        const carts = JSON.parse(await fs.readFile(this.path,'utf-8'));
        let cart = carts.find((cartBD)=>cartBD.id == id);
        if (cart) {
            return cart.products;
        }else{
            return false;
        }
    }
}