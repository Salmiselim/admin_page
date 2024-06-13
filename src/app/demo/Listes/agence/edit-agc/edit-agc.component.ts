import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgenceService } from '../../../../services/agence.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-agc',
  templateUrl: './edit-agc.component.html',
  styleUrls: ['./edit-agc.component.scss']
})
export class EditAgcComponent implements OnInit {
  form!: FormGroup;

  constructor(private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder, private agenceService: AgenceService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      codeAgence: [''],
      name: [''],
      address: [''],
      bank: this.formBuilder.group({
        code_Bank: [''],
        name: [''],
        full_name: ['']
      })
    });


    const codeAgenceParam = this.route.snapshot.paramMap.get('agence');

    if (codeAgenceParam) {
      const codeAgence = +codeAgenceParam;

      this.agenceService.getAgencyById(codeAgence).subscribe(agency => {
        this.form.patchValue({
          codeAgence: agency.codeAgence,
          name: agency.name,
          address: agency.address,
          bank: {
            code_Bank: agency.bank.code_Bank,
            bank_name: agency.bank.name,
            full_name: agency.bank.full_name
          }
        });
      });
    } else {
    }
}

onSubmit() {
  if (this.form.valid) {
    const codeAgenceParam = this.route.snapshot.paramMap.get('agence');
    console.log(codeAgenceParam)
    if (codeAgenceParam) {
      const codeAgence = +codeAgenceParam;
      console.log(this.form.value)
      this.agenceService.updateAgency(codeAgence, this.form.value).subscribe(() => {

      })
      this.router.navigate(['/agclist']);
      alert("agence updated !")
    }
  }
}
}
