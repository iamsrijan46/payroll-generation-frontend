import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  totalWorkingHours = 160;
  totalWorkingDays = 20;
  presentDays = 18;
  absentDays = 1;
  weekendDays = 8;
  holidays = 2;

  dayWiseSummary = [
    { date: '2025-05-01', day: 'Thu', status: 'Holiday', workingHours: 0 },
    { date: '2025-05-02', day: 'Fri', status: 'Present', workingHours: 8 },
    { date: '2025-05-03', day: 'Sat', status: 'Weekend', workingHours: 0 },
    { date: '2025-05-04', day: 'Sun', status: 'Weekend', workingHours: 0 },
    { date: '2025-05-05', day: 'Mon', status: 'Present', workingHours: 8 },
    { date: '2025-05-06', day: 'Tue', status: 'Absent', workingHours: 0 },
    { date: '2025-05-07', day: 'Wed', status: 'Present', workingHours: 8 },
  ];

  // Pie Chart
  pieChartData: ChartData<'pie'> = {
    labels: ['Present', 'Absent', 'Weekend', 'Holiday'],
    datasets: [
      {
        data: [this.presentDays, this.absentDays, this.weekendDays, this.holidays],
        backgroundColor: ['#4f46e5', '#dc2626', '#eab308', '#8b5cf6'],
        hoverBackgroundColor: ['#4338ca', '#b91c1c', '#ca8a04', '#7c3aed'],
      },
    ],
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  // Bar Chart for working hours
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Working Hours',
        },
      },
    },
  };

  barChartData: ChartData<'bar'> = {
    labels: this.dayWiseSummary.map(day => day.date),
    datasets: [
      {
        label: 'Working Hours',
        data: this.dayWiseSummary.map(day => day.workingHours),
        backgroundColor: '#4f46e5',
      },
    ],
  };

  barChartType: 'bar' = 'bar'; // literal type instead of union type
}
