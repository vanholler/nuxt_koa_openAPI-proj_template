<template id="RegisterComponent">
  <form ref="form" action="" class="register-form" @submit.prevent="onSubmit">
    <h2>Register</h2>
    <div class="form-group">
      <label for="firstname">Prénom</label>
      <input id="firstname" v-model.trim="user.firstname" required type="text" placeholder="Prénom">
    </div>
    <div class="form-group">
      <label for="lastname">Nom</label>
      <input id="lastname" v-model.trim="user.lastname" required type="text" placeholder="Nom">
    </div>
    <div class="form-group">
      <label for="email">Adresse électronique</label>
      <input id="email" v-model.trim="user.email" required type="email" placeholder="Adresse électronique">
    </div>
    <div class="form-group">
      <label for="password">Mot de passe</label>
      <input id="password" v-model="user.password" required type="password" placeholder="Mot de passe">
    </div>
    <div class="form-group">
      <label for="passwordcheck">Vérification du mot de passe</label>
      <input id="passwordcheck" v-model="user.passwordChck" required type="password" placeholder="Vérification du mot de passe">
    </div>
    <input type="submit" :disabled="!isFormValid" value="Register">
  </form>
</template>
<script>
import Vue from 'vue'
const emailRegex = /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/

export default Vue.extend({
  name: 'RegisterComponent',
  data () {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordChck: ''
      }
    }
  },
  computed: {
    isFormValid () {
      return (
        this.isValid('firstname') &&
          this.isValid('lastname') &&
          this.isValid('email') &&
          this.isValid('password') &&
          this.isValid('passwordChck')
      )
    }
  },
  mounted () {
    const element = this.$el.querySelector('#passwordcheck')
    element.addEventListener('blur', () => {
      if (!this.isValid('passwordChck')) {
        element.classList.add('invalid')
      } else {
        element.classList.remove('invalid')
      }
    })
  },
  methods: {
    isValid (prop) {
      switch (prop) {
        case 'firstname':
          return this.user.firstname.length >= 2
          // eslint-disable-next-line no-unreachable
          break
        case 'lastname':
          return this.user.lastname.length >= 2
          // eslint-disable-next-line no-unreachable
          break
        case 'email':
          return emailRegex.test(this.user.email)
          // eslint-disable-next-line no-unreachable
          break
        case 'password':
          return this.user.password.length >= 6
          // eslint-disable-next-line no-unreachable
          break
        case 'passwordChck':
          return this.user.password === this.user.passwordChck
          // eslint-disable-next-line no-unreachable
          break
        default:
          return false
      }
    },
    resetUser () {
      this.user.firstname = ''
      this.user.lastname = ''
      this.user.email = ''
      this.user.password = ''
      this.user.passwordChck = ''
    },
    onSubmit () {
      const user = Object.assign({}, this.user)
      this.resetUser()
      this.$emit('register-form', {
        type: 'register',
        data: user
      })
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
    background:#e0e0e0;
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
  }
  button.active {
    opacity: 1;
    background: #057272;
  }

  form h2, header h2 {
    text-align: center;
    color: #008b8b;
  }

  .register-form {
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
    background: #057272;
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
