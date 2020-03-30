// <!-- RescueTime + Google Charts
// ================================================== -->

//  <script type="text/javascript">

// Calling Rescue Time Data
movierescueTime();
var rTvery_productive_percentage;
var rTproductive_percentage;
var rTneutral_percentage;
var rTdistracting_percentage;
var rTvery_distracting_percentage;

function movierescueTime() {
  var request = new XMLHttpRequest();
  var getRescueTime =
    "https://www.rescuetime.com/anapi/daily_summary_feed?key=B63TFb2EXGglprpQqYrz4zIgChijDRfsZaddbjEN";

  var getRescueTimeX =
    "https://cors.io/?https://www.rescuetime.com/anapi/daily_summary_feed?key=B63TFb2EXGglprpQqYrz4zIgChijDRfsZaddbjEN";

  // call url
  request.open("GET", getRescueTime);
  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      this.getAllResponseHeaders();
      //Converting responseText String JSON to Javascript Object JSON.
      var rescueTimeJSON = this.responseText;
      var rescueTimeObj = JSON.parse(rescueTimeJSON);
      // Accessing 8 json elements overall
      var rescueTimePulse = rescueTimeObj[0].productivity_pulse;

      // Getting the first time analysis for yesterday.
      rTvery_productive_percentage = Math.floor(
        rescueTimeObj[0].very_productive_percentage
      );
      rTproductive_percentage = Math.floor(
        rescueTimeObj[0].productive_percentage
      );
      rTneutral_percentage = Math.floor(rescueTimeObj[0].neutral_percentage);
      rTdistracting_percentage = Math.floor(
        rescueTimeObj[0].distracting_percentage
      );
      rTvery_distracting_percentage = Math.floor(
        rescueTimeObj[0].very_distracting_percentage
      );
    }
  };

  request.send();
}

// Load the Visualization API and the core chart package.
google.charts.load("current", {
  packages: ["corechart"]
});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(rescueTimeChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and

function rescueTimeChart() {
  var rescueData2 = new google.visualization.DataTable();
  rescueData2.addColumn("string", "Topping");
  rescueData2.addColumn("number", "Slices");
  // rescueData2.addColumn('number', 'Percentage');

  rescueData2.addRows([
    ["Very Productive", rTvery_productive_percentage],
    ["Productive", rTproductive_percentage],
    ["Neutral", rTneutral_percentage],
    ["Distracting", rTdistracting_percentage],
    ["Very Distracting", rTvery_distracting_percentage]
  ]);
  //  console.log("In drawChart3 google 23 pie chart");
  var rescueTimeOptions = {
    title: "How Much Time I utilize yesterday.",
    height: 400
    // 'width': 600,
  };

  var rescueTimeChart2 = new google.visualization.PieChart(
    document.getElementById("rescueTimeChartPie_div3")
  );
  rescueTimeChart2.draw(rescueData2, rescueTimeOptions);

  //Call the bar Function on load.
  rescueTimeChartBar();
}

function rescueTimeChartBar() {
  var rescueDataBar2 = new google.visualization.DataTable();
  rescueDataBar2.addColumn("string", "Topping");
  rescueDataBar2.addColumn("number", "Percent");
  // rescueData2.addColumn('number', 'Percentage');

  rescueDataBar2.addRows([
    ["Very Productive", rTvery_productive_percentage],
    ["Productive", rTproductive_percentage],
    ["Neutral", rTneutral_percentage],
    ["Distracting", rTdistracting_percentage],
    ["Very Distracting", rTvery_distracting_percentage]
  ]);
  //  console.log("In drawChart3 google 23 bar chart");
  var rescueTimeBarOptions = {
    title: "How Much Time I utilize yesterday.",
    height: 400
    // 'width': 600,
  };

  var rescueTimeChartBar2 = new google.visualization.BarChart(
    document.getElementById("rescueTimeChartBar_div3")
  );
  rescueTimeChartBar2.draw(rescueDataBar2, rescueTimeBarOptions);
}

//  </script>
//  <!-- RescueTime + Google Charts end
// ================================================== -->
