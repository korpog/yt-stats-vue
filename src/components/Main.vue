<template>
  <div class="main">
    <h1 id="title">VidsPerMonth</h1>
    <label for="url">
      Enter a URL for a YouTube channel
      <br />(e.g. https://www.youtube.com/channel/UCCezIgC97PvUuR4_gbFUs5g)
    </label>
    <form @submit.prevent="getData($event)">
      <input
        type="url"
        name="url"
        id="url"
        placeholder="https://www.youtube.com/channel/UCCezIgC97PvUuR4_gbFUs5g"
        pattern="https://.*"
        size="50"
        v-model="url"
        required
      />
      <select v-model="currentYear" selected="2020" @change="onChange($event)">
        <option v-for="year in years" v-bind:key="year">{{ year }}</option>
      </select>
      <span>Selected: {{ currentYear }}</span>
      <button type="submit" id="btn">Submit</button>
    </form>

    <div id="chart">
      <chart :chart-data="chartdata"></chart>
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
      years: [],
      currentYear: 2020,
      data: {},
      chartdata: {}
    };
  },
  methods: {
    getChannelIdFromURL(url) {
      let idx = url.lastIndexOf("/");
      let channelId = url.slice(idx + 1);
      return channelId;
    },
    fillData(dataSet) {
      this.chartdata = {
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
            data: dataSet,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 200, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(77, 99, 255, 0.5)",
              "rgba(56, 200, 100, 0.5)",
              "rgba(147, 102, 15, 0.5)",
              "rgba(53, 66, 99, 0.5)",
              "rgba(145, 98, 255, 0.5)",
              "rgba(200, 0, 0, 0.5)",
              "rgba(5, 170, 255, 0.5)",
              "rgba(255, 55, 199, 0.5)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 200, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(77, 99, 255, 1)",
              "rgba(56, 200, 100, 1)",
              "rgba(147, 102, 15, 1)",
              "rgba(53, 66, 99, 1)",
              "rgba(145, 98, 255, 1)",
              "rgba(200, 0, 0, 0.5)",
              "rgba(5, 170, 255, 1)",
              "rgba(255, 55, 199, 1)"
            ],
            borderWidth: 2
          }
        ]
      };
    },
    getData(event) {
      event.preventDefault();
      let channelId = this.getChannelIdFromURL(this.url);
      apiService
        .getResults(channelId)
        .then(data => {
          this.years = new Array();
          let newData = JSON.parse(data);
          this.data = newData;
          for (const year in newData) {
            this.years.push(parseInt(year));
          }

          let currentYear = Math.max(...this.years);
          let currentData = newData[currentYear];
          this.fillData(currentData);
        })
        .catch(err => alert(err));
    },
    onChange(event) {
      let newDataSet = this.data[event.target.value];
      this.fillData(newDataSet);
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
input,
select {
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
  width: 60%;
  margin: auto;
}
#btn {
  display: block;
  margin: auto;
  color: black;
  background-color: blanchedalmond;
  border-radius: 5px;
  font-family: "Open Sans", sans-serif;
  font-size: 1em;
  padding: 0.2em 1em;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}
#btn:hover {
  color: crimson;
}
#chart {
  max-height: 1280px;
  max-width: 720px;
  margin: auto;
  padding: 5px;
}
</style>
