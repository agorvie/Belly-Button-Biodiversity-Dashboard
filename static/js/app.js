// Get the samples.json file from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Create a function to initialize the dashboard and Test Subject Dropdown.
function init() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let id = dropdownMenu.property("value");
    // Load the JSON data from the url
    d3.json(url).then(function (data) {
        let names = data.names;
        let samples = data.samples;
        // Populate the dropdown menu with options
        Object.values(names).forEach(value => {
            dropdownMenu.append("option").text(value);
        });
        // Display demographic information and plots for the initial sample
        demogInfo(names[0]);
        Plots(names[0]);   
    });
}

// Initialize the dashboard
init();

// Display demographic information for a specific sample based on the provided "id".
function demogInfo(id) {
    d3.json(url).then(function (data) {
        let sampleData = data;
        let metadata = sampleData.metadata;
        // Filter the metadata to find the matching sample
        let identifier = metadata.filter(sample =>
            sample.id.toString() === id)[0];
        let panel = d3.select('#sample-metadata');
        panel.html('');
        // Display the demographic information
        Object.entries(identifier).forEach(([key, value]) => {
            panel.append('h6').text(`${key}: ${value}`);
        })
    })
};

// Generate plots for a specific sample based on the provided "id".
function Plots(id) {
    d3.json(url).then(function (data) {
        let sampleData = data;
        let samples = sampleData.samples;
        // Filter the samples to find the matching sample
        let identifier = samples.filter(sample => sample.id === id);
        let filtered = identifier[0];
        let OTUvalues = filtered.sample_values.slice(0, 10).reverse();
        let OTUids = filtered.otu_ids.slice(0, 10).reverse();
        let labels = filtered.otu_labels.slice(0, 10).reverse();
        // Create a bar chart
        let barTrace = {
            x: OTUvalues,
            y: OTUids.map(object => 'OTU ' + object),
            name: labels,
            type: 'bar',
            orientation: 'h'
        };
        let Layout = {
            title: `Top 10 OTUs Found In Test Subject ${id}`,
            xaxis: { title: 'Sample Values' },
            yaxis: { title: 'OTU ID' }
        };
        let barData = [barTrace];
        Plotly.newPlot('bar', barData, Layout);
        
        //Create a bubble chart that displays each sample.
        let bubblechartTrace = {
            x: filtered.otu_ids,
            y: filtered.sample_values,
            mode: 'markers',
            marker: {
                size: filtered.sample_values,
                color: filtered.otu_ids,
                colorscale: 'Earth'
            },
            text: filtered.otu_labels,
        };
        let bubblechartData = [bubblechartTrace];
        let bubblechartLayout = {
            title: `OTUs for Test Subject ${id}`,
            xaxis: { title: 'OTU ID' },
            yaxis: { title: 'Sample Values' }
        };
        Plotly.newPlot('bubble', bubblechartData, bubblechartLayout);
        
        
 // Bonus: // Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.
        
        let metadata = sampleData.metadata; //Retrieve the metadata from the JSON data.
        let gaugeArray = metadata.filter(metaObj => metaObj.id == id); //Filter the metadata to find the object with a matching id.
        let gaugeResult = gaugeArray[0] //Retrieve the first element from the filtered array 
        let wfreqs = gaugeResult.wfreq; //Extract the value for the washing frequency (wfreq) from the matched object.
        console.log(wfreqs) //Output the washing frequency value to the console for verification and testing purposes.
        
        //configure the gauge chart.
        let gaugeData = [
          {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreqs, // Initial value for the washing frequency
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week"},
            type: "indicator",
            mode: "gauge+number",
            gauge: {
              axis: { range: [0, 9] }, // Set the range from 0 to 9
             // Customize the color ranges
              steps: [
                { range: [0, 1], color: "lightgray" }, 
                { range: [1, 2], color: "gray" },
                { range: [2, 3], color: "lightgreen" },
                { range: [3, 4], color: "Purple" },
                { range: [4, 5], color: "lavender" },
                { range: [5, 6], color: "cyan" },
                { range: [6, 7], color: "lightblue" },
                { range: [7, 8], color: "royalblue" },
                { range: [8, 9], color: "blue" }
              ],
              threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.95,
                value: 9 // Set the threshold value
              }
            }
          }
        ];

        var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', gaugeData, gaugeLayout);
            })
        };


//Build new upon ID change
function optionChanged(id) {
    Plots(id);
    demogInfo(id);
};






