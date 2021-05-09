<template id="feedbackTemplate">
  <div class="feedback">
    <header>
      <h2>{{ title }}</h2>
    </header>
    <div v-if="feedback.type === 'register'">
      <p>Bienvenue <strong>{{ feedback.data | name }}</strong>.</p>
      <p> Un email vient d'être envoyé à l'adresse {{ feedback.data | email }} afin de compléter ton inscription.</p>
    </div>
    <div v-else>
      <p>Vous allez être redirigé(e) dans quelques instants...</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'FeedbackComponent',
  filters: {
    email (input) {
      if (input.email) {
        return input.email
      } else {
        return ''
      }
    },
    name (input) {
      return input.firstname ? input.firstname : ''
    }
  },
  props: ['feedback'],
  data () { return {} },
  computed: {
    title () {
      return this.feedback.type === 'signin'
        ? 'Authentification effectuée'
        : 'Inscription'
    }
  }
})
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=PT+Sans');

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
  }
  button.active {
    opacity: 1;
    background: #057272;
  }
  form h2, header h2 {
    text-align: center;
    color: #008b8b;
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
