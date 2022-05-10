<template>
  <div class="container">
    <div class="row">
      <div class="card mx-auto mt-5" >
        <div class="card-header">
          <h5>iniciar sesión</h5>
        </div>
        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Correo Electronico</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="usuario.correo"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Contraseña</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                v-model="usuario.password"
              />
            </div>
              <!-- <div class="form-group">
                <label for="exampleFormControlSelect1">Tipo de usuario</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option>ADMIN</option>
                  <option>USUARIO</option>
                </select>
              </div> -->
            <button type="submit" class="btn btn-primary"  @click.prevent= login()>Iniciar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {  mapMutations,mapActions } from "vuex";
  import router from "../router";
export default {
  name: "HomeView",
   data() {
    return {
      usuario: {correo: '', password: ''},
      mensaje: ''
    }
  },
  components: {},
  methods:{
    ...mapMutations(['obtenerUsuario']), 
    ...mapActions(['guardarUsuario']),
    login(){
      this.axios.post('/signin', this.usuario)
        .then(res => {
          console.log(res.data);
          const token = res.data.token;
          this.guardarUsuario(token)
          console.log('si entro')
          router.push({name:'empleados'}) 
          
        })
        .catch(err => {
          console.log(this.usuario)
          console.log(err);
          console.log('Llorelo')
          this.$swal({
            position: 'toast-top-end',
            icon: 'error',
            title: 'Ocurrio un error',
            text: err,
          });
          
        })
    }
  }

  
};
</script>
