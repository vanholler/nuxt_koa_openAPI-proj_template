<template>
  <div>
    <img src="@/assets/img/welcome.png" alt="">
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Main',
  mounted () {
    setTimeout(() => {
      this.$router.push({ path: 'Login' })
    }, 1000)
  }
})
</script>
