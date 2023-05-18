//Codigo del FRONT

const socket = io()

socket.on("msg", (data) => {
    console.log(JSON.stringify(data))
})