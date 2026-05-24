import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  loading = true;

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.companyService.getAllCompanies().subscribe({
      next: (data) => {
        this.companies = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}