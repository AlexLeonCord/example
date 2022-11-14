const lista=document.createElement("ul")

 document.body.appendChild(lista)
 let paises=["colombia","peru","ecuador"]

 datos=""
 paises.forEach((pais)=>{
    lista.innerHTML+=`<li>${pais}</li>`
 })

 document.addEventListener("click",(e)=>{

alert("hola " +e.type )


 })

 fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => console.log(json))