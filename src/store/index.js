import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataSensors: [],
    status: ''
  },
  mutations: {
    setDataSensors(state, data) {
      state.dataSensors = data
    },
    setStatus(state, data) {
      state.status = data
    }
  },
  actions: {
    async getDataSensors ({commit}, formDb = null) {
      let timeNow          = new Date(),
          dateTimeToOrigin = new Date(timeNow.setTime(timeNow.getTime() + 5 * 60 * 60 * 1000)),
          dateTimeTo       = dateTimeToOrigin.toISOString(),
          dateTimeFrom     = new Date(dateTimeToOrigin.setDate(dateTimeToOrigin.getDate() - 1)).toISOString()

      let latitudeFrom  = -90,
          latitudeTo    = 90,
          longitudeFrom = -180,
          longitudeTo   = 180

      let LocalHost     = localStorage.getItem('DbHost'),
          LocalLogin    = localStorage.getItem('DbLogin'),
          LocalPassword = localStorage.getItem('DbPassword')

      if (!formDb && !LocalHost && !LocalLogin && !LocalPassword) {
        Axios.defaults.headers.common['Authorization'] = `Basic ${btoa('front:Qwe753951')}`;
        let data = await Axios.get('http://188.226.32.141/records' 
          + '?' 
          + `latitudeFrom=${latitudeFrom}&latitudeTo=${latitudeTo}&longitudeFrom=${longitudeFrom}&longitudeTo=${longitudeTo}&dateTimeFrom=${dateTimeFrom}&dateTimeTo=${dateTimeTo}`)
            .then((res) => res.data)
            .catch((err) => console.log(err.response))

        if (data && Array.isArray(data)) {
          localStorage.setItem('DbHost', 'http://188.226.32.141/records')
          localStorage.setItem('DbLogin', 'front')
          localStorage.setItem('DbPassword', 'Qwe753951')
          commit('setDataSensors', data);
          commit('setStatus', 'ok');
        } else {
          commit('setStatus', 'fail');
        }
      } else {
        let login    = formDb ? formDb.login    : LocalLogin,
            password = formDb ? formDb.password : LocalPassword,
            host     = formDb ? formDb.host     : LocalHost
        
        Axios.defaults.headers.common['Authorization'] = `Basic ${btoa(login + ':' + password)}`
        let data = await Axios.get(`${host}`
          + '?' 
          + `latitudeFrom=${latitudeFrom}&latitudeTo=${latitudeTo}&longitudeFrom=${longitudeFrom}&longitudeTo=${longitudeTo}&dateTimeFrom=${dateTimeFrom}&dateTimeTo=${dateTimeTo}`)
            .then((res) => res.data)
            .catch((err) => console.log(err.response))

        if (formDb) {
          if (formDb.isSave) {
            if (localStorage.getItem('favoritesData')) {
              let favoritesArr = JSON.parse(localStorage.getItem('favoritesData'))
              favoritesArr.push({host: formDb.host, login: formDb.login, password: formDb.password, date: Intl.DateTimeFormat('ru-RU', {
                day    : '2-digit',
                month  : 'long',
                year   : 'numeric',
                hour   : '2-digit',
                minute : '2-digit',
                second : '2-digit'
              }).format(new Date())})
              let finallArr = favoritesArr.map((e, index) => {
                return {
                  id: index + 1,
                  host: e.host,
                  login: e.login,
                  password: e.password,
                  date: e.date
                }
              })
              localStorage.setItem('favoritesData', JSON.stringify(finallArr))
            } else {
              localStorage.setItem('favoritesData', JSON.stringify([{id: 1, host: formDb.host, login: formDb.login, password: formDb.password, date: Intl.DateTimeFormat('ru-RU', {
                day    : '2-digit',
                month  : 'long',
                year   : 'numeric',
                hour   : '2-digit',
                minute : '2-digit',
                second : '2-digit'
              }).format(new Date())}]))
            }
          }
        }

        if (data && Array.isArray(data)) {         
          if (formDb && host != LocalHost && login != LocalLogin && password != LocalPassword) {
            localStorage.setItem('DbHost', host)
            localStorage.setItem('DbLogin', login)
            localStorage.setItem('DbPassword', password)
          }
          commit('setDataSensors', data);
          commit('setStatus', 'ok');
        } else {
          commit('setStatus', 'fail');
        }
      }
    }
  },
  getters: {
    dataSensors: state => state.dataSensors,
    status: state => state.status,
  },
})
