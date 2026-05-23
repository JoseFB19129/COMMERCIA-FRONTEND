// src/app/components/company-detail/company-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  company: any = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCompany(id);
    } else {
      this.errorMessage = 'ID de empresa no válido';
      this.isLoading = false;
    }
  }

  loadCompany(id: string): void {
    this.companyService.getCompanyById(id).subscribe({
      next: (data) => {
        this.company = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar empresa', error);
        this.errorMessage = 'No se pudo cargar la información de la empresa';
        this.isLoading = false;
      }
    });
  }
}