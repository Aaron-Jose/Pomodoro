// // Get a value from localStorage
// const myValue = JSON.parse(localStorage.getItem('Pomodoro-Data'));
// times = myValue.map(item => item.time);
// console.log(times);
// const table = document.getElementById('myTable');
// times.forEach(time => {
//   const row = table.insertRow();
//   const cell = row.insertCell();
//   cell.textContent = time;
// }); // Output: 'myValue'
// document.getElementById("data").textContent = myValue

document.addEventListener('DOMContentLoaded', function() {
  // Get the stored data from localStorage
  const storedData = localStorage.getItem('Pomodoro-Data');

  // Check if storedData is null before using it
  if (storedData) {
    const myValue = JSON.parse(storedData);
    const rows = myValue.map(item => [item.date, item.time]);
    const table = document.getElementById('myTable');
    rows.forEach(row => {
      const tr = document.createElement('tr');
      const dateCell = document.createElement('td');
      dateCell.textContent = row[0];
      const timeCell = document.createElement('td');
      const Thours = Math.floor(row[1] / 3600);
      const Tminutes = Math.floor(row[1] / 60) % 60;
      const formattedTotalHours = Thours < 10 ? `0${Thours}` : Thours;
      const formattedTotalMinutes = Tminutes < 10 ? `0${Tminutes}` : Tminutes;
      timeCell.textContent = `${formattedTotalHours}:${formattedTotalMinutes}`;
      tr.appendChild(dateCell);
      tr.appendChild(timeCell);
      table.appendChild(tr);
    });
    // document.getElementById("data").textContent = JSON.stringify(myValue);
  } else {
    console.log('No data stored in localStorage for Pomodoro-Data');
  }
  
  // Get the canvas element where you want to draw the graph
  const canvas = document.getElementById('myChart');

  // Parse the data as JSON
  const data = JSON.parse(storedData);

  // Extract the dates and times from the data
  const dates = data.map(entry => entry.date);
  const times = data.map(entry => parseFloat(entry.time));
  
  const Thours = (times[0] / 3600).toFixed(2);
  console.log(Thours + "h")
  // Create a new Chart object with the canvas element
  // const chart = new Chart(canvas, {
  //   type: 'line',
  //   data: {
  //     labels: dates,
  //     datasets: [{
  //       label: 'Time Studied',
  //       data: times,
  //       borderColor: 'blue',
  //       fill: false
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero: true,
  //           callback: function(value, index, values) {
  //             return (value / 3600).toFixed(2) + 'h';
  //           }
  //         },
  //         scaleLabel: {
  //           display: true,
  //           labelString: 'Time (hours)'
  //         }
  //       }]
  //     }
  //   }
  // });

  // Load the Google Charts library
  google.charts.load('current', {'packages':['corechart']});

  // Set up the chart data
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    // Get the stored data from localStorage
    const storedData = localStorage.getItem('Pomodoro-Data');

    // Parse the data as JSON
    const data = JSON.parse(storedData);

    // Create a new DataTable object
    const dataTable = new google.visualization.DataTable();

    // Define the columns for the DataTable object
    dataTable.addColumn('string', 'Date');
    dataTable.addColumn('number', 'Time');

    // Add the data rows to the DataTable object
    data.forEach(entry => {
      const date = entry.date;
      const time = parseFloat(entry.time) / 3600;
      dataTable.addRow([date, time]);
    });

    // Set chart options
    const options = {
      title: 'Time Studied',
      curveType: 'function',
      legend: { position: 'top' },
      vAxis: { minValue: 0 },
      hAxis: { 
        format: 'MMM dd' 
      }
    };

    // Create a new ChartWrapper object
    const chartWrapper = new google.visualization.ChartWrapper({
      chartType: 'LineChart',
      containerId: 'myChart',
      dataTable: dataTable,
      options: options
    });

    // Draw the chart
    chartWrapper.draw();
  }



});
