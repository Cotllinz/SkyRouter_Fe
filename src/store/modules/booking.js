import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
export default {
  state: {
    myBooking: [],
    elMyBooking: '',
    notification: [],
    flight: 0
  },
  mutations: {
    setDataBooking(state, payload) {
      state.myBooking = payload
      console.log(state.myBooking)
    },
    setElementMyBooking(state, payload) {
      state.elMyBooking = payload
    },
    setNotif(state, payload) {
      state.notification = payload.data
    },
    setFlight(state, payload) {
      state.flight = payload
    }
  },
  actions: {
    getNotif(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}notif/${payload}`)
          .then(result => {
            context.commit('setNotif', result.data)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteNotif(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_URL}notif/${payload}`)
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getBooking(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}booking/mybooking/${payload}`)
          .then(result => {
            context.commit('setDataBooking', result.data.data)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    patchFlight(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${process.env.VUE_APP_URL}booking/${payload}`)
          .then(result => {
            context.commit('setFlight', 1)
            resolve(result)
          })
          .catch(error => {
            alert(error.response)
            reject(error.response)
          })
      })
    },
    deleteBookingVuex(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_URL}booking/${payload}`)
          .then(result => {
            context.dispatch('getBooking')
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {
    getMyBooking(state) {
      return state.myBooking
    },
    getAllPassengers(state) {
      return state.passengers
    },
    getElMyBooking(state) {
      return state.elMyBooking
    },
    getNotification(state) {
      return state.notification
    },
    getStatusFlight(state) {
      return state.flight
    }
  }
}
