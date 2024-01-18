const fs = require('fs');

class ProductManager {
    static id = 0; 
    constructor(path){
        this.path = path; 
    }

    async addProduct(product){

        let content = await fs.promises.readFile(this.path, 'utf-8');
        let products = JSON.parse(content);

        product.id = ++ProductManager.id; 
        products.push(product);

        await fs.promises.writeFile(this.path, JSON.stringify(products,null, '\t'));
    }

    async getProducts(){

        let content = await fs.promises.readFile(this.path, 'utf-8');
        let products = JSON.parse(content);

        return products;
    }

    async deleteProduct(id){

        let content = await fs.promises.readFile(this.path, 'utf-8');
        let products = JSON.parse(content);

        products = products.filter(p=>p.id != id)

        console.log("Se borró el producto con id " + id)
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
}

module.exports = ProductManager;