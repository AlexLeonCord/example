const url = "http://localhost:8080/conjunto/"
const url1 = "http://localhost:8080/conjunto/list"
const urlAdmin = "http://localhost:8080/administrador/list"
const contenedor = document.querySelector('tbody')

const select = document.querySelector('#cedula_admin')

let resultados = ''
let resultadosAdmin = ''

const modalConjunto = new
    bootstrap.Modal(document.getElementById('modalConjunto'))
const formConjunto = document.querySelector('form')
const idConjunto = document.getElementById('id_conjunto')
const nombreConjunto = document.getElementById('nombre_conjunto')
const direccionConjunto = document.getElementById('dir_conjunto')
const cedulaAdministradorx = document.getElementById('cedula_admin')

let opcion = ''

btnCrear.addEventListener('click', () => {
    idConjunto.value = ''
    idConjunto.disabled = false
    nombreConjunto.value = ''
    direccionConjunto.value = ''
    resultadosAdmin = ''

    fetch(urlAdmin)
        .then(response => response.json())
        .then(data => mostrarAdmin(data))
        .catch(error => console.log(error))

    cedulaAdministradorx.disabled = false
    modalConjunto.show()
    opcion = 'crear'
})

btnCerrar.addEventListener('click', () => {

    modalConjunto.hide()

})


btnClose.addEventListener('click', () => {

    modalConjunto.hide()

})

const mostrarAdmin = (Administradores) => {
    Administradores.forEach(admin => {
        resultadosAdmin += `<option id="${admin.cedula_admin}" value="${admin.cedula_admin}">${admin.nombre_admin}</option>`
    })
    select.innerHTML = resultadosAdmin
}



const mostrar = (Conjuntos) => {
    Conjuntos.forEach(conjunto => {
        resultados += `<tr>
<td >${conjunto.id_conjunto}</td>
<td >${conjunto.nombre_conjunto}</td>
<td >${conjunto.dir_conjunto}</td>
<td >${conjunto.administrador.nombre_admin}</td>
<td class="text-center" width="20%" ><a
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
    const id_conjunto = fila.firstElementChild.innerHTML
    console.log(id_conjunto)
    alertify.confirm("Desea eliminar el conjunto" + id_conjunto,
        function () {
            fetch(url + id_conjunto, {
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
    const direccion = fila.children[2].innerHTML
    const cedula_admin = fila.children[3].innerHTML
    idConjunto.value = idForm
    idConjunto.disabled = true
    nombreConjunto.value = nombre
    direccionConjunto.value = direccion

    resultadosAdmin = ''

    fetch(urlAdmin)
        .then(response => response.json())
        .then(data => mostrarAdmin(data))
        .catch(error => console.log(error))

    cedulaAdministradorx.selectedIndex.value = 'editar';
    opcion = 'editar'
    modalConjunto.show()
})

formConjunto.addEventListener('submit', (e) => {
    e.preventDefault()

    var valueOption = cedulaAdministradorx.options[cedulaAdministradorx.selectedIndex].value;

    if (opcion == 'crear') {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                id_conjunto: idConjunto.value,
                nombre_conjunto: nombreConjunto.value,
                dir_conjunto: direccionConjunto.value,
                administrador: { cedula_admin: valueOption }

            })
        })
            .then(response => response.json())
            .then(data => {
                const nuevoConjunto = []
                nuevoConjunto.push(data)
                mostrar(nuevoConjunto)
            })
    }
    if (opcion == 'editar') {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_conjunto: idForm,
                nombre_conjunto: nombreConjunto.value,
                dir_conjunto: direccionConjunto.value,
                administrador: { cedula_admin: valueOption }
            })
        })
            .then(response => location.reload())
    }
    modalConjunto.hide()
})


