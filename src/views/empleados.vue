<template>
    <div class="container">
        <div class="row my-5" >
            <h5>Empleados</h5>
        </div>
        <div class="row">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary my-3" data-toggle="modal" data-target="#exampleModal">
            Insertar datos
            </button>

            <!-- Modal insertar datos empleado-->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal empleado</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                   <form action="">
                       <div class="form-group">
                            <label for="exampleFormControlInput1">Nombre completo </label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" v-model="emp.nombre">
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Documento de identidad </label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" v-model="emp.documentoEmpleado">
                        </div>
                   </form>
                   <button class="btn btn-primary" @click.prevent="agregaruser() "  aria-label="Close">Guardar</button>
                </div>
               
                </div>
            </div>
            </div>
        </div>
        <div class="row">
            <table class="table table-striped">
                <thead>
                    <tr >
                    <th scope="col">Nombre</th>
                    <th scope="col">Documento</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <th>{{empActivar.nombre}}</th>
                        <th>{{empActivar.documentoEmpleado}}</th>

                        <th>
                            <button type="button" class="btn btn-danger mx-2">Eliminar</button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
                    <!-- Modal insertar datos editar empleados-->
            <div class="modal fade" id="exampleModalEditar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal Editar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                     <form action="">
                       <div class="form-group">
                            <label for="exampleFormControlInput1">Nombre completo </label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" v-model="empEditar.nombre">
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Documento de identidad </label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" v-model="empEditar.documentoEmpleado">
                        </div>
                   </form>
                   <button class="btn btn-primary" @click.prevent="EditarUser(empEditar)"  aria-label="Close">Guardar</button>
                </div> 
                </div>
            </div>
            </div>
    </div>
</template>
<script>
export default {
    name:"Empleados",
    data(){
        return{
            empleado:[],
            activar:[],
            emp:{
                nombre:'',
                documentoEmpleado:'',
                idUsuario: ''
            },
            empActivar:{
                id:0,
                nombre:'',
                documentoEmpleado:'',
                idUsuario: ''
            },
            empEditar:{
                id:0,
                nombre:'',
                documentoEmpleado:'',
                idUsuario: ''
            }

        }
    },
    mounted() {
    this.buscarempleado();
  },
    methods: {
        agregaruser() {
            this.emp.idUsuario = this.$store.state.id
            console.log(this.$store.state.id)
        this.axios
            .post("/empleado-nuevo", this.emp)
            .then((res) => {
            console.log(res.data);
            console.log(this.emp);
            
            this.empleado.push(res.data);
            this.$swal({
                        position: 'toast-top-end',
                            icon: 'success',
                            title: 'Guardado con exito!',
                        });
            })
            .catch((err) => {
                console.log(this.emp);
                console.log(err);
                this.$swal({
                        position: 'toast-top-end',
                            icon: 'error',
                            title: 'OCURIO UN ERROR!',
                            text: err,
                        });
            
            }); 
        },
        buscarempleado(){
            const id = this.$store.state.id
            this.axios.get(`/empleado/${id}`)
            .then((res) => {
                console.log(res.data[0]);
                this.activar = res.data[0]
                console.log(this.activar);
                this.empActivar.id = res.data[0][0].id
                this.empActivar.nombre = res.data[0][0].nombre
                this.empActivar.documentoEmpleado= res.data[0][0].documentoEmpleado
                this.empActivar.idUsuario= res.data[0][0].idUsuario
                console.log(this.empActivar)
            })
            .catch((err) => {
                console.log(err);
                this.$swal({
                        position: 'toast-top-end',
                            icon: 'error',
                            title: 'ocurrio un error!',
                            text: err,
                        });
            });
        },
        activarEdicion(){
            console.log(this.empActivar.nombre)
            console.log(this.activar)
            this.empEditar.id = this.activar[0].id 
            this.empEditar.nombre = this.activar[0].nombre
            this.empEditar.documentoEmpleado= this.activar[0].documentoEmpleado
            this.empEditar.idUsuario= this.activar[0].idUsuario

        }
    },
};

</script>