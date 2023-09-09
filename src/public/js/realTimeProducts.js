const socket = io();
const formProduct = document.getElementById("formId");
const btnViewProds = document.getElementById("btn-viewProducts");
const containerProds = document.getElementById("products-container")
formProduct.addEventListener('submit',(e)=>{
    e.preventDefault();
    let form = new FormData(e.target);
    const prod = Object.fromEntries(form);
    socket.emit('AddProduct',prod);
    e.target.reset();
});
btnViewProds.addEventListener('click',()=>{
    socket.emit('Products');
    
    socket.on('ProdsResp',(data)=>{
        containerProds.innerHTML='';
        data.forEach(dat =>{
            let prod = document.createElement("li");
            prod.innerHTML = `${dat.title}`;
            containerProds.appendChild(prod);
        })
    });
});