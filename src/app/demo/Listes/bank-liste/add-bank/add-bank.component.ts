import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup,} from '@angular/forms';
import { BankService } from '../../../../services/bank.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrl: './add-bank.component.scss',
})
export class AddBankComponent implements OnInit {

  form!: FormGroup;
  codeBank: string = "";
  name : string = "";
  abb: string = "";

  constructor(private bankService: BankService,private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code_Bank: [''],
      full_name: [''],
      name: ['']
    });
  }

  onSubmit(){
    const formdata = this.form.value;
    console.log(formdata);
    this.bankService.addBank(formdata).subscribe(
      response => {
        console.log('bank added successfully:', response);
        this.router.navigate(['/ ']);
      },
      error => {
        console.error('Error adding bank:', error);
      }
    );
  }
}
