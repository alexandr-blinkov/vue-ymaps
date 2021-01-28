import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataSensors: [],
  },
  mutations: {
    setDataSensors(state, data) {
      state.dataSensors = data
    }
  },
  actions: {
    async getDataSensors ({commit}, formDb = null) {
      let timeNow = new Date()
      let dateTimeToOrigin = new Date(timeNow.setTime(timeNow.getTime() + 5 * 60 * 60 * 1000))
      let dateTimeTo = dateTimeToOrigin.toISOString();
      let dateTimeFrom = new Date(dateTimeToOrigin.setDate(dateTimeToOrigin.getDate() - 1)).toISOString()

      let latitudeFrom = -90
      let latitudeTo = 90
      let longitudeFrom = -180
      let longitudeTo = 180

      if (!formDb) {
        Axios.defaults.withCredentials = true
        Axios.defaults.headers.common['Authorization'] = `Basic ${btoa('front:Qwe753951')}`;
        let data = await Axios.get('http://188.226.32.141' 
          + '?' 
          + `latitudeFrom=${latitudeFrom}&latitudeTo=${latitudeTo}&longitudeFrom=${longitudeFrom}&longitudeTo=${longitudeTo}&dateTimeFrom=${dateTimeFrom}&dateTimeTo=${dateTimeTo}`)
          .then((res) => res.data)
          .catch((err) => console.log(err.response))

        if (data) {
          commit('setDataSensors', data);
        } else {
          commit('setDataSensors', []);
        }
      } else {
        Axios.defaults.withCredentials = true
        Axios.defaults.headers.common['Authorization'] = `Basic ${btoa(formDb.login + ':' + formDb.password)}`
        let data = await Axios.get(`${formDb.host}`
          + '?' 
          + `latitudeFrom=${latitudeFrom}&latitudeTo=${latitudeTo}&longitudeFrom=${longitudeFrom}&longitudeTo=${longitudeTo}&dateTimeFrom=${dateTimeFrom}&dateTimeTo=${dateTimeTo}`)
          .then((res) => res.data)
          .catch((err) => console.log(err.response))

        if (data) {         
          localStorage.setItem('DbHost', formDb.host)
          localStorage.setItem('DbLogin', formDb.login)
          localStorage.setItem('DbPassword', formDb.password)

          commit('setDataSensors', data);
        } else {
          commit('setDataSensors', []);
        }
      }
    }
  },
  getters: {
    dataSensors: state => state.dataSensors,
  },
})
