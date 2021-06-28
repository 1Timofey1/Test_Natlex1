import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.sass']
})
export class ChartsComponent implements OnInit {
  // Amount of sensors
  public number_of_sensors: number = 20
  // Min year for rendering chart
  public min_year: number = 2002
  // Max year for rendering chart
  public max_year: number = 2021
  // Chart one data
  public chart_one: any = null
  public chart_one_type: string = 'line'
  public chart_one_data: any = null
  // Chart two data
  public chart_two: any = null
  public chart_two_type: string = 'line'
  public chart_two_data: any = null
  // Chart three data
  public chart_three: any = null
  public chart_three_type: string = 'line'
  public chart_three_data: any = null
  // Chart four data
  public chart_four: any = null
  public chart_four_type: string = 'line'
  // Sensors data
  public temp_dataset: any = null
  public temp_dataset_bar: any = null
  public hum_dataset: any = null
  public hum_dataset_bar: any = null
  public light_dataset: any = null
  public light_dataset_bar: any = null
  // Dates for filters
  public dateFrom: number = 2002
  public dateTo: number = 2021
  // Labels for charts
  public years: any = null

  // Generates an array with random number from 0 to 50
  createRandomData() {
    return Array.from({ length: this.number_of_sensors }, () => Math.floor(Math.random() * 50));
  }

  // Generates a chart by parameters
  createChart(name: string, type: any, data: any, labels: Array<number>) {
    return new Chart(name, {
      type: type,
      data: {
          labels: labels,
          datasets: data
      },
      options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
          legend: {
              display: true,
              position: 'bottom'
          }
      }
      }
    })
  }

  // Updates the chart
  updateChart(name: any, data: any, labels: Array<number>) {
    name.data.labels = labels
    name.data.datasets = data
    name.update()
  }

  // Handle for changing type of chart by radio button
  handleChange(e: any) {
    this.years = []
    let temp_date_temp = []
    let hum_date_temp = []
    let light_date_temp = []
    for(let i = this.dateFrom; i <= this.dateTo; i++) {
      temp_date_temp.push(this.chart_one_data[i - this.min_year])
      hum_date_temp.push(this.chart_two_data[i - this.min_year])
      light_date_temp.push(this.chart_three_data[i - this.min_year])
      this.years.push(i)
    }

    this.temp_dataset.data = temp_date_temp
    this.temp_dataset_bar.data = temp_date_temp
    this.hum_dataset.data = hum_date_temp
    this.hum_dataset_bar.data = hum_date_temp
    this.light_dataset.data = light_date_temp
    this.light_dataset_bar.data = light_date_temp
    
    if (e.target.name == 'chart1_type') {
      this.chart_one_type = e.target.id

      this.chart_one.destroy()
      this.chart_one = this.createChart('chart1', this.chart_one_type, this.chart_one_type == 'line' ? [this.temp_dataset, this.hum_dataset, this.light_dataset] : [this.temp_dataset_bar, this.hum_dataset_bar, this.light_dataset_bar], this.years)
    }
    if (e.target.name == 'chart2_type') {
      this.chart_two_type = e.target.id

      this.chart_two.destroy()
      this.chart_two = this.createChart('chart2', this.chart_two_type, [this.chart_two_type == 'line' ? this.temp_dataset : this.temp_dataset_bar], this.years)
    }
    if (e.target.name == 'chart3_type') {
      this.chart_three_type = e.target.id

      this.chart_three.destroy()
      this.chart_three = this.createChart('chart3', this.chart_three_type, [this.chart_three_type == 'line' ? this.hum_dataset : this.hum_dataset_bar], this.years)
    }
    if (e.target.name == 'chart4_type') {
      this.chart_four_type = e.target.id

      this.chart_four.destroy()
      this.chart_four = this.createChart('chart4', this.chart_four_type, [this.chart_four_type == 'line' ? this.light_dataset : this.light_dataset_bar], this.years)
    }
  }

  // Filter charts by endtering years
  onFiltering(e: any) {
    if (e.target.value && e.target.value.length < 4) return false
    if (e.target.id == 'dateFrom' && e.target.value >= this.min_year) this.dateFrom = e.target.value
    if (e.target.id == 'dateTo' && e.target.value <= this.max_year) this.dateTo = e.target.value

    this.years = []
    let temp_date_temp = []
    let hum_date_temp = []
    let light_date_temp = []
    for(let i = this.dateFrom; i <= this.dateTo; i++) {
      temp_date_temp.push(this.chart_one_data[i - this.min_year])
      hum_date_temp.push(this.chart_two_data[i - this.min_year])
      light_date_temp.push(this.chart_three_data[i - this.min_year])
      this.years.push(i)
    }

    this.temp_dataset.data = temp_date_temp
    this.temp_dataset_bar.data = temp_date_temp
    this.hum_dataset.data = hum_date_temp
    this.hum_dataset_bar.data = hum_date_temp
    this.light_dataset.data = light_date_temp
    this.light_dataset_bar.data = light_date_temp

    if (this.chart_one_type == 'line')
      this.updateChart(this.chart_one, [this.temp_dataset, this.hum_dataset, this.light_dataset], this.years)
    else {
      this.chart_one.destroy()
      this.chart_one = this.createChart('chart1', this.chart_one_type, [this.temp_dataset_bar, this.hum_dataset_bar, this.light_dataset_bar], this.years)
    }

    if (this.chart_two_type == 'line')
      this.updateChart(this.chart_two, [this.temp_dataset], this.years)
    else {
      this.chart_two.destroy()
      this.chart_two = this.createChart('chart2', this.chart_two_type, [this.temp_dataset_bar], this.years)
    }

    if (this.chart_three_type == 'line')
      this.updateChart(this.chart_three, [this.hum_dataset], this.years)
    else {
      this.chart_three.destroy()
      this.chart_three = this.createChart('chart3', this.chart_three_type, [this.hum_dataset_bar], this.years)
    }

    if (this.chart_four_type == 'line')
      this.updateChart(this.chart_four, [this.light_dataset], this.years)
    else {
      this.chart_four.destroy()
      this.chart_four = this.createChart('chart4', this.chart_four_type, [this.light_dataset_bar], this.years)
    }

    return false
  }

  // Init
  ngOnInit() { 
    this.years = []
    for(let i = this.dateFrom; i <= this.dateTo; i++)
      this.years.push(i)

    this.chart_one_data = this.createRandomData()
    this.temp_dataset = {
      label: 'Temperature',
      data: this.chart_one_data,
      borderColor: 'red',
      backgroundColor: 'transparent',
      pointRadius: 5,
      pointBackgroundColor: 'red',
    }
    this.temp_dataset_bar = {
      label: 'Temperature',
      data: this.chart_one_data,
      backgroundColor: 'red'
    }
    
    this.chart_two_data = this.createRandomData()
    this.hum_dataset = {
      label: 'Humidity',
      data: this.chart_two_data,
      borderColor: 'blue',
      backgroundColor: 'transparent',
      pointRadius: 5,
      pointBackgroundColor: 'blue',
    }
    this.hum_dataset_bar = {
      label: 'Humidity',
      data: this.chart_two_data,
      backgroundColor: 'blue'
    }
    
    this.chart_three_data = this.createRandomData()
    this.light_dataset = {
      label: 'Light',
      data: this.chart_three_data,
      borderColor: 'green',
      backgroundColor: 'transparent',
      pointRadius: 5,
      pointBackgroundColor: 'green',
    }
    this.light_dataset_bar = {
      label: 'Light',
      data: this.chart_three_data,
      backgroundColor: 'green'
    }
    
    this.chart_one = this.createChart('chart1', this.chart_one_type, [this.temp_dataset, this.hum_dataset, this.light_dataset], this.years)
    this.chart_two = this.createChart('chart2', this.chart_two_type, [this.temp_dataset], this.years)
    this.chart_three = this.createChart('chart3', this.chart_three_type, [this.hum_dataset], this.years)
    this.chart_four = this.createChart('chart4', this.chart_four_type, [this.light_dataset], this.years)
  }
}
