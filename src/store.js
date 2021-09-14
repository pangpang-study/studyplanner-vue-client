//저장소
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {//data역할
    allUsers:[
      {userId: 'hoza123', password: '123', name: 'Hoza', address: 'Seoul', src:'https://goo.gl/oqLfJR'},
      {userId: 'max123', password: '456', name: 'Max', address: 'Berlin', src:'https://goo.gl/Ksk9B9'},
      {userId: 'lego123', password: '789', name: 'Lego', address: 'Busan', src:'https://goo.gl/x7SpCD'}
    ]
  },
  getters:{
    allUsersCount: (state) =>{
      return state.allUsers.length
    },
    countOfSeoul: (state) => {
      let count = 0
      state.allUsers.forEach(user =>{
        if(user.address === 'Seoul') count++
      })
      return count
    },
    percentOfSeoul: (state,getters) => {
      return Math.round(getters.countOfSeoul / getters.allUsersCount * 100)
    }
  },
  mutations: {

  },
  actions: {//body
      login(){
      axios
      .post('https://reqres.in/api/login',allUsers)
      .then(res => {
        console.log(res)
        let config = {
         headers: {
           "access-token" : res.data.token
         }
        }
        axios
        .get('https://reqres.in/api/users/2',allUsers)
          .then(res => {
            // handle success
            console.log(res);
          })
          .catch(err => {
            // handle error
            console.log(err);
          })
          .then(() => {
            console.log("test")
            // always executed
          });
        
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  created() {
    EventBus.$on('signUp', users => {
      this.allUsers.push(users)
    })
  }
  ,
  methods: {
    signUp() {
      let userObj = {
        userId: this.userId,
        password: this.password,
        name: this.name,
        address: this.address,
        src: this.src
      }
      EventBus.$emit('signUp', userObj)
      this.clearForm()
    }
  }
})
