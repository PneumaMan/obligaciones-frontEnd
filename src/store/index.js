import Vue from "vue";
import Vuex from "vuex";
import decode from 'jwt-decode'
import axios from "axios"
import router from '../router/index'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    user: '',
    id:'',
    documentoEmpleado:0,
    empleados:[]  
  }, 
  mutations: {
    obtenerUsuario(state, payload){
      state.token = payload;
      if(payload === ''){
        state.user = ''
      }else{
        state.user = decode(payload);
        state.id = state.user.user.id
        console.log(state.user.user)
        console.log(state.id)
      }
    },

   obtenerempleado(state,documentoEmpleado){
      state.documentoEmpleado = documentoEmpleado
      console.log(state.documentoEmpleado)
    }
  },
  actions: {
    guardarUsuario({commit}, payload){
      localStorage.setItem('token', payload);
      commit('obtenerUsuario', payload)
    },
    cerrarSesion({commit}){
      commit('obtenerUsuario', '');
      localStorage.removeItem('token');
      router.push({path:'/'});
    },
    leerToken({commit}){

      const token = localStorage.getItem('token');
      if(token){
        commit('obtenerUsuario', token);
      }else{
        commit('obtenerUsuario', '');
      }

    }/* ,
    traerempleado({commit}, id){
      axios
        .get(`/empleado/${ state.id}`)
        .then((res) => {
          console.log(res.data[0])
        / commit("empleado", res.data[0])
      })
      .catch((err) => {
        console.log(err);
      });
    } */ 

  },
  getters:{
    logueado: state => !!state.token
  }
});
