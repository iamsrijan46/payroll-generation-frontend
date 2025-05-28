import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // You can add custom styles here if needed
})
export class DashboardComponent implements OnInit {
  // --- Summary Card Data (Dummy Data) ---
  totalWorkingHours = 160;
  totalWorkingDays = 20;
  presentDays = 18;
  absentDays = 1;
  weekendDays = 8;
  holidays = 2;

  // --- Day-wise Summary Table Data (Dummy Data) ---
  dayWiseSummary = [
    { date: '2025-05-01', day: 'Wed', status: 'Holiday', workingHours: 0 },
    { date: '2025-05-02', day: 'Thu', status: 'Present', workingHours: 8 },
    { date: '2025-05-03', day: 'Fri', status: 'Present', workingHours: 8 },
    { date: '2025-05-04', day: 'Sat', status: 'Weekend', workingHours: 0 },
    { date: '2025-05-05', day: 'Sun', status: 'Weekend', workingHours: 0 },
    { date: '2025-05-06', day: 'Mon', status: 'Present', workingHours: 8 },
    { date: '2025-05-07', day: 'Tue', status: 'Absent', workingHours: 0 },
    { date: '2025-05-08', day: 'Wed', status: 'Present', workingHours: 8 },
    { date: '2025-05-09', day: 'Thu', status: 'Present', workingHours: 8 },
    { date: '2025-05-10', day: 'Fri', status: 'Present', workingHours: 8 },
    { date: '2025-05-11', day: 'Sat', status: 'Weekend', workingHours: 0 },
    { date: '2025-05-12', day: 'Sun', status: 'Weekend', workingHours: 0 },
    { date: '2025-05-13', day: 'Mon', status: 'Present', workingHours: 8 },
    { date: '2025-05-14', day: 'Tue', status: 'Present', workingHours: 8 },
    { date: '2025-05-15', day: 'Wed', status: 'Holiday', workingHours: 0 },
    { date: '2025-05-16', day: 'Thu', status: 'Present', workingHours: 6 },
    { date: '2025-05-17', day: 'Fri', status: 'Present', workingHours: 5 },
    { date: '2025-05-18', day: 'Sat', status: 'Weekend', workingHours: 0 },
    { date: '2025-05-19', day: 'Sun', status: 'Weekend', workingHours: 0 },
    { date: '2025-05-20', day: 'Mon', status: 'Present', workingHours: 7.5 },
  ];

  // --- Pie Chart Configuration ---
  public pieChartData: ChartData<'pie'> = {
    labels: ['Present', 'Absent', 'Weekend', 'Holiday'],
    datasets: [
      {
        data: [], // Data will be populated in ngOnInit
        backgroundColor: ['#3B82F6', '#EF4444', '#F59E0B', '#8B5CF6'], // Blue, Red, Amber, Purple
        hoverBackgroundColor: ['#2563EB', '#DC2626', '#D97706', '#7C3AED'],
        borderWidth: 1,
        borderColor: '#ffffff', // White border for slices
      },
    ],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right', // Position legend on the right
        labels: {
          font: {
            size: 14,
            family: 'Inter, sans-serif'
          },
          usePointStyle: true, // Use colored circles instead of squares
          padding: 20 // Padding between legend items
        },
      },
      title: {
        display: true,
        text: 'Attendance Distribution',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Inter, sans-serif'
        },
        color: '#374151' // Dark gray title
      },
      tooltip: { // Enhanced tooltips
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { size: 14, family: 'Inter, sans-serif' },
        bodyFont: { size: 12, family: 'Inter, sans-serif' },
        padding: 10,
        cornerRadius: 6,
        displayColors: true,
      }
    },
  };

  public pieChartType: 'pie' = 'pie';

  // --- Bar Chart Configuration ---
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // No legend needed for single dataset bar chart
      title: {
        display: true,
        text: 'Daily Working Hours',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Inter, sans-serif'
        },
        color: '#374151'
      },
      tooltip: { // Enhanced tooltips
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { size: 14, family: 'Inter, sans-serif' },
        bodyFont: { size: 12, family: 'Inter, sans-serif' },
        padding: 10,
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + ' hrs';
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: { size: 14, family: 'Inter, sans-serif' },
          color: '#4B5563'
        },
        grid: {
          display: false // Hide vertical grid lines
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Working Hours',
          font: { size: 14, family: 'Inter, sans-serif' },
          color: '#4B5563'
        },
        ticks: {
          stepSize: 2 // Example: show ticks every 2 hours
        },
        grid: {
          color: '#E5E7EB' // Light gray horizontal grid lines
        }
      },
    },
  };

  public barChartData: ChartData<'bar'> = {
    labels: [], // Populated in ngOnInit
    datasets: [
      {
        label: 'Working Hours',
        data: [], // Populated in ngOnInit
        backgroundColor: '#3B82F6', // A vibrant blue
        borderColor: '#2563EB',
        borderWidth: 1,
        borderRadius: 5, // Rounded bars
        hoverBackgroundColor: '#2563EB',
      },
    ],
  };

  public barChartType: 'bar' = 'bar';

  ngOnInit() {
    // Populate Pie Chart Data
    this.pieChartData.datasets[0].data = [
      this.presentDays,
      this.absentDays,
      this.weekendDays,
      this.holidays
    ];
    // Trigger chart update
    this.pieChartData = { ...this.pieChartData };

    // Populate Bar Chart Data
    this.barChartData.labels = this.dayWiseSummary.map(day => day.date);
    this.barChartData.datasets[0].data = this.dayWiseSummary.map(day => day.workingHours);
    // Trigger chart update
    this.barChartData = { ...this.barChartData };
  }
}
