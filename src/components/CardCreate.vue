<template>
  <v-card class="mx-auto mt-3" max-width="344" outlined>
    <v-card-text>
      <div>Create Live Polling<span class="circle red"></span></div>
    </v-card-text>
    <v-form v-model="valid" @submit.prevent="submit">
      <v-card-text>
        <v-text-field
          label="Question"
          :rules="emptyRules"
          required
          v-model="question"
        ></v-text-field>
        <v-combobox
          multiple
          v-model="tags"
          label="Options"
          append-icon
          chips
          deletable-chips
          :rules="optionRules"
          required
        >
        </v-combobox>
        <v-datetime-picker
          label="Select poll end time (optional)"
          v-model="datetime"
        >
        </v-datetime-picker>
      </v-card-text>
      <v-card-actions>
        <v-btn class="primary" :disabled="!valid" @click="createPoll">
          Go Live
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
// import io from "socket.io-client";
import axios from "axios";
export default {
  data: () => ({
    question: null,
    datetime: null,
    option: null,
    tags: [],
    valid: false,
    emptyRules: [(v) => !!v || "Questions required"],
    optionRules: [
      (o) => !!o || "Options required",
      (o) => o.length <= 4 || "Options must be less than 4",
      (o) => o.length > 1 || "Options must be greater than 1",
    ],
  }),
  methods: {
    createPoll() {
      let body = {
        question: this.question,
        options: this.tags,
        end: this.datetime ? this.datetime : null
      };
      axios.post(this.$hostname + "/poll/create", body).then((res) => {
        if (res.data.status) {
          this.$vToastify.success(res.data.message);
          this.$router.push("/poll/" + res.data.poll_id);
        }else{
          this.$vToastify.error(res.data.message);
        }
      });
    },
  },
};
</script>

<style scoped>
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
