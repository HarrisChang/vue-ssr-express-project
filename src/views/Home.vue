<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>以下数据通过服务端请求获得：</p>
    <ul>
      <li>{{totalRegister}}</li>
      <li>{{topMouthActiver}}</li>
      <li>{{totalActiver}}</li>
      <li>{{todayLogin}}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import homeModule from '../store/modules/home'
export default {
  asyncData ({ store }) {
    store.registerModule('home', homeModule)
    return store.dispatch('home/getAllData')
  },
  name: 'home',
  computed: {
    ...mapState({
      totalRegister: state => state.home.totalRegister,
      topMouthActiver: state => state.home.topMouthActiver
    }),
    totalActiver() {
      return this.$store.state.home.totalActiver
    },
    todayLogin() {
      return this.$store.state.home.todayLogin
    }
  },
  mounted() {
    // this.$http.get('https://swapi.co/api/people/1/').then(res => {
    //   debugger
    // })
  },
  destroyed () {
    this.$store.unregisterModule('home')
  },
}
</script>
