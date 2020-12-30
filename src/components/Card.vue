<template>
  <v-card class="mx-auto mt-3" max-width="600" v-if="poll">
    <v-card-text>
      <div>Live Polling <span class="circle red"></span></div>
      <h3 class="font-weight-medium text--primary my-2" v-if="poll.question">
        {{ poll.question  + poll.vote_count }}
      </h3>
      <p v-if="poll.end">Poll Ends on  {{ new Date(poll.end).toLocaleString() }} </p>
      <div class="text--primary" v-if="poll.options">
        <v-radio-group v-model="radioGroup" :disabled="!toVote">
          <v-radio
            v-for="(n, i) in poll.options"
            :key="i"
            :label="`${n}`"
            :value="n"
          ></v-radio>
        </v-radio-group>
        <v-btn class="mb-4 primary" v-if="toVote && radioGroup" @click="gb">Vote</v-btn>
        <v-btn class="mb-4 primary" v-if="!toVote" @click="$router.push('/login')">Login to Vote</v-btn>
      </div>
    </v-card-text>
    <v-sheet
      class="v-sheet--offset mx-auto pa-2"
      color="white"
      elevation="1"
      max-width="calc(100% - 32px)"
      ref="content"
    >
      <div>Live Polling Chart<span class="circle red"></span></div>
      <line-chart :question="poll.question" :lable="poll.options" :data="poll.vote_count" v-if="poll.options"></line-chart>
    </v-sheet>
    <v-card-text class="pt-0">
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>
        mdi-clock
      </v-icon>
      <span class="caption grey--text font-weight-light"
        >last Updated {{ Updated }} ago</span
      >
    </v-card-text>
  </v-card>
</template>

<script>
import LineChart from "./lineChart";
// import axios from "axios";
export default {
  components: {
    LineChart,
  },
  props: ["poll", "goVote"],
  data: () => ({
    radioGroup: null,
    Updated: new Date(),
    toVote: true
  }),
  mounted(){
    
  },
  updated(){
    
  },
  methods: {
    gb () {
      this.goVote(this.radioGroup);
      this.radioGroup = null;
    },
    dataFormat: function(a, b) {
      if (b) return b + "%";
      return a;
    },
  },
};
</script>

<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
.circle {
  border-radius: 50%;
  width: 8px;
  height: 8px;
  opacity: 0.25;
  border: 2px solid white;
}
.red {
  background-color: red;
  position: absolute;
  -webkit-animation: up-right 1s infinite;
  -moz-animation: up-right 1s infinite;
  -o-animation: up-right 1s infinite;
  animation: up-right 1s infinite;
}
@keyframes up-right {
  0% {
    transform: scale(1);
    opacity: 0.25;
  }
  50% {
    transform: scale (1, 5);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.25;
  }
}
</style>
