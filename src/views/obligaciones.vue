<template>
  <div class="container">
    <!-- PLANIFICAR MES    -->
    <div class="row">
      <h4 class="mx-auto my-5">Planificar mes</h4>
    </div>
    <div class="row">
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-warning text-white"
        data-toggle="modal"
        data-target="#exampleModalPlanificar"
      >
        Planifica tu mes
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModalPlanificar"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Planificar Mes</h5>
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
                  <label for="">Obligacion</label>
                  <select
                    class="form-control"
                    id="exampleFormControlSelect2"
                    v-model="plan.idObligacion" @click.prevent="cargarValor(plan.idObligacion)">
                    <option v-for="(item, index) in obligaciones" :key="index" :value="item.id" >
                      {{ item.nombreObligacion }}
                    </option>
                  </select>
                    <small  class="form-text text-muted"> el valor de la obligacion es: {{ valor }}</small>
                </div>
                <div class="form-group">
                  <label for="">Cubrir obligacion</label>
                  <select
                    class="form-control"
                    id="exampleFormControlSelect2"
                    v-model="plan.CubrirObligacion"
                    @click.prevent="PagoParcial(plan.idObligacion)"
                  >
                    <option>Total cuota</option>
                    <option>Parcial</option>
                    <option>Pago Completo</option>
                  </select>
                  <small  class="form-text text-muted" v-if="saldo == true"> Su saldo restante es de: {{ saldoRestante }}</small>
                </div>
                <div class="form-group" v-if="parcial == true">
                  <label for="">Valor</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="plan.valorObligacion"
                  />
                </div>
                <div class="form-group" v-if="parcial == true">
                  <label for="">Porcentaje</label>
                  <!-- ant slider step -->
                  <vue-slider v-model="plan.PorcentajeObligacion" />
                </div>
                <div class="form-group">
                  <label for="fecha">Mes</label>
                  <input
                    type="month"
                    name="fecha"
                    id="fecha"
                    class="form-control"
                    v-model="plan.mes"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                class="btn btn-warning text-white"
                data-dismiss="modal"
                @click="crearPlanMes()"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-body">
          <h4>Consultar mes planificado</h4>
          <div class="form-group">
            <input
              type="month"
              name="fecha"
              id="fecha"
              class="form-control"
              v-model="mesPlan"
            />
          </div>
          <button
            class="btn btn-warning text-white mx-auto my-3 btn-bloc"
            @click.prevent="consultarPlanMes()"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <table class="table table-striped my-5" v-if="consultar == true">
        <thead>
          <tr>
            <th scope="col"><i class="bi bi-card-checklist"></i></th>
            <th scope="col">Obligacion</th>
            <th scope="col">Cubrir obligacion</th>
            <th scope="col">Porcentaje</th>
            <th scope="col">Mes</th>
            <th scope="col">Valor Total</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in planificarMes" :key="item.id">
            <th>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  @click.prevent="crearcumplimiento(item.id)"
                />
              </div>
            </th>
            <th>{{ item.nombreObligacion }}</th>
            <td>{{ item.CubrirObligacion }}</td>
            <td>{{ item.PorcentajeObligacion }}</td>
            <td>{{ item.mes }}</td>
            <td>{{ item.valorObligacion }}</td>
            <td>
              <button
                type="button"
                class="btn btn-danger mx-2"
                @click.prevent="eliminarDeseo(index)"
              >
                Eliminar
              </button>
              <button
                type="button"
                class="btn btn-warning"
                data-toggle="modal"
                data-target="#exampleModaldeseoEditar"
                @click.prevent="ActivarDeseos(index)"
              >
                Editar
              </button>
            </td>
          </tr>
          <tr>
            <td colspan="4" class="mx-auto" style="color: #965204">
              <strong> Numero de obligaciones cumplidas:</strong>
            </td>
            <td colspan="3">
              <strong>{{ contador }}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- OBLIGACIONES -->
    <hr />
    <!-- card dos pestañas -->
    <div class="row">
      <div class="col-12 my-5">
        <div class="card">
          <div class="card-header">
            <ul
              class="nav nav-tabs card-header-tabs"
              id="bologna-list"
              role="tablist"
            >
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#description"
                  role="tab"
                  aria-controls="description"
                  aria-selected="true"
                  :class="{ active: isActive1 }"
                  @click.prevent="change()"
                  style="color: #965204"><strong>Obligaciones</strong></a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#history"
                  role="tab"
                  aria-controls="history"
                  aria-selected="false"
                  :class="{ active: isActive2 }"
                  @click.prevent="change()"
                  style="color: #965204"><strong>Deseos</strong></a
                >
              </li>
            </ul>
          </div>
          <div class="card-body">
            <div class="tab-content mt-3">
              <div
                class="tab-pane"
                id="description"
                role="tabpanel"
                :class="{ active: isActive1 }"
              >
                <div class="row">
                  <!-- Button trigger modal -->
                  <button
                    type="button"
                    class="btn btn-warning text-white my-3 mx-5"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    Crear obligacion
                  </button>
                  <!-- Modal -->
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
                            Crear obligacion
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
                          <form>
                            <div class="form-group">
                              <label for="exampleFormControlInput1"
                                >Nombre de la obligacion
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="exampleFormControlInput1"
                                v-model="oblig.nombreObligacion"
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleFormControlSelect2"
                                >Tipo de la obligacion</label
                              >
                              <select
                                class="form-control"
                                id="exampleFormControlSelect2"
                                v-model="oblig.idTipoObligacion"
                              >
                                <option v-for="(item, index) in tipoObligaciones" :key="index" :value="item.id" >{{item.tipo}}</option>
                                
                              </select>
                            </div>
                            <div class="row">
                            <div class="form-group col-12 col-md-6">
                              <label for="">Valor total de la obligacion </label>
                              <input
                                type="number"
                                class="form-control"
                                placeholder=""
                                v-model="oblig.valor"
                              />
                            </div>
                            <div class="form-group  col-12 col-md-6">
                              <label for="">Valor de la cuota </label>
                              <input
                                type="number"
                                class="form-control"
                                placeholder=""
                                v-model="oblig.valorCuota"
                              />
                            </div>
                            </div>
                            <div class="form-group">
                              <label for="">Cantidad de cuotas </label>
                              <input
                                type="number"
                                class="form-control"
                                placeholder=""
                                v-model="oblig.cuota"
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleFormControlSelect2"
                                >Pagos de la obligacion</label
                              >
                              <select
                                class="form-control"
                                id="exampleFormControlSelect2"
                                v-model="oblig.pagos"
                              >
                                <option>Mensual</option>
                                <option>Quincenal</option>
                                <option>Total</option>
                              </select>
                            </div>
                            <div class="form-group">
                              <label for="exampleFormControlSelect2"
                                >Prioridad de la obligacion</label
                              >
                              <select
                                class="form-control"
                                id="exampleFormControlSelect2"
                                v-model="oblig.prioridad"
                              >
                                <option value="1">1. Urgente</option>
                                <option value="3">2. Obligatorio</option>
                                <option value="3">3. Opcional</option>
                              </select>
                            </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-warning text-white"
                            data-dismiss="modal"
                            @click="crearobligacion()"
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <table class="table table-striped ">
                    <thead>
                      <tr>
                        <th scope="col">Obligacion</th>
                        <th scope="col">Valor Total</th>
                        <!-- <th scope="col">valor cuota</th> -->
                        <th scope="col">Pagos</th>
                        <th scope="col">Prioridad</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in obligaciones" :key="item.id">
                        <th>{{ item.nombreObligacion }}</th>
                        <td>{{ item.valor }}</td>
                        <!-- <td>{{ item.idTipoObligacion }}</td> -->
                        <td>{{ item.pagos }}</td>
                        <td>{{ item.prioridad }}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-danger mx-2"
                            @click.prevent="eliminarObligacion(index)"
                          >
                            Eliminar
                          </button>
                          <button
                            type="button"
                            class="btn btn-info"
                            data-toggle="modal"
                            data-target="#exampleModalEditar"
                            @click.prevent="ActivarObligacion(index)"
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                class="tab-pane"
                id="history"
                role="tabpanel"
                aria-labelledby="history-tab"
                :class="{ active: isActive2 }"
              >
                <div class="row">
                  <!-- Button trigger modal -->
                  <button
                    type="button"
                    class="btn btn-warning text-white my-3 mx-5"
                    data-toggle="modal"
                    data-target="#exampleModaldeseo"
                  >
                    Insertar deseo
                  </button>
                  <!-- Modal insertar datos deseo-->
                  <div
                    class="modal fade"
                    id="exampleModaldeseo"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            crear deseo
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
                          <form>
                            <div class="form-group">
                              <label for="exampleFormControlInput1"
                                >Nombre del deseo
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="exampleFormControlInput1"
                                v-model="des.nombreDeseo"
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleFormControlSelect1"
                                >Plazo</label
                              >
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                v-model="des.plazo"
                              >
                                <option value="corto">Corto (3-6 meses)</option>
                                <option value="mediano">Mediano (6-12 meses)</option>
                                <option value="largo">Largo (12-24 meses)</option>
                              </select>
                            </div>
                            <div class="form-group">
                              <label for="">valor aproximado del deseo </label>
                              <input
                                type="number"
                                class="form-control"
                                placeholder=""
                                v-model="des.valoraprox"
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleFormControlTextarea1"
                                >Texto motivacional</label
                              >
                              <textarea
                                class="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                v-model="des.TextoMitivacional"
                              ></textarea>
                            </div>
                            <div class="form-group">
                              <label for="exampleFormControlSelect2"
                                >Prioridad del deseo</label
                              >
                              <select
                                class="form-control"
                                id="exampleFormControlSelect2"
                                v-model="des.prioridad"
                              >
                                <option value="1">1. Urgente</option>
                                <option value="3">2. Obligatorio</option>
                                <option value="3">3. Opcional</option>
                              </select>
                            </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-warning text-white"
                            @click="creardeseo()"
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
                        <th scope="col">Deseo</th>
                        <th scope="col">Plazo</th>
                        <th scope="col">Valor aproximado</th>
                        <th scope="col">Texto</th>
                        <th scope="col">Prioridad</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in deseos" :key="item.id">
                        <th>{{ item.nombreDeseo }}</th>
                        <td>{{ item.plazo }}</td>
                        <td>{{ item.valoraprox }}</td>
                        <td>{{ item.TextoMitivacional }}</td>
                        <td>{{ item.prioridad }}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-danger mx-2"
                            @click.prevent="eliminarDeseo(index)"
                          >
                            Eliminar
                          </button>
                          <button
                            type="button"
                            class="btn btn-info"
                            data-toggle="modal"
                            data-target="#exampleModaldeseoEditar"
                            @click.prevent="ActivarDeseos(index)"
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- card dos pestañas -->

    <!-- Editar -->
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
            <form>
              <div class="form-group">
                <label for="exampleFormControlInput1"
                  >Nombre de la obligacion
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  v-model="obligConsulta.nombreObligacion"
                />
              </div>
             <!--  <div class="form-group">
                <label for="exampleFormControlSelect1"
                  >Tipo de la obligacion</label
                >
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="obligConsulta.idTipoObligacion"
                >
                  <option>importante</option>
                  <option>N/A</option>
                </select>
              </div> -->
              <div class="form-group">
                <label for="">valor de la obligacion </label>
                <input
                  type="number"
                  class="form-control"
                  placeholder=""
                  v-model="obligConsulta.valor"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect2"
                  >pagos de la obligacion</label
                >
                <select
                  class="form-control"
                  id="exampleFormControlSelect2"
                  v-model="obligConsulta.pagos"
                >
                  <option>Mensual</option>
                  <option>Quincenal</option>
                  <option>Total</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect2"
                  >Prioridad de la obligacion</label
                >
                <select
                  class="form-control"
                  id="exampleFormControlSelect2"
                  v-model="obligConsulta.prioridad"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning text-white">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- DESEOS -->
    <hr class="my-5" />

    <!-- Modal editar datos deseo-->
    <div
      class="modal fade"
      id="exampleModaldeseoEditar"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Modal editar deseo
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
            <form>
              <div class="form-group">
                <label for="exampleFormControlInput1">Nombre del deseo </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  v-model="desConsulta.nombreDeseo"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Plazo</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="desConsulta.plazo"
                >
                  <option>corto</option>
                  <option>largo</option>
                  <option>mediano</option>
                </select>
              </div>
              <div class="form-group">
                <label for="">valor aproximado del deseo </label>
                <input
                  type="number"
                  class="form-control"
                  placeholder=""
                  v-model="desConsulta.valoraprox"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1"
                  >Texto motivacional</label
                >
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  v-model="desConsulta.TextoMitivacional"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect2"
                  >Prioridad del deseo</label
                >
                <select
                  class="form-control"
                  id="exampleFormControlSelect2"
                  v-model="desConsulta.prioridad"
                >
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-warning text-white"
              @click.prevent="creardeseo()"
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
import moment from "moment";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
export default {
  components: {
    VueSlider
  },
  data() {
    return {
      obligaciones: [],
      deseos: [],
      oblig: {
        nombreObligacion: "",
        valor: 0,
        pagos: "",
        documentoEmpleado: 1053837687,
        prioridad: 0,
        valorCuota:0,
        cuota:0,
        idTipoObligacion:0
      },
      obligConsulta: {
        nombreObligacion: "",
        valor: 0,
        /* idTipoObligacion: "", */
        pagos: "",
        prioridad: 0,
      },
      des: {
        nombreDeseo: "",
        plazo: 0,
        valoraprox: 0,
        TextoMitivacional: "",
        documentoEmpleado: 1053837687,
        prioridad: 0,
      },
      desConsulta: {
        nombreDeseo: "",
        plazo: 0,
        valoraprox: 0,                
        TextoMitivacional: "",
        documentoEmpleado: 1053837687,
        prioridad: 0,
      },
      empleado: 0,
      planificacion: [],
      plan: {
        idObligacion: "",
        CubrirObligacion: "",
        valorObligacion: 0,
        PorcentajeObligacion: 0,
        mes: "",
      },
      parcial: false,
      mesPlan: "",
      planificarMes: [],
      cumplimientos: [],
      cumplimiento: {
        idPlanificar: "",
        ObligacionCumplida: true,
      },
      contador: 0,
      isActive1: true,
      isActive2: false,
      consultar: true,
      valor:0,
      tipoObligaciones:[],
      totalabonos:[],
      saldoRestante:0,
      saldo:false
    };
  },
  mounted() {
    this.buscarempleado();
    this.alltipoobligacion();
  },
  methods: {
    cargarValor(idObligacion){
      if(idObligacion != ''){
        var index = this.obligaciones.findIndex(x => x.id == idObligacion);
        this.valor = this.obligaciones[index].valor;
      }
    },
    change() {
      this.isActive1 = !this.isActive1;
      this.isActive2 = !this.isActive2;
    },
    PagoParcial(id) {
      if (this.plan.CubrirObligacion == "Parcial") {
        this.parcial = true;
      }else{
        this.parcial = false;
        if(this.plan.CubrirObligacion == "Pago Completo"){
          this.totalabnos(id)
          console.log(id)
          this.saldo = true
        }
      }
    },
    crearobligacion() {
      this.axios
        .post("/obligacion-nuevo", this.oblig)
        .then((res) => {
          //console.log(res.data);
          //console.log(this.oblig);
          this.obligaciones.push(res.data);
          this.$swal({
            position: "top-end",
            icon: "success",
            title: "Guardado con éxito !",
          });
          this.buscarempleado();
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            position: "toast-top-end",
            icon: "error",
            title: "Ocurrío un error",
            text: err,
          });
        });
    },
    buscarempleado() {
      const id = this.$store.state.id;
      this.axios
        .get(`/empleado/${id}`)
        .then((res) => {
          //console.log(res.data[0]);
          //console.log(res.data[0][0].documentoEmpleado);
          this.empleado = res.data[0][0].documentoEmpleado;
          console.log(this.empleado);
          this.buscarObligacion(this.empleado);
          this.buscarDeseo(this.empleado);
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            position: "toast-top-end",
            icon: "error",
            title: "Ocurrío un error!",
            text: err,
          });
        });
    },
    buscarObligacion(id) {
      console.log(id);
      this.axios
        .get(`/obligacion/${id}`)
        .then((res) => {
          console.log(res.data[0]);
          this.obligaciones = res.data[0];
          console.log(this.obligaciones);
          
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            position: "toast-top-end",
            icon: "error",
            title: "Ocurrío un error!",
            text: err,
          });
        });
    },
    ActivarObligacion(index) {
      this.obligConsulta.nombreObligacion =
        this.obligaciones[index].nombreObligacion;
      this.obligConsulta.valor = this.obligaciones[index].valor;
      /* this.obligConsulta.idTipoObligacion = this.obligaciones[index].idTipoObligacion; */
      this.obligConsulta.pagos = this.obligaciones[index].pagos;
      this.obligConsulta.prioridad = this.obligaciones[index].prioridad;
    },
    creardeseo() {
      this.axios
        .post("/deseo-nuevo", this.des)
        .then((res) => {
          console.log(res.data);
          console.log(this.des);
          this.deseos.push(res.data);
          this.$swal({
            position: "top-end",
            icon: "success",
            title: "Guardado con éxito !",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            position: "top-end",
            icon: "error",
            title: "Ocurrío un error",
            text: err,
          });
        });
    },
    buscarDeseo(id) {
      console.log(id + "deseo");
      this.axios
        .get(`/deseo/${id}`)
        .then((res) => {
          console.log(res.data[0]);
          this.deseos = res.data[0];
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            position: "toast-top-end",
            icon: "error",
            title: "Ocurrío un error!",
            text: err,
          });
        });
    },
    ActivarDeseos(index) {
      this.desConsulta.nombreDeseo = this.deseos[index].nombreDeseo;
      this.desConsulta.plazo = this.deseos[index].plazo;
      this.desConsulta.valoraprox = this.deseos[index].valoraprox;
      this.desConsulta.TextoMitivacional = this.deseos[index].TextoMitivacional;
      this.desConsulta.prioridad = this.deseos[index].prioridad;
    },
    eliminarDeseo(index) {
      console.log(this.deseos[index].id);
      this.axios
        .delete(`/eliminarDeseo/${this.deseos[index].id}`)
        .then((res) => {
          this.deseos.splice(index, 1);
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
    eliminarObligacion(index) {
      this.axios
        .delete(`/eliminarobligacion/${this.obligaciones[index].id}`)
        .then((res) => {
          this.obligaciones.splice(index, 1);
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
    crearPlanMes() {
      console.log(this.plan);
      console.log(this.obligaciones[0].valor);
      for (let index = 0; index < this.obligaciones.length; index++) {
        const element = this.obligaciones[index].valor;
        
      }
      if (this.plan.CubrirObligacion == "Total cuota") {
        this.plan.valorObligacion = this.obligaciones[0].valorCuota;
        this.plan.PorcentajeObligacion = 100;
      } else {
        if (this.plan.CubrirObligacion == "Pago Completo") {
          this.plan.valorObligacion  = this.obligaciones[0].valor
          this.plan.PorcentajeObligacion = 100
        }else{
          if (this.plan.valorObligacion != 0) {
            this.plan.PorcentajeObligacion =
              (this.plan.valorObligacion * 100) / this.obligaciones[0].valorCuota;
            console.log(this.plan.PorcentajeObligacion);
          } else {
            if (this.plan.PorcentajeObligacion != 0) {
              this.plan.valorObligacion =
                (this.plan.PorcentajeObligacion * this.obligaciones[0].valorCuota) /
                100;
            }
          }
        }
      }
      console.log(this.plan);
      this.axios
        .post("/planificar-nuevo", this.plan)
        .then((res) => {
          console.log(res.data);
          console.log(this.plan);
          this.planificacion.push(res.data);
          this.$swal({
            position: "top-end",
            icon: "success",
            title: "Guardado con éxito !",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            position: "toast-top-end",
            icon: "error",
            title: "Ocurrío un error",
            text: err,
          });
        });
    },
    consultarPlanMes() {
      console.log(this.mesPlan + "-01");
      const id = this.mesPlan + "-01";
      console.log(id);
      this.axios
        .get(`/consulta-planicar/${id}`)
        .then((res) => {
          console.log(res.data[0]);
         /*  this.consultar == true */
          this.planificarMes = res.data[0];
          for (let index = 0; index < this.planificarMes.length; index++) {
            this.planificarMes[index].mes = moment(
              this.planificarMes[index].mes
            )
              .zone("+05:00")
              .format("DD/MM/YYYY");
          }
          
          this.contadorobligacione(id);
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            position: "top-end",
            icon: "error",
            title: "Ocurrío un error!",
            text: err,
          });
        });
    },
    crearcumplimiento(item) {
      console.log("holiss check");
      console.log(item);
      this.cumplimiento.idPlanificar = item;
      this.cumplimiento.ObligacionCumplida = true;

      console.log(this.cumplimiento);

      this.axios
        .post("/cumplimiento-nuevo", this.cumplimiento)
        .then((res) => {
          console.log(res.data);
          console.log(this.cumplimiento);
          this.cumplimientos.push(res.data);
          this.$swal({
            title: "Esta seguro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, se cumplio!",
          }).then((result) => {
            if (result.isConfirmed) {
              this.$swal({
                position: "toast-top-end",
                icon: "success",
                title: "Obigacion al dia",
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            position: "toast-top-end",
            icon: "error",
            title: "Ocurrío un error",
            text: err,
          });
        });
    },
    contadorobligacione(id) {
      console.log(id);
      this.axios
        .get(`/contar-cumplidos/${id}`)
        .then((res) => {
          console.log(res.data[0]);
          this.contador = res.data[0][0].total;
          console.log(this.contador);
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            position: "top-end",
            icon: "error",
            title: "Ocurrío un error!",
            text: err,
          });
        });
    },
    alltipoobligacion(){
      this.axios.get('/all-tipoobligacion')
      .then((response) => {
        this.tipoObligaciones = response.data;
        console.log(this.tipoObligaciones)
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    totalabnos(id){
      this.axios
        .get(`/total-abonos/${id}`)
        .then((res) => {
          
          this.totalabonos = res.data[0][0]
          const pendiente = this.totalabonos.totalAbonos
          this.saldoRestante = this.valor -pendiente
          console.log(pendiente)
          console.log(this.saldoRestante)
          

        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            position: "top-end",
            icon: "error",
            title: "Ocurrío un error!",
            text: err,
          });
        });
    }
  },
};
</script>
<style >
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css");

.bi-card-checklist {
  font-size: 1.3rem;
}
</style>