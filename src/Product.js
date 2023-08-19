import fs from 'fs';
export class Product{
    constructor(title,description,price,thumbnail,code,stock,category,status){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = this.getId();
        this.category=category;
        this.status=status;
    }
    getId() {
        const path = "./src/products.json";
        const data = fs.readFileSync(path, 'utf-8');
        const products = JSON.parse(data);
        const lastProduct = products[products.length - 1];
        const newId = (lastProduct ? lastProduct.id : 0) + 1;
        return newId;
    }
}