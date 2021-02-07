<template>
  <div>
    <div class="my-booking">
      <p class="title">MY BOOKING</p>
      <b-row align-h="between" align-v="end">
        <b-col class="left">My Booking</b-col>
        <b-col class="right">Order History</b-col>
      </b-row>
    </div>

    <div class="payment-status" v-for="(el, i) in myBooking" :key="i">
      <p>{{ formatTime(el.date) }} - {{ formatTime(el.takeOffTime) }}</p>
      <p style="font-size: 20px;font-weight: 600">
        {{ el.takeOffAirport.slice(-5).slice(1, 4) }}
        <span
          ><img src="../../../assets/myBooking/airplaneIcon.png" alt=""
        /></span>
        {{ el.landingAirport.slice(-5).slice(1, 4) }}
      </p>

      <p class="grey">{{ el.airlanes }}</p>
      <div class="line"></div>
      <b-row align-v="baseline">
        <b-col cols="3" sm="3" md="4" lg="2" class="grey">Status</b-col>
        <b-col cols="12" sm="4" md="6" lg="4"
          ><div class="status-success" v-if="el.status === 1">
            <p>Success</p>
          </div>
          <div class="status-pending" v-else-if="el.status === 0">
            <p>Pending</p>
          </div></b-col
        >
        <b-col cols="12" sm="12" md="12" lg="6" class="right"
          >View Details
          <span
            ><img
              src="../../../assets/myBooking/btnback.png"
              alt=""
              style="cursor:pointer"
              @click="myBookingDetail(el, i)"/></span
        ></b-col>
      </b-row>
      <div v-show="isClickDetails[i]">
        <div class="passenger-detail">
          <div class="box-detail">
            <b-row align-v="baseline">
              <b-col md="auto">
                <img
                  v-if="el.airlanes === 'Garuda'"
                  src="../../../assets/icon/garuda.png"
                  class="mr-3 img-fit"
                />
                <img
                  v-else-if="el.airlanes === 'Lion Air'"
                  src="../../../assets/icon/lion air.png"
                  class="mr-3 img-fit"
                />
                <img
                  v-else-if="el.airlanes === 'Sriwijaya'"
                  src="../../../assets/icon/sriwijaya.png"
                  class="mr-4 img-fit"
                />
                <img
                  v-else-if="el.airlanes === 'Batik Air'"
                  src="../../../assets/icon/batik air.png"
                  class="mr-3 img-fit"
                />
                <img
                  v-else-if="el.airlanes === 'Citilink'"
                  src="../../../assets/icon/citilink.png"
                  class="mr-3 img-fit"
                />
                <img
                  v-else
                  src="../../../assets/icon/air asia.png"
                  class="mr-4"
                />
              </b-col>
              <b-col>
                <p class="airline-name">{{ el.airlanes }}</p>
              </b-col>
            </b-row>
            <br /><br />
            <p style="font-size: 18px;font-weight: 600; line-height: 27px">
              {{ el.takeOff }} ({{ el.takeOffAirport.slice(-5).slice(1, 4) }})
              <span
                ><img src="../../../assets/myBooking/airplaneIcon.png" alt=""
              /></span>
              {{ el.landing }} ({{ el.landingAirport.slice(-5).slice(1, 4) }})
            </p>
            <b-row>
              <b-col
                ><p class="grey">
                  {{ formatTime(el.takeOffTime)
                  }}<span
                    ><img
                      src="../../../assets/myBooking/Ellipse 48.png"
                      alt=""/></span
                  >{{ formatTime(el.landingTime) }}
                </p></b-col
              >
            </b-row>

            <br />
            <b-row>
              <b-col cols="7"><h6>Total Payment</h6></b-col>
              <b-col cols="5" class="right"
                >IDR. {{ el.passenger.length * el.price }}</b-col
              >
            </b-row>
            <br />
            <div class="line"></div>
            <div>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Nationality</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in el.passenger" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.title }}. {{ item.fullname }}</td>
                    <td>{{ item.nationality }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <b-button
            style="background-color:#2395ff; text-align: right"
            v-if="el.status === 1"
            ><router-link
              to="/detailbooking"
              style="display: block; color:white"
              >Booking Detail</router-link
            ></b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      isClickDetails: [false],
      isPaymentSuccess: false
    }
  },
  computed: {
    ...mapGetters({
      myBooking: 'getMyBooking'
    })
  },
  methods: {
    ...mapActions(['deleteBookingVuex']),
    ...mapMutations(['setElementMyBooking']),
    myBookingDetail(el, i) {
      if (this.isClickDetails[i]) this.isClickDetails[i] = false
      else this.isClickDetails[i] = true

      this.isClickDetails.push(false)

      this.setElementMyBooking(el)
    },
    formatTime(value) {
      moment.locale('en')
      return moment(String(value)).format('lll')
    }
  }
}
</script>

<style scoped>
.img-fit {
  height: 50px;

  object-fit: cover;
}
.blue {
  color: #2395ff;
}
.frame {
  border-style: solid;
  border-color: #2395ff;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  text-align: center;
  border-width: 1px;
}
.airline-name {
  color: #595959;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
}
.title {
  letter-spacing: 0.3em;
  font-weight: 500;
  color: #2395ff;
  font-size: 14px;
}
.my-booking,
.payment-status {
  width: 100%;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
}

.line {
  width: 100%;
  height: 1px;
  background: #e6e6e6;
  padding: 0;
  margin-bottom: 15px;
}
.left {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
}

.grey {
  color: #979797;
}

.right {
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  text-align: right;
  color: #2395ff;
}

span {
  margin: 0 15px;
}

.payment-status p,
.status-waiting {
  font-size: 14px;
  line-height: 22px;
}
.status-success,
.status-pending {
  background-color: red;
  width: 150px;
  text-align: center;
  font-weight: 600;
  color: white;
  border-radius: 5px;
}

.status-success {
  background-color: #4fcf4d;
}
.passenger-detail,
.box-detail {
  padding: 20px;
}
.box-detail {
  width: 80%;
  box-shadow: 3px 3px 5px 6px #979797;
  border-radius: 15px;
  background: white;
}
@media only screen and (max-width: 991px) {
  .box-detail {
    width: 300px;
  }
}
@media only screen and (max-width: 576px) {
  .right {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
  }
}
@media only screen and (max-width: 375px) {
  .right {
    font-size: 12px;
    line-height: 15px;
    font-weight: 400;
  }
  .my-booking,
  .payment-status {
    width: 100%;
  }
}
</style>
