import express from "express"
import { productsRouter } from "./routes/products.router.js"
import { cartsRouter } from "./routes/carts.router.js"
import { handlebarsRouter } from "./routes/handlebars.router.js"
import { __dirname } from "./utils.js"
import path from "path"
import handlebars from "express-handlebars"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"));

//Endponits
app.use("/products", productsRouter)
app.use("/carts", cartsRouter)
app.use("/realtimeproducts", handlebarsRouter)


app.listen(PORT, () => {
    console.log(`APP corriendo en el http://localhost:${PORT}`)
})

app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        msg: "Ruta no encontrada",
        data: {}
    })
})