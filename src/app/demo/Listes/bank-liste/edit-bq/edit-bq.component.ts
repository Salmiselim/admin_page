import { BankService } from '../../../../services/bank.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-bq',
  templateUrl: './edit-bq.component.html',
  styleUrl: './edit-bq.component.scss'
})
export class EditBqComponent implements OnInit{

  form!: FormGroup;
  constructor(private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder, private BankService: BankService) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      code_Bank: [''],
      full_name: [''],
      name: [''],
})
const codeBankParam = this.route.snapshot.paramMap.get('bank');
console.log(codeBankParam)
if (codeBankParam) {
  const codebq = +codeBankParam;

  this.BankService.getBankById(codeBankParam).subscribe(bank => {
    this.form.patchValue({
      code_Bank: bank.code_Bank,
      full_name: bank.full_name,
      name: bank.name

    })
  })
  }
  }

  onSubmit(){
    if (this.form.valid) {
      const codebq = this.route.snapshot.paramMap.get('bank');
      if (codebq) {
        const codebank = codebq;
        console.log(this.form.value)
        this.BankService.updateBank(codebank, this.form.value).subscribe(() => {

        })
        this.router.navigate(['/banklist']);
        alert("bankk updated !")
      }

    }
  }
}
