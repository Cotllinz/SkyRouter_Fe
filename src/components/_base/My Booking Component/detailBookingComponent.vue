<template>
  <div>
    <div class="detail-booking">
      <h3>Booking Pass</h3>
      <br />
      <div class=" two-circles">
        <b-row align-v="center">
          <b-col cols="12" sm="6" md="7" lg="8">
            <b-row align-h="baseline">
              <b-col cols="12">
                <img
                  v-if="elMyBooking.airlanes === 'Garuda'"
                  src="../../../assets/icon/garuda.png"
                  class="mr-3 img-fit"
                />
                <img
                  v-else-if="elMyBooking.airlanes === 'Lion Air'"
                  src="../../../assets/icon/lion air.png"
                  class="mr-3 img-fit"
                />
                <img
                  v-else-if="elMyBooking.airlanes === 'Sriwijaya'"
                  src="../../../assets/icon/sriwijaya.png"
                  class="mr-4 img-fit"
                />
                <img
                  v-else-if="elMyBooking.airlanes === 'Batik Air'"
                  src="../../../assets/icon/batik air.png"
                  class="mr-3 img-fit"
                />
                <img
                  v-else-if="elMyBooking.airlanes === 'Citilink'"
                  src="../../../assets/icon/citilink.png"
                  class="mr-3 img-fit"
                />
                <img
                  v-else
                  src="../../../assets/icon/air asia.png"
                  class="mr-4"
                />
              </b-col>
              <b-col cols="12">
                <p style="font-size: 20px;font-weight: 600">
                  IDN
                  <span
                    ><img
                      src="../../../assets/myBooking/airplaneIcon.png"
                      alt=""
                  /></span>
                  JPN
                </p>
              </b-col>
            </b-row>
            <br /><br />
            <b-row>
              <b-col cols="3">
                <p class="grey">Code</p>
                <p>{{ elMyBooking.airlanes.slice(0, 2).toUpperCase() }}-900</p>
              </b-col>
              <b-col>
                <p class="grey">Class</p>
                <p>{{ elMyBooking.airplanesClass }}</p>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col cols="3">
                <p class="grey">Terminal</p>
                <p>1A</p>
              </b-col>
              <b-col>
                <p class="grey">Gate</p>
                <p>4</p>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col cols="8">
                <p class="grey">Departure</p>
                <p>{{ formatTime(elMyBooking.takeOffTime) }}</p>
              </b-col>
            </b-row>
          </b-col>
          <b-col sm="1" md="1" lg="1">
            <div class="line"></div>
          </b-col>
          <b-col cols="12" sm="5" md="4" lg="3">
            <vue-qrcode
              :value="`https://skyrouter.netlify.app/${mydata}`"
              class="qr"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import VueQrcode from 'vue-qrcode'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  created() {
    this.mydata = this.elMyBooking.orderId.concat(
      '-',
      this.elMyBooking.bookingId
    )
  },
  data() {
    return {
      params: ''
    }
  },
  components: {
    VueQrcode
  },
  computed: {
    ...mapGetters({ elMyBooking: 'getElMyBooking' })
  },
  methods: {
    formatTime(value) {
      moment.locale('en')
      return moment(String(value)).format('LLLL')
    }
  }
}
</script>

<style scoped>
.qr {
  width: 150px;
  height: 150px;
  margin-left: -30px;
}
.grey {
  color: #979797;
}
.img-fit {
  height: 50px;

  object-fit: cover;
}
.two-circles {
  width: 650px;
  background: radial-gradient(
        circle at right top,
        transparent 10px,
        #eeeeee 1px
      )
      top left / 400px 51% no-repeat,
    radial-gradient(circle at right bottom, transparent 10px, #eeeeee 0) bottom
      left / 400px 51% no-repeat,
    radial-gradient(circle at left top, transparent 10px, #eeeeee 0) top right /
      250px 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 10px, #eeeeee 0) bottom
      right / 250px 51% no-repeat;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
}
h3 {
  margin-left: 20px;
  margin-bottom: 5px;
}
p {
  margin-bottom: 2px;
}
.detail-booking {
  background: white;
  width: 700px;

  margin: 0 auto;
  padding: 20px 0;
  border-radius: 20px;
}
span {
  margin: 0 20px;
}
.line {
  border-width: 1px;
  border-style: dashed;
  height: 300px;
  width: 1px;
  margin-left: -45px;
}
@media only screen and (max-width: 991px) {
  .two-circles {
    background: radial-gradient(
          circle at right top,
          transparent 10px,
          #eeeeee 1px
        )
        top left / 370px 51% no-repeat,
      radial-gradient(circle at right bottom, transparent 10px, #eeeeee 0)
        bottom left / 370px 51% no-repeat,
      radial-gradient(circle at left top, transparent 10px, #eeeeee 0) top right /
        280px 51% no-repeat,
      radial-gradient(circle at left bottom, transparent 10px, #eeeeee 0) bottom
        right / 280px 51% no-repeat;
  }
}
@media only screen and (max-width: 767px) {
  .detail-booking {
    width: 530px;
  }
  .two-circles {
    width: 510px;
  }
}
@media only screen and (max-width: 576px) {
  .qr {
    width: 120px;
    height: 120px;
    margin-left: 0px;
    margin-top: 30px;
  }
  .two-circles {
    width: 400px;
    background: #eeeeee;
    border-radius: 10px;
    padding: 20px;
    margin: auto;
  }
  h3 {
    margin-left: 20px;
    margin-bottom: 5px;
  }
  p {
    margin-bottom: 2px;
  }
  .detail-booking {
    background: white;
    width: 420px;

    margin: 0 auto;
    padding: 20px 0;
    border-radius: 20px;
  }

  .line {
    display: none;
  }
}
@media only screen and (max-width: 420px) {
  .qr {
    width: 100px;
    height: 100px;
    margin-left: 0px;
    margin-top: 30px;
  }
  .two-circles {
    width: 300px;
    background: #eeeeee;
    border-radius: 10px;
    padding: 20px;
    margin: auto;
  }

  p {
    margin-bottom: 2px;
    font-size: 12px;
  }
  .detail-booking {
    background: white;
    width: 320px;

    margin: 0 auto;
    padding: 20px 0;
    border-radius: 20px;
  }

  .line {
    display: none;
  }
}
</style>
