<script>
import { Line } from "vue-chartjs";
export default {
  props: ["lable", "data", "question"],
  extends: Line,
  data() {
    return {};
  },
  mounted() {
    this.renderLineChart();
  },
  methods: {
    renderLineChart() {
      this.renderChart(
        {
          labels: this.lable ? this.lable : [],
          datasets: [
            {
              label: this.question,
              data: this.chartData,
              fill: false,
              borderColor: "#5196D9",
              backgroundColor: "#5196D9",
              borderWidth: 2,
            },
          ],
        },
        {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
                gridLines: {
                  display: true,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
          legend: {
            display: true,
          },
          responsive: true,
          maintainAspectRatio: false,
        }
      );
    },
  },
  watch: {
    data: function() {
      // this._chart.destroy();
      //this.renderChart(this.data, this.options);
      this.renderLineChart();
    },
  },
  computed: {
    chartData: function() {
      return this.data;
    },
  },
};
</script>
