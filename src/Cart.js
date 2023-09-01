import fs from 'fs';
export class Cart{
    constructor(){
        this.id = this.getId();
        this.products = [];
    }
    getId(){
        const path = "./src/carts.json";
        const data = fs.readFileSync(path, 'utf-8');
        const carts = JSON.parse(data);
        const lastCart = carts[carts.length - 1];
        const newId = (lastCart ? lastCart.id : 0) + 1;
        return newId;
    }
    existProductById(id){
        let product = this.products.find(productBD => productBD.id==id);
        if(product){
            return true;
        }else{
            return false;
        }
    }
    incrementQuantity(id){
        let index = this.products.findIndex(productBD => productBD.id==id);
        if(index!=-1){
            this.products[index].quantity++;
        }else{
            return false;
        }
    }
    addProduct(prod){
        this.products.push(prod);
    }
}