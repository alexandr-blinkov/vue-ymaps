<template>
<div id="app">

  <v-app>
     <v-row justify-content="center" v-if="dialog === true" style="overflow: hidden">
    <v-dialog
      v-model="dialog"
      max-width="900"
      class="m-0"
      style="overflow: hidden"
    >
      <v-card style="overflow: hidden">
        <v-card-actions class="mt-2">
          <v-spacer></v-spacer>
          <v-icon 
            class="ml-5"
            color="red darken-1"
            text
            @click="dialog = false"
            >mdi-close</v-icon>
        </v-card-actions>
        <v-row justify-content="center" style="align-items: center; display: flex">
          <v-col cols="5">
            <v-card-text>
              <v-row>
                <v-col cols="12" style="padding: 0px">
                  <h2>Информация</h2>
                  <br>
                  <div class="ml-6 mr-6">
                    <hr>
                  </div>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Название датчика</v-list-item-title>
                    <v-list-item-subtitle>{{dataBillboard.name}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                </v-col>
                <v-col cols="12" style="padding: 0px">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Температура</v-list-item-title>
                    <v-list-item-subtitle>{{dataBillboard.values.temperature}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                </v-col>
                <v-col cols="12" style="padding: 0px" v-if="+dataBillboard.values.humidity">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Влажность</v-list-item-title>
                    <v-list-item-subtitle>{{dataBillboard.values.humidity}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                </v-col>
                <v-col cols="12" style="padding: 0px" v-if="+dataBillboard.values.pressure">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Давление</v-list-item-title>
                    <v-list-item-subtitle>{{dataBillboard.values.pressure}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                </v-col>
                <v-col cols="12" style="padding: 0px">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Дата и время</v-list-item-title>
                    <v-list-item-subtitle>{{dataBillboard.time_value}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                </v-col>
                <v-col cols="12" style="padding: 0px">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Широта</v-list-item-title>
                    <v-list-item-subtitle>{{dataBillboard.latitude}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                </v-col>
                <v-col cols="12" style="padding: 0px">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Долгота</v-list-item-title>
                    <v-list-item-subtitle>{{dataBillboard.longitude}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                </v-col>
              </v-row>
            </v-card-text>
          </v-col>
          <v-col cols="7">
            <div class="mr-5 mb-5 mt-5 ml-5 overflow-hidden" style="weight: 100%; height: 100%">
              <line-chart :options="optionsLine" :chart-data="datacollectionChart"/>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>

  <v-dialog
      v-model="defaultDialog"
      persistent
      max-width="500"
      class="m-0"
      style="overflow: hidden"
    >
      <v-card style="overflow: hidden">
        <v-card-actions class="mt-2">
          <div class="ml-3">Изменение источника данных</div>
          <v-spacer></v-spacer>
            <v-icon 
            class="ml-5"
            color="red darken-1"
            text
            @click="closeDialog()"
            >mdi-close</v-icon>
        </v-card-actions>
            <v-card-text>
                <v-row>
                      <v-card-text>
                        <v-form  v-model="valid" ref="form" validation>
                          <v-text-field
                            prepend-icon="mdi-earth"
                            label="Хост"
                            name="host"
                            type="host"
                            v-model.trim="host"
                            :rules="rules.form"
                          ></v-text-field>

                          <v-text-field
                            prepend-icon="mdi-login"
                            label="Логин"
                            name="login"
                            type="login"
                            v-model.trim="login"
                            :rules="rules.form"
                          ></v-text-field>

                          <v-text-field
                            prepend-icon="mdi-lock"
                            label="Пароль"
                            name="password"
                            type="password"
                            v-model.trim="password"
                            :rules="rules.form"
                          ></v-text-field>
                        </v-form>
                      </v-card-text>
                </v-row>
                      <v-card-actions class="mt-1 mb-0">
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          :disabled="!valid"
                          @click="dataBaseSetting()"
                          >Подключить</v-btn
                        >
                      </v-card-actions>
            </v-card-text>
      </v-card>
    </v-dialog>
    <yandex-map
      zoom="10"
      style="width: 100%; max-width: 100%; height: 100%;"
      :coords="coords"
    >
      <ymap-marker
        v-for="(billboard, index) in surfaceNewFront"
        :key="billboard.id"
        marker-type="placemark"
        :coords="[billboard.latitude, billboard.longitude]"
        :marker-id="index"
        :icon="{ content: Number(billboard.values.temperature).toFixed(1) }"
        @click.stop="drawerOpen(billboard)"
      ></ymap-marker>
    </yandex-map>
  </v-app>
</div>
</template>

<script>
import { yandexMap, ymapMarker, loadYmap } from "vue-yandex-maps";
import LineChart from './LineChart.vue';

export default {
  name: "HomeMaps",
  components: { yandexMap, ymapMarker, LineChart },
  props: ['defaultDialog'],
  data() {
    return {
      dialog: false,
      dialogTest: false,
      dataBillboard: {},
      coords: [56.6375, 60.824],
      datacollectionChart: {},
      optionsLine: {
        responsive: false,
        maintainAspectRatio: true,
      },
      surfaceNewFront: [],
      surfaceNew: [
        {
          id: 88,
          id_login: 3,
          name: 'ESP_NMTM_103901',
          time_value: "2021-01-23 02:32:06",
          latitude: 56.6375,
          longitude: 60.824,
          humidity: 0,
          values: {
            temperature: 27.884,
            pressure: 0,
            humidity: 0
          }
        }
      ],
      host: '',
      login: '',
      password: '',
      valid: false,
      rules: {
        form: [
          (v) => !!v || "Поле не может быть пустым",
        ],
      },
      settings: {
        lang: "ru_RU",
        coordorder: "latlong",
        version: "2.1",
      },
    };
  },
  async mounted() {
  setInterval(async () => {
    await loadYmap({ ...this.settings, debug: true });
  }, 3000)

    let DbHost = localStorage.getItem('DbHost')
    let DbLogin = localStorage.getItem('DbLogin')
    let DbPassword = localStorage.getItem('DbPassword')

    if (DbHost, DbLogin, DbPassword) {
      let DbObj = {
        host: DbHost,
        login: DbLogin,
        password: DbPassword
      }
      await this.$store.dispatch("getDataSensors", DbObj);
    } else {
      await this.$store.dispatch("getDataSensors");
    }

    let dataSensor = await this.$store.getters.dataSensors;
    this.surfaceNew = dataSensor;
    this.formatterData();
    setInterval(() => {
        this.updateData();
      }, 1000*60*3)
  },
  watch: {
    surfaceNew: function() {
      this.formatterData();
    },
  },
  methods: {
    async dataBaseSetting() {
      let host = this.host
      let login = this.login
      let password = this.password

      let formDb = {
        host: host,
        login: login,
        password: password
      };
      await this.$store.dispatch("getDataSensors", formDb)
      let dataSensor = await this.$store.getters.dataSensors;
      this.surfaceNew = dataSensor;
      this.closeDialog()
    },
    closeDialog() {
      this.$emit('close')
    },
    async updateData(dataSensors) {
        await this.$store.dispatch("getDataSensors");
        let dataSensor = await this.$store.getters.dataSensors;
        this.surfaceNew = dataSensor;
    },
    formatterData() {
      let dataSensor = this.$store.getters.dataSensors;

      let myHash = new Object();
      let i;

      for(i = 0; i < dataSensor.length; i++) {
          let yourObjId = dataSensor[i]['name'];
          myHash[yourObjId] = dataSensor[i];
      }

      let arr = []

      for (let obj in myHash) {
        arr.push(myHash[obj])
      }

      this.surfaceNewFront = arr;
    },
    drawerOpen(dataBillboard) {
      this.setChartData(dataBillboard.name);
      this.dialog = !this.dialog
      this.dataBillboard = dataBillboard
    },
    setChartData(nameSensor) {
      let arrGraph = [];
      let arrHumidity = [];
      let arrPressure = [];

      this.surfaceNew.forEach(e => {
        if (e.name === nameSensor) {
            arrGraph.push({
              x: e.time_value,
              y: e.values.temperature
            })
        }
      })
      this.surfaceNew.forEach(e => {
        if (e.name === nameSensor) {
            arrHumidity.push({
              x: e.time_value,
              y: e.values.humidity
            })
        }
      })
      this.surfaceNew.forEach(e => {
        if (e.name === nameSensor && +e.values.pressure) {
            arrPressure.push({
              x: e.time_value,
              y: e.values.pressure
            })
        }
      })
      arrGraph.sort((a, b) => b.x - a.x);
      arrHumidity.sort((a, b) => b.x - a.x);
      arrPressure.sort((a, b) => b.x - a.x);

      let preDataset = [
        {
            label: 'Температура',
            borderColor: 'rgba(97, 179, 222, 1)',
            pointBorderColor: 'rgba(238, 97, 35, 1)',
            fill: false,
            data: arrGraph
          },
          {
            label: 'Влажность',
            borderColor: '#FFCCBB',
            pointBorderColor: '#6EB5C0',
            fill: false,
            data: arrHumidity
          },
          {
            label: 'Давление',
            borderColor: '#EDAE01',
            pointBorderColor: '#D61800',
            fill: false,
            data: arrPressure
          }
      ]

      let arrLabels = arrGraph.map(e => e.x)

      this.datacollectionChart = {
        labels: arrLabels,
        datasets: preDataset.filter((e) => e.data.length > 0)
      }
    } 
  }
};
</script>

<style scoped>
#app {
  overflow-x: hidden;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0;
}
a {
  color: #42b983;
}
</style>
