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
    <div id="chart">
      <Chart :chartdata="chartdata" :options="options"></Chart>
    </div>
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
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "# of Videos",
            data: [12, 19, 3, 5, 2, 3, 4, 6, 2, 9, 11, 2],
            backgroundColor: [
              "rgba(255, 99, 132, 0.3)",
              "rgba(54, 162, 235, 0.3)",
              "rgba(255, 206, 86, 0.3)",
              "rgba(75, 192, 192, 0.3)",
              "rgba(77, 99, 255, 0.3)",
              "rgba(56, 200, 100, 0.3)",
              "rgba(147, 102, 15, 0.3)",
              "rgba(53, 66, 99, 0.3)",
              "rgba(145, 98, 255, 0.3)",
              "rgba(100, 102, 220, 0.3)",
              "rgba(5, 170, 255, 0.3)",
              "rgba(255, 55, 199, 0.3)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(77, 99, 255, 1)",
              "rgba(56, 200, 100, 1)",
              "rgba(147, 102, 15, 1)",
              "rgba(53, 66, 99, 1)",
              "rgba(145, 98, 255, 1)",
              "rgba(100, 102, 220, 1)",
              "rgba(5, 170, 255, 1)",
              "rgba(255, 55, 199, 1)"
            ],
            borderWidth: 2
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
  top: 5px;
  font-family: "Open Sans", sans-serif;
  border-radius: 4px;
  background: linear-gradient(to bottom, #b0d4e3 0%, #88bacf 100%);
  width: 50%;
  margin: auto;
}
#btn {
  display: block;
  margin: auto;
  color: black;
  background-color: seashell;
  border-radius: 1px;
  font-family: "Open Sans", sans-serif;
  font-size: 1em;
  padding: 0.2em 0.8em;
}
#btn:hover {
  color: crimson;
}
#chart {
  max-height: 1280px;
  max-width: 720px;
  margin: auto;
}
</style>
