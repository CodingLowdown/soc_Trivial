<template>
  <div id="app">
    <header class="header">Quiz Questions</header>
    <div>
      <button v-for="headers in outputSet" :key="headers" @click="nextQuestion(headers.header)"
      >
      {{headers.header}}
      </button>
    </div>
    <div v-if="currentQuestion" class="current-question">
      <p>{{currentQuestion.quein}}</p>
    </div>

      <input type="text" id="guess" class="current-question">
      <button @click="guess(currentQuestion.headerin)">Submit Answer</button>

  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data: () => ({
    currentQuestion: null,
  }),
  apollo: {
    outputQA: gql`query{
        outputQA {
            quein
            ansin
            headerin

        }
    }`,
    outputSet: gql`query{
        outputSet {
            header
        }
    }`,
  },
  methods: {
    nextQuestion(headerinp) {
      const QuestionList = [];
      for (let i = 0; i < this.outputQA.length; i += 1) {
        if (this.outputQA[i].headerin === headerinp) {
          QuestionList.push(this.outputQA[i]);
        }
      }

      this.currentQuestion = QuestionList[Math.floor(Math.random() * QuestionList.length)];
      console.log(QuestionList.headerin);
      console.log(headerinp);
    },
    guess(headerinp) {
      if (document.getElementById('guess').value === '') {
        alert('Wrong!!! Input an answer Please');
      } else if (this.currentQuestion.ansin.includes(document.getElementById('guess').value)) {
        alert('Correct');
        this.nextQuestion(headerinp);
      } else {
        alert(`Wrong!!! Answer was ${this.currentQuestion.ansin}`);
        this.nextQuestion(headerinp);
      }
    },
  },
};
</script>

<style lang="scss">
.current-question{
  width: 75%;
  font-family: sans-serif;
  font-size: 2rem;
  text-align: center;
  margin: 2rem;
}
button {
  width: 75%;
  font-size: 2rem;
  text-align: center;

}
.header{
  width: 100%;
  font-family: sans-serif;
  font-size: 3rem;
  text-align: left;
  margin: 2rem;
}
</style>
