<template>
  <div class="home">
    <Card :poll="poll" :goVote="goVote" />
    <v-fab-transition>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="!false"
            color="primary"
            v-bind="attrs"
            v-on="on"
            dark
            fixed
            bottom
            right
            fab
            @click="$router.push('/create')"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Create Poll</span>
      </v-tooltip>
    </v-fab-transition>
  </div>
</template>

<script>
import Card from "../components/Card";
import io from "socket.io-client";
import axios from "axios";
export default {
  name: "Home",
  components: {
    Card,
  },
  data: () => ({
    poll: null,
  }),
  mounted() {
    let socket = io("localhost:3500");
    socket.on("connect", () => {
      //get the id from socket
      console.log(socket.id);
      socket.emit("create", this.$route.params.id);
    });
    socket.on("voted", (res) => {
      console.log("socket updated",res);
      this.poll = res;
    })
    socket.on("disconnect", (res) => {
      console.log("just disconnected: " + res);
    });
    this.getPost();
  },
  methods: {
    goVote(a) {
      let body = {
        sno: this.$route.params.id,
        option: a,
      };
      axios.put(this.$hostname + "/poll/vote", body).then((res) => {
        if (res.data.status) {
          this.poll = res.data.poll;
          this.$vToastify.success(res.data.message);
        } else {
          this.$vToastify.error(res.data.message);
        }
      });
    },
    getPost() {
      axios
        .get(this.$hostname + "/poll/get", {
          params: {
            id: this.$route.params.id,
          },
        })
        .then((res) => {
          if (res.data.status) {
            this.poll = res.data.poll;
            this.$vToastify.success(res.data.message);
          } else {
            this.$vToastify.error(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
