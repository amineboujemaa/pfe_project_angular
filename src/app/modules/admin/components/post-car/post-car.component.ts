import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';



@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent {
  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null=null ;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "TOYOTA"];
  listOfType = ["Petrol", "Diesel", "Hybrid", "electric"];
  listOfColor = ["Red", "Blue", "White"];
  listOfTransmission = ["manual", "automatic"];

  constructor(private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router) { }

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    })
  }

  postCar() {
    console.log(this.postCarForm.value);
    this.isSpinning = true;
    const formData: FormData = new FormData();
    formData.append('image', this.selectedFile as Blob);
    formData.append('brand', this.postCarForm.value.brand);
    formData.append('name', this.postCarForm.value.name);
    formData.append('type', this.postCarForm.value.type);
    formData.append('color', this.postCarForm.value.color);
    formData.append('year', this.postCarForm.value.year);
    formData.append('transmission', this.postCarForm.value.transmission);
    formData.append('description', this.postCarForm.value.description);
    formData.append('price', this.postCarForm.value.price);
    formData.forEach(data => { // using forEach array method.
      console.log(data); // logs data here.
    })
    console.log(formData);
    this.adminService.postCar(formData).subscribe((res) => {
      this.isSpinning = false;
      this.message.success("Car Bien Ajouter", { nzDuration: 5000 });
      this.router.navigateByUrl("/admin/dashboard");
      console.log(res);
    },
      (error) => {
        this.isSpinning = false;
        this.message.error("Error posting car", { nzDuration: 5000 });
        console.log(error)
      })
      
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  };

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile!);
  }

}
