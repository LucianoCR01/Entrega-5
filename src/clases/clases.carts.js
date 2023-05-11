import fs from "fs"
import crypto from "crypto"
import { Console } from "console"

class CartsManager {
    constructor(path) {
        this.path = path
        this.carts = []
        const cartsString = fs.readFileSync(this.path, "utf-8")
        const carts = JSON.parse(cartsString)
        this.carts = carts
    }

    newCart() {
        let id = crypto.randomUUID()
        const cart = {
            idCarrito: id,
            productos: []
        }
        this.carts.push(
            cart
        );
        const cartsString = JSON.stringify(this.carts, null, 2)
        fs.writeFileSync(this.path, cartsString)
    }

    getCart(idCart) {
        const cartSearch = this.carts.find(ca => ca.idCarrito == idCart)
        if (cartSearch) {
            return cartSearch
        }
        else {
            return "No se encontro el carrito con ese ID"
        }
    }

    agregarProductos(idCart, idProduct) {
        const cartSearch = this.carts.find(ca => ca.idCarrito == idCart)
        const productsString = fs.readFileSync("./productos.json", "utf-8")
        const products = JSON.parse(productsString)
        const prodSearch = products.find(pr => pr.id == idProduct)
        if (cartSearch && prodSearch) {
            let prodAcortado = cartSearch.productos
            const cartPush = { "idCarrito": idCart, "productos": prodAcortado }
            if (prodAcortado.idProduct == prodSearch) {
                const nuevaCantidad = { "quantity": prodAcortado.quantity + 1 }
                const nueva = prodAcortado.splice(1, 1, nuevaCantidad)
                prodAcortado.push(nuevaCantidad)
            }

            console.log(prodAcortado)
        } else {
            console.log("Verifique que los ID sean correctos")
        }
    }

}
export const carts = new CartsManager("./carts.json")