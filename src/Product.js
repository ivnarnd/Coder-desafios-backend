import {promises as fs} from 'fs';
export class Product{
    constructor(title,description,price,thumbnail,code,stock,category,status){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = Product.incrementId();
        this.category=category;
        this.status=status;
    }
    static async incrementId(){
        const path = "./src/products.json"
        const products = JSON.parse(await fs.readFile(path,'utf-8'));
        if(products){
            this.idIncrement = products[products.length-1].id + 1;
        }else{
            this.idIncrement = 1;
        }
        return this.idIncrement;
    }
}