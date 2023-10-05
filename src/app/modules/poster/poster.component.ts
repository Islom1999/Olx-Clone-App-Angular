import { Component, OnInit } from '@angular/core';
import { PosterService } from './service/poster.service';
import { PosterResponse } from 'src/app/interface/poster';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css']
})
export class PosterComponent implements OnInit {
  
  listOfData: any
  posterCategory: any
  visible = false;
  type!: 'create'|'update'
  id!: number | undefined

  validateForm: FormGroup<{
    title: FormControl<string>;
    amount: FormControl<string>;
    descr: FormControl<string>;
    region: FormControl<string>;
    categoryId: FormControl<string>;
  }> = this.fb.group({
    title: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    descr: ['', [Validators.required]],
    region: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
  });

  
  constructor(
    private _posterService: PosterService,
    private fb: NonNullableFormBuilder
  ){
    
  }

  // controls
  open(type:'create'|'update', id?:number): void {
    this.type = type;
    this.visible = true;
    this.id = id ? id : undefined;

    if(this.id){
      this._posterService.getById(this.id).subscribe(
        response => {
          this.validateForm.patchValue(response.data);    
        }
      )
    }

  }

  close(): void {
    this.visible = false;
    this.validateForm.reset();
  }

  ngOnInit(): void {
    this.getAll()
    this.getAllCategory()
  }

  // api methods
  getAll():void {
    this._posterService.getAll().subscribe(
      response => {
        this.listOfData = response.data;        
      }
    );
  }

  getAllCategory():void {
    this._posterService.getAllCategory().subscribe(
      response => {
        this.posterCategory = response.data;        
      }
    );
  }

  // controls form
  delete(id:number | undefined){
    this._posterService.deleteById(id).subscribe(
      response => {
        this.visible = false;   
        this.getAll()
      } 
    )
  }

  submitForm(): void {
    if (this.validateForm.valid) {

      if(this.type == 'create'){
        this._posterService.create(this.validateForm.value).subscribe(
          response => {
            this.visible = false;    
            this.getAll()    
          }
        );
      }
      if(this.type == 'update'){
        this._posterService.update(this.id, this.validateForm.value).subscribe(
          response => {
            this.visible = false;    
            this.getAll()    
          }
        );
      }

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  // onBack(): void {
  //   console.log('onBack');
  // }


  totalDataCount = 100; // Bu qiymat serverdan olinishi mumkin
  currentPage = 1;

  onPageChange(page: number): void {
    this.currentPage = page;
    // Bu yerdan yangi sahifadagi ma'lumotlarni yuklashni amalga oshiring
  }

}
