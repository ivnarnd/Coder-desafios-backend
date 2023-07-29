class Product{
    constructor(title,description,price,thumbnail,code,stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
class ProductManager{
    constructor(){
        this.products = [];
        this.id = 0;
    }
    addProduct(product){
        if(!this.products.some((productBD)=> productBD.code == product.code)){
            if(!Object.values(product).some((prop)=>prop == undefined)){
                product.id = this.id++;
                this.products.push(product);
            }
            else{
                console.log('Producto con propiedad faltante');
            }
        }else{
            console.log('Producto con codigo repetido')
        }
        

    }
    getProducts(){
       return this.products;
    }
    getProductById(id){
        let search = this.products.find((productBD)=>productBD.id == id);
        if (search) {
            return search;
        }else{
            return 'Not Found';
        }
    }
}

let productManager = new ProductManager();
console.log('Productos: ',productManager.getProducts());
productManager.addProduct(new Product("Producto Prueba","Este es un producto prueba",200,"sin imagen","abc123",25));
console.log('Productos: ',productManager.getProducts());
productManager.addProduct(new Product("Producto Prueba","Este es un producto prueba",200,"sin imagen","abc123",25));
console.log(productManager.getProductById(0));
console.log(productManager.getProductById(1));