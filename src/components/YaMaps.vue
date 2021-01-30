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
          <v-col cols="12" xl="5" md="5" lg="5" sm="12" xs="12">
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
                    <v-list-item-subtitle>{{dataBillboard.deviceName}}</v-list-item-subtitle>
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
                    <v-list-item-subtitle>{{dataBillboard.dateTime}}</v-list-item-subtitle>
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
          <v-col cols="12" xl="7" md="7" lg="7" sm="12" xs="12">
            <div class="mr-5 mb-5 mt-5 ml-5 overflow-hidden" style="weight: 100%; height: 100%">
              <line-chart :options="optionsLine" :chart-data="datacollectionChart"/>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>

  <v-dialog
      v-model="changeNow"
      persistent
      max-width="950"
      class="m-0"
      style="overflow: hidden"
    >
      <v-card style="overflow: hidden">
        <v-card-actions class="mt-5">
          <v-spacer></v-spacer>
            <v-icon 
            class="ml-5"
            color="red darken-1"
            text
            @click="closeNowDialog()"
            >mdi-close</v-icon>
        </v-card-actions>
        <v-row>
          <v-col>
        <h2>Информация о текущем подключении</h2>
                  <br>
                  <div class="ml-6 mr-6 mb-6">
                    <hr>
                  </div>
            <v-card-text>
                <v-row>
                  <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Хост</v-list-item-title>
                    <v-list-item-subtitle>{{DbHost}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Логин</v-list-item-title>
                    <v-list-item-subtitle>{{DbLogin}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Пароль</v-list-item-title>
                    <v-list-item-subtitle>{{DbPassword}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>  
                      <v-card-actions class="mt-1 mb-0">
                      </v-card-actions>
                </v-row>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

  <v-dialog
      v-model="defaultDialog"
      persistent
      max-width="950"
      class="m-0"
      style="overflow: hidden"
    >
      <v-card style="overflow: hidden">
        <v-card-actions class="mt-5">
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
                            :rules="rules.host"
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
                            type="text"
                            v-model.trim="password"
                            :rules="rules.form"
                          ></v-text-field>
                        </v-form>
                      </v-card-text>
                </v-row>
                      <v-card-actions class="mt-1 mb-0">
                        <v-switch
                          v-model="switchSave"
                          :label="`Добавить в избранное: ${titleSwithSave(switchSave)}`"
                        ></v-switch>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          :disabled="!valid"
                          @click="dataBaseSetting()"
                          >Подключиться</v-btn
                        >
                      </v-card-actions>
            </v-card-text>
      </v-card>
    </v-dialog>


    <v-dialog
      v-model="changeFavorite"
      persistent
      max-width="950"
      class="m-0"
      style="overflow: hidden"
    >
      <v-card style="overflow: hidden">
        <v-card-actions>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск"
            single-line
          ></v-text-field>
          <v-spacer></v-spacer>
            <v-icon 
            class="ml-5"
            color="red darken-1"
            text
            @click="closeFavoriteDialog()"
            >mdi-close</v-icon>
        </v-card-actions>
        
        <v-data-table
          :headers="headersFavorites"
          :items="itemsFavorites"
          :search="search"
          class="elevation-1"
          :footerProps="{
            itemsPerPageText: 'Количество на странице',
            itemsPerPageAllText: 'Все',
          }"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
                  <v-icon small class="mr-2" @click="connectFavorite(item)">
                    mdi-database-arrow-right
                  </v-icon>
                </v-btn>
              </template>
              <span>Открыть</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon color="red" dark v-bind="attrs" v-on="on">
                  <v-icon small class="mr-2" @click="deleteFavorite(item)">
                    mdi-database-off
                  </v-icon>
                </v-btn>
              </template>
              <span>Удалить из избранных</span>
            </v-tooltip>
          </template>

          <template v-slot:[`footer.page-text`]="{ pageStart, itemsLength, pageStop }">
            {{ pageStart }}-{{ pageStop }} из {{ itemsLength }}
          </template>

          <template v-slot:no-data>
            <span>Записи отсутствуют</span>
          </template>

        </v-data-table>     
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
import { yandexMap, ymapMarker } from "vue-yandex-maps";
import LineChart                 from './LineChart.vue';

export default {
  name:       'HomeMaps',
  components: { yandexMap, ymapMarker, LineChart },
  props:      ['defaultDialog', 'changeFavorite', 'changeNow'],
  data() {
    return {
      switchSave:          false,
      dialog:              false,
      dialogTest:          false,
      valid:               false,
      DbHost:              '',
      DbLogin:             '',
      DbPassword:          '',
      host:                '',
      login:               '',
      password:            '',
      search:              '',
      datacollectionChart: {},
      dataBillboard:       {},
      itemsFavorites:      [],
      surfaceNewFront:     [],
      coords:              [56.6375, 60.824],
      optionsLine: {
        responsive:          true,
        maintainAspectRatio: true,
      },
      rules: {
        form: [
          (v) => !!v || "Поле не может быть пустым",
        ],
        host: [
          (v) => RegExp('https?:\\/\\/').test(v) || "Укажите протокол (http:// или https://)",
          (v) => !!v || "Поле не может быть пустым",
        ]
      },
      headersFavorites: [
        { text: 'Номер'         , value: 'id'       },
        { text: 'Хост'          , value: 'host'     },
        { text: 'Логин'         , value: 'login'    },
        { text: 'Пароль'        , value: 'password' },
        { text: 'Дата создания' , value: 'date'     },
        { text: 'Действия'      , value: 'actions'  },
      ],
      surfaceNew: [
        {
          id:         88,
          id_login:   3,
          deviceName: 'ESP_NMTM_103901',
          dateTime:   "2021-01-23 02:32:06",
          latitude:   56.6375,
          longitude:  60.824,
          humidity:   0,
          values: {
            temperature: 27.884,
            pressure:    0,
            humidity:    0
          }
        }
      ],
    };
  },
  async mounted() {
    this.itemsFavorites = JSON.parse(localStorage.getItem('favoritesData')) ? JSON.parse(localStorage.getItem('favoritesData')) : []

    this.DbHost     = localStorage.getItem('DbHost')
    this.DbLogin    = localStorage.getItem('DbLogin')
    this.DbPassword = localStorage.getItem('DbPassword')

    let DbHost     = this.DbHost
    let DbLogin    = this.DbLogin
    let DbPassword = this.DbPassword

    if (DbHost, DbLogin, DbPassword) {
      let DbObj = {
        host:     DbHost,
        login:    DbLogin,
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
    changeFavorite: function() {
      this.itemsFavorites = JSON.parse(localStorage.getItem('favoritesData')) ? JSON.parse(localStorage.getItem('favoritesData')) : []
    }
  },
  methods: {
    async connectFavorite(item) {
      let host     = item.host,
          login    = item.login, 
          password = item.password,
          isSave   = null

      let formChangeSource = {host, login, password, isSave};

      await this.$store.dispatch("getDataSensors", formChangeSource)
      let dataSensor = await this.$store.getters.dataSensors;
      let status = await this.$store.getters.status;
      if (status === 'ok') {
        this.$dialog.notify.success(`Подключение установлено`);
      } else {
        this.$dialog.notify.error(`Подключение не установлено`);
      }
      this.surfaceNew = dataSensor;

      this.host       = ''
      this.login      = ''
      this.password   = ''
      this.switchSave = false
      
      this.closeDialog()
    },
    deleteFavorite(item) {
      let favoritesArr  = JSON.parse(localStorage.getItem('favoritesData'))
      let favoriteFinal = favoritesArr.filter((e) => {
        if (e.id != item.id) {
          return e;
        }
      })
      let finallArr = favoriteFinal.map((e, index) => {
                return {
                  id:       index + 1,
                  host:     e.host,
                  login:    e.login,
                  password: e.password,
                  date:     e.date
                }
              })
      localStorage.removeItem('favoritesData')
      localStorage.setItem('favoritesData', JSON.stringify(finallArr))
      this.itemsFavorites = JSON.parse(localStorage.getItem('favoritesData'))
      this.$dialog.notify.info(`Подключение удалено`);
    },
    titleSwithSave(isSwitch) {
      return isSwitch ? 'Да' : 'Нет';
    },
    async dataBaseSetting() {
      let host     = this.host,
          login    = this.login, 
          password = this.password,
          isSave   = this.switchSave

      let formChangeSource = {host, login, password, isSave};

      await this.$store.dispatch("getDataSensors", formChangeSource)
      let dataSensor = await this.$store.getters.dataSensors;
      let status = await this.$store.getters.status;
      if (status === 'ok') {
        this.$dialog.notify.success(`Подключение установлено`);
      } else {
        this.$dialog.notify.error(`Подключение не установлено`);
      }
      this.surfaceNew = dataSensor;

      this.host       = ''
      this.login      = ''
      this.password   = ''
      this.switchSave = false
      
      this.$refs.form.reset();
      this.closeDialog()
    },
    closeDialog() {
      this.$refs.form.reset();
      this.$emit('close')
    },
    closeNowDialog() {
      this.$emit('closeNow')
    },
    closeFavoriteDialog() {
      this.$emit('closeFavorite')
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
          let yourObjId = dataSensor[i]['deviceName'];
          myHash[yourObjId] = dataSensor[i];
      }

      let arr = []

      for (let obj in myHash) {
        arr.push(myHash[obj])
      }

      this.surfaceNewFront = arr;
    },
    drawerOpen(dataBillboard) {
      this.setChartData(dataBillboard.deviceName);
      this.dialog = !this.dialog
      this.dataBillboard = dataBillboard
    },
    setChartData(nameSensor) {
      let arrGraph    = [];
      let arrHumidity = [];
      let arrPressure = [];

      this.surfaceNew.forEach(e => {
        if (e.deviceName === nameSensor) {
            arrGraph.push({
              x: e.dateTime,
              y: e.values.temperature
            })
        }
      })
      this.surfaceNew.forEach(e => {
        if (e.deviceName === nameSensor) {
            arrHumidity.push({
              x: e.dateTime,
              y: e.values.humidity
            })
        }
      })
      this.surfaceNew.forEach(e => {
        if (e.deviceName === nameSensor && +e.values.pressure) {
            arrPressure.push({
              x: e.dateTime,
              y: e.values.pressure
            })
        }
      })
      arrGraph.sort((a, b) => b.x - a.x);
      arrHumidity.sort((a, b) => b.x - a.x);
      arrPressure.sort((a, b) => b.x - a.x);

      let preDataset = [
        {
            label:            'Температура',
            borderColor:      'rgba(97, 179, 222, 1)',
            pointBorderColor: 'rgba(238, 97, 35, 1)',
            fill:             false,
            data:             arrGraph
          },
          {
            label:            'Влажность',
            borderColor:      '#FFCCBB',
            pointBorderColor: '#6EB5C0',
            fill:             false,
            data:             arrHumidity
          },
          {
            label:            'Давление',
            borderColor:      '#EDAE01',
            pointBorderColor: '#D61800',
            fill:             false,
            data:             arrPressure
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
