<template>
  <form ref="form" action="" class="signin-form" @submit.prevent="handleForm">
    <h2>Войти</h2>
    <div class="form-group">
      <label for="email">Адрес эл.почты</label>
      <input id="email" v-model="user.email" required type="email" placeholder="введите эл.почту">
    </div>
    <div class="form-group">
      <label for="password">пароль</label>
      <input id="password" v-model="user.password" required type="password" placeholder="пароль">
    </div>
    <input :disabled="isFormValid" type="submit" value="Войти">
  </form>
</template>

<script>
import Vue from 'vue'
const emailRegex = /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/

export default Vue.extend({
  name: 'SigninComponent',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    isFormValid () {
      return (this.isValid('email') && this.isValid('password'))
    }
  },
  methods: {
    handleForm () {
      const formvalue = Object.assign({}, this.user)
      this.resetFormValues()
      this.$emit('signin-form', { type: 'signin', data: formvalue })
    },
    resetFormValues () {
      this.user.email = ''
      this.user.password = ''
    },
    isValid (prop) {
      switch (prop) {
        case 'email':
          return emailRegex.test(this.user.email)
          // eslint-disable-next-line no-unreachable
          break
        case 'password':
          return this.user.password.length >= 6
          // eslint-disable-next-line no-unreachable
          break
        default:
          return false
      }
    }
  }
})
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=PT+Sans');

  *, *::before, *::after {
    box-sizing: border-box;
  }
  [v-cloak] {
    opacity: 0;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: 'PT Sans', sans-serif;

  }

  button {
    all:unset;
    display: inline-block;
    padding:1em;
    letter-spacing: .05em;
    font-size: 14px;
    cursor: pointer;
    border:1px solid;
    color:white;
    background: #008b8b;
    transition:250ms;
    margin: 0 .2em 0 0;
    opacity: .4;

    &.active {
      opacity: 1;
      background: #057272;
    }

  }

  form h2, header h2 {
    text-align: center;
    color: #008b8b;
  }

  .signin-form {
    margin: 2em 0;
    padding:1em;
  }

  .form-group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding:8px;

  }
  label {
    flex:1;
    text-align: right;
    margin-right: 2em;
  }

  input {
    font-size: inherit;
    border:none;
    background:whitesmoke;
    font-family:inherit;
    padding:.4em;
    flex:1.5;
  }

  input.invalid {
    border:1px solid tomato;
  }
  .feedback {
    padding: 1em;
  }
  p {
    line-height: 1.4;
    max-width:50ch;
    margin: 10px auto;
    text-align:center;
  }

  input[type='submit'] {
    display: block;
    margin: 2em 0 2em auto;
    padding: .6em 1em;
    font-size: inherit;
    cursor: pointer;
    background: #008b8b;
    color:white;
    border:none;
  }

  input[type='submit']:disabled {
    opacity: .4;
    cursor: not-allowed;
  }

  input[type='submit']:hover {
    background: #008b8b;
  }

  @keyframes enterFromBottom {
    0%  {
      opacity:0;
      transform:translate(-50%, -45%);
    }
    100% {
      opacity:1;
      transform:translate(-50%, -50%);
    }
  }
</style>
