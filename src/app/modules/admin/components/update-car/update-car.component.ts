import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent {
 
  isSpinning = false;
  carId: number = this.activatedRoute.snapshot.params["id"];
  imgChanged: boolean =false;
  selectedFile:any;
  imagePreview:String | ArrayBuffer | null | undefined ;
  existingImage: string | null = null;
  updateForm! : FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "TOYOTA"];
  listOfType = ["Petrol", "Diesel", "Hybrid", "electric"];
  listOfColor = ["Red", "Blue", "White"];
  listOfTransmission = ["manual", "automatic"];
 
 
  constructor(private adminService : AdminService,
    private activatedRoute: ActivatedRoute,
    private fb : FormBuilder,
    private router:Router,
    private message : NzMessageService ) { }

  ngOnInit(){
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      transmission: [null, Validators.required],
      color: [null, Validators.required],
      year: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required]
    })
    this.getCarById();
  }

  getCarById(){
    this.isSpinning = true;
    this.adminService.getCarById(this.carId).subscribe((res) => {
      this.isSpinning = false;
      const carDto = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
      this.updateForm.patchValue(carDto);
    })
  }
  updateCar(){
    console.log(this.updateForm.value);
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if(this.imgChanged && this.selectedFile){
      formData.append('image',this.selectedFile);
    }
    formData.append('image', this.selectedFile as Blob);
    formData.append('brand', this.updateForm.value.brand);
    formData.append('name', this.updateForm.value.name);
    formData.append('type', this.updateForm.value.type);
    formData.append('color', this.updateForm.value.color); 
    formData.append('year', this.updateForm.value.year);
    formData.append('transmission', this.updateForm.value.transmission);
    formData.append('description', this.updateForm.value.description);
    formData.append('price', this.updateForm.value.price);
    formData.forEach(data => { 
      console.log(data); 
    })
    console.log(formData);
    this.adminService.updateCar(this.carId,formData).subscribe((res) => {
      this.isSpinning = false;
      this.message.success("Car Bien modifier", { nzDuration: 5000 });
      this.router.navigateByUrl("/admin/dashboard");
      console.log(res);
    },
      (error) => {
        this.isSpinning = false;
        this.message.error("Error updating car", { nzDuration: 5000 });
        console.log(error)
      })
  }

  onFileSelected(event : any){
    this.selectedFile = event.target.files[0];
    this.imgChanged = true;
    this.existingImage = null;
    this.previewImage();
  }
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile!);
  }

}
