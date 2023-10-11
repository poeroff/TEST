class ProductItem {
    constructor(title, image, desc, price) {
        this.title = title;
        this.imageurl = image;
        this.description = desc;
        this.price = price;
    }
}

class products {
    product = [
        new ProductItem("A Pillow", "https://th.bing.com/th/id/OIP.Viwu79Fn0e0gDYVn1k2p4wHaEK?w=307&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7", "A soft pillow", 19.99,),
        new ProductItem("A carpet", "https://th.bing.com/th/id/OIP.eZNgPvYhi7oe0vCKAE0mUAHaFv?w=223&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7", "A soft carpet", 14.99)


    ]
    constructor() {

    }
    render() {

        const prodList = document.createElement("ul");
        prodList.className = "product-list"
        for (const prod of this.product) {
            const productList = new ProductList(prod);
            const prodEl = productList.render();
            prodList.append(prodEl);
        }
        return prodList;

    }
}

class ProductList {
    constructor(product) {
        this.product = product;
    }

    addTocart() {
     
        App.addproductTocart(this.product);


    }


    render() {
        const prodEl = document.createElement("li");
        prodEl.className = "product-item"
        prodEl.innerHTML = `
        <div>
            <img src = "${this.product.imageurl}" alt ="${this.product.title}">
            <div class="product-item__content">
                <h2>${this.product.title}</h2>
                <h3>\$${this.product.price} </h3>
                <p>${this.product.description}</p>
                <button> Add to cart </button>
            

            </div>

        </div>

        `;
        const addcartButton = prodEl.querySelector("button");
        addcartButton.addEventListener("click", this.addTocart.bind(this))
        return prodEl;
    }
}



class Shoppingcart {
    items = [];
    set cartItems(value){
        this.items = value;
        this.totalOutput.innerHTML = `<h2> Total : \$${this.totalamount} </h2>`;

    }
    get totalamount() {
        const sum = this.items.reduce((prevValue,curItem) => {
            return prevValue + curItem.price
        } , 0 )
        return sum;

    }
    addItem(product) {
        
        const updatedItems = [...this.items]
        updatedItems.push(product)
        this.cartItems = updatedItems;
    }

    render() {
        const cartEl = document.createElement("section")
        cartEl.innerHTML = `
        <h2> Total : \$${0} </h2>
        <button> ORDER NOW! </button>

        `;
        cartEl.className = "cart";
        this.totalOutput = cartEl.querySelector("h2");
        return cartEl
    }

}

class Shop {
    render() {
        const rederHook = document.getElementById("app")
        this.cart = new Shoppingcart();
        console.log(this.cart)
        const cartEl =this.cart.render()
        const product = new products();
        const prodListEl = product.render()

        rederHook.append(cartEl);
        rederHook.append(prodListEl);
    }
}

class App {
    static init() {
        const shop = new Shop();
        shop.render()
        //일반 프론트 작업
        this.cart = shop.cart;
        console.log(shop.cart)
    }
    static addproductTocart(product){
        this.cart.addItem(product);
    }
}
App.init()






