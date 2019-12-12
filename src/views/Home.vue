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
import { mapGetters } from 'vuex'
export default {
  asyncData ({ store, route }) {
    return store.dispatch('getAllData')
  },
  name: 'home',
  computed: {
    ...mapGetters([
      'totalRegister',
      'topMouthActiver'
    ]),
    totalActiver() {
      return this.$store.getters.totalActiver
    },
    todayLogin() {
      return this.$store.getters.todayLogin
    }
  }
}
</script>
