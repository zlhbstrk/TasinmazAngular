import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Il } from 'src/Models/Il';
import { IlService } from 'src/Services/il.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-il-ekle',
  templateUrl: './il-ekle.component.html',
  styleUrls: ['./il-ekle.component.css'],
})
export class IlEkleComponent implements OnInit {
  constructor(private servis: IlService) {}
  form = new FormGroup({
    Ad: new FormControl('', [Validators.required]),
    Plaka: new FormControl('', [Validators.required])
  });
  model!: Il;
  onSubmit() {
    if (this.form.valid) {
      this.model = this.form.value;
      this.servis.Ekle(this.model).subscribe(data => {
        if (data) {
          Swal.fire({
            title: 'başarı!',
            text: 'Do you want to continue',
            icon: 'success',
            confirmButtonText: 'okk',
          });
        }
      });
    }
    // Swal.fire({
    //   title: 'başarı!',
    //   text: 'Do you want to continue',
    //   icon: 'success',
    //   confirmButtonText: 'okk'
    // }).then(()=>{
    // })
  }
  ngOnInit(): void {}
}
