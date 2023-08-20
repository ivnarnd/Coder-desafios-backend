import fs from 'fs';
export class Cart{
    constructor(products){
        this.id = this.getId();
        this.products = products;
    }
    getId(){
        const path = "./src/carts.json";
        const data = fs.readFileSync(path, 'utf-8');
        const carts = JSON.parse(data);
        const lastCart = carts[carts.length - 1];
        const newId = (lastCart ? lastCart.id : 0) + 1;
        return newId;
    }
}