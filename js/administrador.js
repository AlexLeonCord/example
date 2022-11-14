const url = "http://localhost:8080/administrador/"
const url1 = "http://localhost:8080/administrador/list"

const contenedor = document.querySelector('tbody')

let resultados = ''

const modalAdministrador = new
    bootstrap.Modal(document.getElementById('modalAdministrador'))
const formAdministrador = document.querySelector('form')
const cedulaAdministrador = document.getElementById('cedula_admin')
const nombreAdministrador = document.getElementById('nombre_admin')
const telefonoAdministrador = document.getElementById('telefono_admin')
const correoAdministrador = document.getElementById('correo_admin')
const btntitle = document.getElementById('btntitle')

 


let opcion = ''

btnCrear.addEventListener('click', () => {
    cedulaAdministrador.value = ''
    nombreAdministrador.value = ''
    telefonoAdministrador.value = ''
    correoAdministrador.value = ''
    cedulaAdministrador.disabled = false
    modalAdministrador.show()
    opcion = 'crear'
})

btnCerrar.addEventListener('click', () => {

    modalAdministrador.hide()

})

btnGoogle.addEventListener('click', () => {

    alert("ggggggggggggg")

})


btnClose.addEventListener('click', () => {

    modalAdministrador.hide()

})


const mostrar = (Administradores) => {
    Administradores.forEach(Administrador => {
        resultados += `<tr>
<td >${Administrador.cedula_admin}</td>
<td >${Administrador.nombre_admin}</td>
<td >${Administrador.telefono_admin}</td>
<td >${Administrador.correo_admin}</td>
<td class="text-center" width="20%"><a
class="btnEditar btn btn-primary" style="width: 100px;">Editar</a><a class="btnBorrar btn btn-danger" style="width: 100px;">Borrar</a></td>
</tr>`
    })
    contenedor.innerHTML = resultados
}

fetch(url1)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector))
            handler(e)
    })
}

on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const cedula_admin = fila.firstElementChild.innerHTML
    console.log(cedula_admin)
    alertify.confirm("Desea eliminar el Administrador " + cedula_admin,
        function () {
            fetch(url + cedula_admin, {
                method: 'DELETE'
            })
                .then(() => location.reload())
        },
        function () {
            alertify.error('Cancel')
        });
})



let idForm = 0
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const nombre = fila.children[1].innerHTML
    const telefono = fila.children[2].innerHTML
    const email = fila.children[3].innerHTML
    cedulaAdministrador.value = idForm
    cedulaAdministrador.disabled = true
    nombreAdministrador.value = nombre
    telefonoAdministrador.value = telefono
    correoAdministrador.value = email

    opcion = 'editar'
    modalAdministrador.show()
})

formAdministrador.addEventListener('submit', (e) => {
    e.preventDefault()
    if (opcion == 'crear') {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cedula_admin: cedulaAdministrador.value,
                nombre_admin: nombreAdministrador.value,
                telefono_admin: telefonoAdministrador.value,
                correo_admin: correoAdministrador.value
            })
        })
            .then(response => response.json())
            .then(data => {
                const nuevoAdministrador = []
                nuevoAdministrador.push(data)
                mostrar(nuevoAdministrador)
            })
    }
    if (opcion == 'editar') {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cedula_admin: idForm,
                nombre_admin: nombreAdministrador.value,
                telefono_admin: telefonoAdministrador.value,
                correo_admin: correoAdministrador.value
            })
        })
            .then(response => location.reload())
    }
    modalAdministrador.hide()
})


