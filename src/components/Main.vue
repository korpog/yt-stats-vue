<template>
  <div class="main">
    <h1 id="title">VidsPerMonth</h1>
    <label for="url">Enter an URL for a YouTube channel</label>
    <input
      type="url"
      name="url"
      id="url"
      placeholder="https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw"
      pattern="https://.*"
      size="50"
      required
      v-model="url"
    />
    <button type="submit" id="btn" @click="getData()">Submit</button>
    <Chart></Chart>
  </div>
</template>

<script>
import { APIService } from "../APIService";
import Chart from "./Chart.vue";

const apiService = new APIService();

export default {
  name: "Main",
  components: { Chart },
  data() {
    return {
      url: "",
      data: {},
      chartdata: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    getChannelIdFromURL(url) {
      let idx = url.lastIndexOf("/");
      let channelId = url.slice(idx + 1);
      return channelId;
    },
    getData() {
      let channelId = this.getChannelIdFromURL(this.url);
      this.data = apiService.getResults(channelId).catch(err => alert(err));
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://fonts.googleapis.com/css?family=Lato");
a {
  color: #42b983;
}
label {
  display: block;
  font-family: "Lato", sans-serif;
  margin: 5px;
}
input {
  font-family: "Lato", sans-serif;
  margin: 3px;
}
#title {
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
  font-family: "Open Sans", sans-serif;
  border: solid black 1px;
  border-radius: 5px;
  background: linear-gradient(to bottom, #b6e026 0%, #abdc28 100%);
  width: 50%;
  margin: auto;
}
#btn {
  display: block;
  margin: auto;
  color: black;
  background-color: ghostwhite;
  border-radius: 5px;
  padding: 5px;
}
</style>
