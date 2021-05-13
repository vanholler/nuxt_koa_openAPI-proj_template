<template>
  <div v-cloak class="login">
    <div class="actions">
      <button
        :class="[{ active: isDisabled('register') }]"
        @click.prevent="setComponent('register')"
      >
        Регистрация
      </button>
      <button
        :class="[{ active: isDisabled('signin') }]"
        @click.prevent="setComponent('signin')"
      >
        Войти
      </button>
    </div>

    <!--    TODO сделать поддержку авторизации через телефон или соц.сети-->
    <transition name="form" mode="out-in">
      <keep-alive>
        <component
          :is="currentComponent"
          :feedback="feedback"
          @register-form="handleForm"
          @signin-form="handleForm"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import RegisterComponent from '@/components/modules/RegisterComponent.vue'
import SignInComponent from '@/components/modules/SignInComponent.vue'
import FeedbackComponent from '@/components/modules/FeedbackComponent.vue'

export default Vue.extend({
  name: 'LoginPage',
  components: {
    register: RegisterComponent,
    signin: SignInComponent,
    feedback: FeedbackComponent
  },
  data () {
    return {
      feedback: {},
      currentComponent: 'register'
    }
  },
  methods: {
    handleForm (data) {
      this.feedback = data
      setTimeout(() => {
        this.setComponent('feedback')
      }, 280)
    },
    isDisabled (btnName) {
      return (this.currentComponent === btnName)
    },
    setComponent (componentName) {
      if (this.currentComponent !== componentName) {
        this.currentComponent = componentName
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

  .login {
    border-top:.5em solid #008b8b;
    max-width:800px;
    margin: 0 auto;
    position:absolute;
    top:50%;
    left:50%;
    width:96%;
    transform:translate(-50%, -50%);
    padding: 2em 3em 1em;
    background:white;
    overflow: hidden;
    box-shadow: 0 10px 6px -6px rgba(0,0,0,.2);
    animation: enterFromBottom .7s .3s ease-out both;

    @media screen and (max-width: 500px){
      padding: 2em 1em 1em;
    }
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
