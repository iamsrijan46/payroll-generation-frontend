import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  employees: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/api/employees')
      .subscribe(data => this.employees = data);
  }

  generatePayment(employeeId: number, basePay: number) {
    this.http.post('http://localhost:8080/api/payment', {
      employeeId,
      basePay
    }).subscribe(response => {
      alert('Payment generated successfully!');
    });
  }
}
