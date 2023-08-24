# Belly Button Biodiversity Dashboard Challenge
This repository contains an interactive dashboard for exploring the Belly Button Biodiversity dataset. It is part of my coursework for the Washignton University Data Analytics BootCamp. The dataset catalogs the microbes that colonize human navels, specifically focusing on operational taxonomic units (OTUs) present in individuals' belly buttons.

## Deployment
The static page deployment can be found here:
https://agorvie.github.io/belly-button-challenge/

## Background
The Belly Button Biodiversity dataset reveals that a few microbial species are commonly present in more than 70% of people, while the rest are relatively rare. The goal of this project is to build an interactive dashboard that visualizes and explores this dataset.

#### Steps Taken:
To successfully complete the Challenge and build the interactive dashboard, I followed these steps:

#### Read Data with D3:
I utilized the D3 library to read the data from the provided URL: https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

#### Create Horizontal Bar Chart:
I built a horizontal bar chart that features a dropdown menu, showcasing the top 10 OTUs found in an individual. The chart utilizes sample_values as values for the bars, otu_ids as labels, and otu_labels for hover text.

#### Create Bubble Chart:
I designed a bubble chart to effectively display each sample. This chart utilizes otu_ids for the x values, sample_values for the y values, sample_values for marker size, otu_ids for marker colors, and otu_labels for text values.

#### Display Sample Metadata:
Demographic information for an individual is displayed through the presentation of each key-value pair from the metadata JSON object on the page.

#### Update Plots:
I ensured that all plots dynamically update as new samples are selected from the dropdown menu.

#### Layout and Customization:
The layout of my dashboard was customized to my preference, allowing me to create a visually appealing and functional design. I referred to the example dashboard provided for inspiration.

Additionally, I had the option to take on an advanced challenge:

#### Advanced Challenge (Optional):
I successfully adapted the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to visualize the weekly washing frequency of an individual. This task required me to modify the gauge code to accommodate values ranging from 0 through 9, and ensuring seamless chart updates whenever a new sample was selected.

### References
Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/Links to an external site.

