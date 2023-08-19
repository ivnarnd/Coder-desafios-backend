export class Product{
    constructor(title,description,price,thumbnail,code,stock,category){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = Product.incrementId();
        this.category=category;
        this.status=true;
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