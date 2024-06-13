import { AgenceService } from '../../../../services/agence.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BankService } from '../../../../services/bank.service';
import { Bank } from '../../../../models/bank';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-agc',
  templateUrl: './add-agc.component.html',
  styleUrls: ['./add-agc.component.scss']

})
export class AddAgcComponent implements OnInit {
  name: string = '';
  address: string = '';
  region: string = '';
  banks: Bank[] = [];
  form!: FormGroup;

  constructor(private bankService: BankService,private router: Router, private formBuilder: FormBuilder, private agenceService: AgenceService) {}

  ngOnInit(): void {
    this.bankService.getBanks().subscribe(banks => {
      this.banks = banks;
    });

    this.form = this.formBuilder.group({
      name: [''],
      address: [''],
      latitude: [''],
      longitude: [''],
      region: [''],
      bank: ['']
    });
  }

  onSubmit() {
    const formData = this.form.value;
    this.agenceService.addAgence(formData).subscribe(
      response => {
        console.log('Agency added successfully:', response);
        this.router.navigate(['/agclist']);
      },
      error => {
        console.error('Error adding agency:', error);
      }
    );
  }
}
