import Vue from "vue";
import Vuex from "vuex";
import decode from 'jwt-decode'
import router from '../router/index'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    user: '',
    id:''    
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

    }

  },
  getters:{
    logueado: state => !!state.token
  }
});
