const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
document.getElementById("cart-total").innerHTML = `${carrito.length}  - $${total}`;

const productos = []

Swal.fire({
    title: 'Que edad tenes?',
    icon: 'question',
    input: 'range',
    inputLabel: 'Tu edad',
    inputAttributes: {
        min: 18,
        max: 120,
        step: 1
    },
    inputValue: 25
})

const buscarUnProducto = async () => {
    const response = await fetch ('productos.json');
    const data = await response.json();


    let acumulador = ``;
    data.forEach((producto) => {
        const idButton = `add-cart${producto.id}`

        acumulador += `<div class="card">
        <h5> ${producto.nombre} </h5>
        <img src="${producto.img}">
        <div class="precio">
            <p> $${producto.precio} </p>
        </div>
        <a class= "boton botonCompra" id="${idButton}"> Agregar al Carrito </a>
        <a class="boton" onclick="verProducto(${producto.id})"> Ver producto </a>
    </div>`;
    })
        const contenedorDeCards = document.getElementById('seccion-card');
        contenedorDeCards.innerHTML = acumulador;

        let botonesDeCompra = Array.from(document.querySelectorAll(".botonCompra"));

        botonesDeCompra.map((producto) => {
            producto.addEventListener("click", () => {
                    const getProduct = buscarProducto(producto.id)
                    carrito.push(getProduct);
                    Swal.fire(
                        'Gracias por su compra!',
                        'El producto fue sumado al carrito',
                        'success'
                    )
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
                    document.getElementById("cart-total").innerHTML = `${carrito.length} - $${total}`;
                    console.log(carrito);
                })
        })

        function buscarProducto(id){
            const producto = data.find(element => "add-cart"+element.id === id)
            return producto;
        }

}

buscarUnProducto();

function generarCardsCarrito() {
    carrito.forEach((producto) => {
        document.getElementById("cards-modal").innerHTML += `<div>
            <p>
            - ${producto.nombre}
            - <img src="${producto.img}" style="width:30px">
            - $${producto.precio}
            - <button>Quitar Producto</button>
            </div>`
    })
}
