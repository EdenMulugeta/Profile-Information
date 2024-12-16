import "./style.css";
import * as echarts from "echarts";

var scoreGraph = echarts.init(document.getElementById("score-graph"));

async function fetchedUserData(url) {
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.error("Error when fetching the data:", error);
    return null;
  }
  return data;
}

fetchedUserData("http://localhost:3000/user")
  .then((data) => {
    if (data) {
      console.log("Fetched data:", data);
    } else {
      console.log("No data fetched due to error.");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

async function fetchedPostData(url) {
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.error("Error when fetching the data:", error);
    return null;
  }
  return data;
}

fetchedPostData("http://localhost:3000/post")
  .then((data) => {
    if (data) {
      console.log("Fetched data:", data);
    } else {
      console.log("No data fetched due to error.");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

async function fetchedReadedTimeData(url) {
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
    console.log(data[0].read_time);
    // Check if data is returned and update the chart
    if (data && data[0].read_time !== undefined) {
      console.log(data.read_time);
      updateReadedChart(data[0].read_time);
    } else {
      console.log("No valid data fetched or 'read_time' is not defined.");
    }
  } catch (error) {
    console.error("Error when fetching the data:", error);
    return null;
  }
}
fetchedReadedTimeData("http://localhost:3000/post");
function updateReadedChart(readTime) {
  totalReadedTimeChart.setOption({
    series: [
      {
        data: [
          {
            value: readTime,
            name: "SCORE",
          },
        ],
      },
    ],
  });
}

var option = {
  xAxis: {
    data: ["Animals", "Fruits", "Cars"],
  },
  yAxis: {},
  series: [
    {
      type: "bar",
      id: "sales",
      data: [
        { value: 5, groupId: "animals" },
        { value: 2, groupId: "fruits" },
        { value: 4, groupId: "cars" },
      ],
      universalTransition: {
        enabled: true,
        divideShape: "clone",
      },
    },
  ],
};

/*
const drilldownData = [
  {
    dataGroupId: "animals",
    data: [
      ["Cats", 4],
      ["Dogs", 2],
      ["Cows", 1],
      ["Sheep", 2],
      ["Pigs", 1],
    ],
  },
  {
    dataGroupId: "fruits",
    data: [
      ["Apples", 4],
      ["Oranges", 2],
    ],
  },
  {
    dataGroupId: "cars",
    data: [
      ["Toyota", 4],
      ["Opel", 2],
      ["Volkswagen", 2],
    ],
  },
];*/

// Set initial option
scoreGraph.setOption(option);

// Click event for drilldown
/*scoreChart.on("click", function (event) {
  if (event.data) {
    var subData = drilldownData.find(function (data) {
      return data.dataGroupId === event.data.groupId;
    });
    if (!subData) {
      return;
    }
    scoreChart.setOption({
      xAxis: {
        data: subData.data.map(function (item) {
          return item[0];
        }),
      },
      series: [
        {
          type: "bar",
          id: "sales",
          dataGroupId: subData.dataGroupId,
          data: subData.data.map(function (item) {
            return item[1];
          }),
          universalTransition: {
            enabled: true,
            divideShape: "clone",
          },
        },
      ],
      graphic: [
        {
          type: "text",
          left: 50,
          top: 20,
          style: {
            text: "Back",
            fontSize: 18,
            fill: "#000",
          },
          onclick: function () {
            scoreChart.setOption(option);
          },
        },
      ],
    });
  }
});*/

//const scoreChart = echarts.init(document.getElementById('score-graph'));

// Sample data based on your provided structure

// Main chart configuration
let base = +new Date(2016, 9, 3);
let oneDay = 24 * 3600 * 1000;
let valueBase = Math.random() * 300;
let valueBase2 = Math.random() * 50;
let data = [];
let data2 = [];

for (var i = 1; i < 10; i++) {
  var now = new Date((base += oneDay));
  var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("-");
  valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
  if (valueBase <= 0) valueBase = Math.random() * 300;
  data.push([dayStr, valueBase]);

  valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2);
  if (valueBase2 <= 0) valueBase2 = Math.random() * 50;
  data2.push([dayStr, valueBase2]);
}

let mainChartOption = {
  legend: {
    top: "bottom",
    data: ["Data Series 1", "Data Series 2"],
  },
  tooltip: {
    triggerOn: "none",
    position: function (pt) {
      return [pt[0], 130];
    },
  },
  toolbox: {
    left: "center",
    itemSize: 25,
    top: 55,
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      restore: {},
    },
  },
  xAxis: {
    type: "time",
    axisPointer: {
      snap: true,
      lineStyle: {
        color: "#7581BD",
        width: 2,
      },
      label: {
        show: true,
        formatter: function (params) {
          return echarts.format.formatTime("yyyy-MM-dd", params.value);
        },
        backgroundColor: "#7581BD",
      },
      handle: {
        show: true,
        color: "#7581BD",
      },
    },
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    axisTick: {
      inside: true,
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      inside: true,
      formatter: "{value}\n",
    },
    z: 10,
  },
  grid: {
    top: 110,
    left: 15,
    right: 15,
    height: 160,
  },
  dataZoom: [
    {
      type: "inside",
      throttle: 50,
    },
  ],
  series: [
    {
      name: "Fake Data 1",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 5,
      sampling: "average",
      itemStyle: {
        color: "#0770FF",
      },
      stack: "a",
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(58,77,233,0.8)",
          },
          {
            offset: 1,
            color: "rgba(58,77,233,0.3)",
          },
        ]),
      },
      data: data,
    },
    {
      name: "Fake Data 2",
      type: "line",
      smooth: true,
      stack: "a",
      symbol: "circle",
      symbolSize: 5,
      sampling: "average",
      itemStyle: {
        color: "#F2597F",
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(213,72,120,0.8)",
          },
          {
            offset: 1,
            color: "rgba(213,72,120,0.3)",
          },
        ]),
      },
      data: data2,
    },
  ],
};

// Initialize main chart
var mainChart = echarts.init(document.getElementById("main"));
mainChart.setOption(mainChartOption);

// Score chart configuration
let scoreChartOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  // toolbox: {
  //   feature: {
  //     saveAsImage: {},
  //   },
  // },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "Email",
      type: "line",
      stack: "Total",
      areaStyle: {},
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Union Ads",
      type: "line",
      stack: "Total",
      areaStyle: {},
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ads",
      type: "line",
      stack: "Total",
      areaStyle: {},
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "Direct",
      type: "line",
      stack: "Total",
      areaStyle: {},
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "Search Engine",
      type: "line",
      stack: "Total",
      areaStyle: {},
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};

// Initialize score chart
var scoreChart = echarts.init(document.getElementById("score-graph"));
scoreChart.setOption(scoreChartOption);

var totalReadedTimeChart = echarts.init(
  document.getElementById("readed-time-chart")
);

var totalReadedTimeChartOption = {
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%",
  },
  series: [
    {
      name: "Pressure",
      type: "gauge",
      progress: {
        show: true,
      },
      detail: {
        valueAnimation: true,
        formatter: "{value}",
      },
      data: [
        {
          value: 50,
          name: "SCORE",
        },
      ],
    },
  ],
};

totalReadedTimeChart.setOption(totalReadedTimeChartOption);
