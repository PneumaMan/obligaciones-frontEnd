<template>
  <div class="container">
    <div class="row my-5">
      <h5>Empleados</h5>
    </div>
    <div class="row">
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-warning text-white my-3"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Insertar datos
      </button>

      <!-- Modal insertar datos empleado-->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Insertar datos empleado
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form action="">
                <div class="form-group">
                  <label for="exampleFormControlInput1">Nombre completo </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="emp.nombre"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1"
                    >Documento de identidad
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="emp.documentoEmpleado"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1"
                    >Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="emp.fechaNacimiento"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Genero</label>
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    v-model="emp.genero"
                  >
                    <option>Maculino</option>
                    <option>Femenino</option>
                    <option>Prefiero no responder</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlSelect1"
                    >Nivel de estudios</label
                  >
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    v-model="emp.nivelEstudio"
                  >
                    <option>Primaria incompleta</option>
                    <option>Secundaria incompleta</option>
                    <option>Bachiller</option>
                    <option>Pregrado</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1"
                    >Rol que desempeña en la empresa
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="emp.rolEmpresa"
                  />
                </div>
              </form>
              <button
                class="btn btn-warning text-white"
                @click.prevent="agregaruser()"
                data-dismiss="modal"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Documento</th>
            <th scope="col">Fecha de nacimiento</th>
            <th scope="col">Genero</th>
            <th scope="col">Nivel de estudio</th>
            <th scope="col">Rol en la empresa</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ empActivar.nombre }}</td>
            <td>{{documentoEmpleado}}</td>
            <td>{{ empActivar.fechaNacimiento }}</td>
            <td>{{ empActivar.genero }}</td>
            <td>{{ empActivar.nivelEstudio }}</td>
            <td>{{ empActivar.rolEmpresa }}</td>

            <th>
              <button
                type="button"
                class="btn btn-danger mx-2"
                @click.prevent="eliminarEmpleado(empActivar.id)"
              >
                Eliminar
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal insertar datos editar empleados-->
    <div
      class="modal fade"
      id="exampleModalEditar"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action="">
              <div class="form-group">
                <label for="exampleFormControlInput1">Nombre completo </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  v-model="empEditar.nombre"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1"
                  >Documento de identidad
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  v-model="empEditar.documentoEmpleado"
                />
              </div>
            </form>
            <button
              class="btn btn-warning text-white"
              @click.prevent="EditarUser(empEditar)"
              aria-label="Close"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "Empleados",
  data() {
    return {
      empleado: [],
      activar: [],
      emp: {
        nombre: "",
        documentoEmpleado: "",
        idUsuario: "",
        fechaNacimiento: "",
        genero: "",
        nivelEstudio: "",
        rolEmpresa: "",
      },
      empActivar: {
        id: 0,
        nombre: "",
        documentoEmpleado: "",
        idUsuario: "",
        fechaNacimiento: "",
        genero: "",
        nivelEstudio: "",
        rolEmpresa: "",
      },
      empEditar: {
        id: 0,
        nombre: "",
        documentoEmpleado: "",
        idUsuario: "",
        fechaNacimiento: "",
        genero: "",
        nivelEstudio: "",
        rolEmpresa: "",
      },
      documentoEmpleado:0
    };
  },
  mounted() {
    this.buscarempleado();
  },
  methods: {
    ...mapMutations(["obtenerempleado"]),
    eliminarEmpleado(index) {
      console.log(index);
      this.axios
        .delete(`/eliminarempleado/${index}`)
        .then((res) => {
          this.empleado.splice(index, 1);
          this.$swal({
            position: "top-end",
            icon: "success",
            title: "Se elimino con éxito !",
            text: err,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    agregaruser() {
      this.emp.idUsuario = this.$store.state.id;
      console.log(this.$store.state.id);
      this.axios
        .post("/empleado-nuevo", this.emp)
        .then((res) => {
          console.log(res.data);
          console.log(this.emp);

          this.empleado.push(res.data);
          this.$swal({
            position: "toast-top-end",
            icon: "success",
            title: "Guardado con éxito!",
          });
        })
        .catch((err) => {
          console.log(this.emp);
          console.log(err);
          this.$swal({
            position: "toast-top-end",
            icon: "error",
            title: "OCURIO UN ERROR!",
            text: "solo puede insertar los datos un empleado",
          });
        });
    },
    buscarempleado() {
      const id = this.$store.state.id;
      this.axios
        .get(`/empleado/${id}`)
        .then((res) => {
          console.log(res.data[0]);
          this.activar = res.data[0];
          console.log(this.activar);
          console.log(this.empActivar);
          this.empActivar.id = res.data[0][0].id;
          this.empActivar.nombre = res.data[0][0].nombre;
          this.documentoEmpleado = res.data[0][0].documentoEmpleado;
          this.empActivar.idUsuario = res.data[0][0].idUsuario;
          this.empActivar.fechaNacimiento = res.data[0][0].fechaNacimiento;
          this.empActivar.genero = res.data[0][0].genero;
          this.empActivar.nivelEstudio = res.data[0][0].nivelEstudio;
          this.empActivar.rolEmpresa = res.data[0][0].rolEmpresa;
         this.$store.state.documentoEmpleado= this.documentoEmpleado
         console.log( this.$store.state.documentoEmpleado)
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            position: "toast-top-end",
            icon: "error",
            title: "ocurrio un error!",
            text: "solo se puede registrar un correo",
          });
        });
    },
    activarEdicion() {
      console.log(this.empActivar.nombre);
      console.log(this.activar);
      this.empEditar.id = this.activar[0].id;
      this.empEditar.nombre = this.activar[0].nombre;
      this.empEditar.documentoEmpleado = this.activar[0].documentoEmpleado;
      this.empEditar.idUsuario = this.activar[0].idUsuario;
    },
  },
};
</script>