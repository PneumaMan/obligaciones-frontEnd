<template>
  <div id="app">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <a class="navbar-brand" href="/"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ path: '/'}" v-if="!logueado">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ path: '/empleados'}" v-if="logueado">Empleados</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ path: '/obligaciones'}" v-if="logueado">Obligaciones</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-if="logueado" @click="cerrarSesion" >Cerrar sesión</a>
            </li>
          </ul>
        </div>
      </nav>
    <router-view />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "app",
  methods: {
    ...mapActions(["cerrarSesion", "leerToken"]),
  },
  computed: {
    ...mapGetters(["logueado", "usuario"]),
  },
  created() {
    this.leerToken();
  },
};
</script>

<style>

.navbar{
  background: #605e5e;
}

.btn-warning{
  background: #965204!important;
  /* color: #965204 !important; */
}
</style>
