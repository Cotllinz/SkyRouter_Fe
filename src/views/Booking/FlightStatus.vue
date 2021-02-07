<template>
  <div>
    <b-container>
      <b-row align-h="center" align-v="center">
        <b-col cols="8" sm="8" md="8" lg="8">
          <div v-if="flight === 1" class="card">
            <h4>Ticket Confirmed</h4>

            <h1>We hope you enjoy the Flight</h1>
          </div>
          <div v-else class="card">
            <h4 style="color: red">Failed</h4>
            <h1>Please Try Again</h1>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  created() {
    this.patchFlight(this.$route.params.id.split('-')[1])
  },
  computed: {
    ...mapGetters({ flight: 'getStatusFlight' })
  },
  methods: {
    ...mapActions(['patchFlight'])
  }
}
</script>

<style scoped>
.card {
  height: 300px;
  background: #2395ff;
  margin: 40px auto;
  border-radius: 10px;
  color: white;
  text-align: center;
  padding-top: 100px;
  background-image: url('../../assets/chatImg/vector 02.png');
  background-repeat: no-repeat;
}
</style>
