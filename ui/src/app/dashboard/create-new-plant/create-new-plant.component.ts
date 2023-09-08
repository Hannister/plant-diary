import { CommonModule, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LightRequirement } from 'src/app/interfaces and enums/light-requirement.enum';
import { Subscription } from 'rxjs';
import { LoadingIconModule } from 'src/app/shared/loading-icon/loading-icon.module';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'create-new-plant',
  templateUrl: './create-new-plant.component.html',
  styleUrls: ['./create-new-plant.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    CommonModule,
    MatIconModule,
    LoadingIconModule,
  ],
})
export class CreateNewPlantComponent implements OnInit {
  submitted = false;

  plantForm: FormGroup = new FormGroup({
    plantName: new FormControl(''),
    plantNickName: new FormControl(''),
    plantFamily: new FormControl(''),
    light: new FormControl(''),
    water: new FormControl(''),
    image: new FormControl(),
  });

  lightRequirement = Object.values(LightRequirement);
  fileName = '';
  uploadSub!: Subscription | null;
  isImage = '';
  uploadedImage!: string;
  uploadedObj!: any;
  errorMsg = '';
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    public dialogRef: MatDialogRef<CreateNewPlantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.plantForm = this.formBuilder.group({
      plantName: ['', [Validators.required, Validators.maxLength(50)]],
      plantNickName: ['', [Validators.maxLength(50)]],
      plantFamily: ['', [Validators.maxLength(50)]],
      light: [this.lightRequirement[0], [Validators.required]],
      water: ['', [Validators.required, Validators.maxLength(50)]],
      image: ['', [Validators.required]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.plantForm.controls;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    console.log(file);
    if (file && file.type.startsWith('image/') && file.size <= 2000000) {
      this.uploadedObj = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
      this.fileName = file.name;
      this.isImage = '';
    } else {
      this.uploadedImage = '';
      this.isImage =
        file.size > 2000000
          ? 'Please upload image size 2MB or lass.'
          : 'Please upload only image files.';
    }
  }

  clearImage() {
    this.fileName = '';
    this.uploadedImage = '';
    this.uploadedObj = null;
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.uploadSub = null;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addPlant(): void {
    if (this.uploadedObj && this.plantForm.valid) {
      this.plantForm.controls['image'] = this.uploadedObj;
      this.addPlantImage().subscribe({
        next: (response: any) => {
          this.plantForm.value.image = response.image.src;
          this.createInDB();
        },
        error: (err) => (this.errorMsg = err),
      });
    } else {
      this.errorMsg = 'Please fill all the fileds';
    }
  }

  addPlantImage() {
    this.isLoading = true;
    this.submitted = true;
    const file: any = this.plantForm.controls['image'];
    const formData = new FormData();
    formData.append('image', file);
    return this.dashboardService.uploadImage(formData);
  }

  createInDB() {
    this.dashboardService.createInDB(this.plantForm.value).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.dashboardService.createInStore(response.plant);
        this.dialogRef.close();
      },
      error: (err) => (this.errorMsg = err),
    });
  }
}
