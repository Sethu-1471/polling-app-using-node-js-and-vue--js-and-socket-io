<template>
  <v-card class="mx-auto mt-3" max-width="344" outlined>
    <v-card-text>
      <div>Login to Live Polling<span class="circle red"></span></div>
    </v-card-text>
    <v-card-text>
      <v-text-field label="Phone Number" ></v-text-field>
      <v-text-field label="Enter OTP that send to your number" v-on:keyup.enter="login"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn class="primary" @click="sendOtp" :disabled="disabled">
        Send OTP
      </v-btn>
      <v-btn class="primary" @click="login" :disabled="!disabled">
        Go Vote
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    disabled: false
  }),
  methods: {
      sendOtp(){
          this.disabled = true;
      },
      login(){
          this.disabled = false;
      }
  }
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
