import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  productData: any;
  constructor(private fromBuilder: FormBuilder, private api: ApiService,
    private dialogRef:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any  ) {}

  modelname = '';
  freshnesslist = ['Brandnew ', ' Second Hand ', ' Refurbrished '];
  productform!: FormGroup;
  action:any;

  ngOnInit(): void {
    this.productform = this.fromBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });
     console.log(this.editData,"editdata")
     if(this.editData){
       this.productform.controls["productName"].setValue(this.editData.productName);
       this.productform.controls["category"].setValue(this.editData.category),
       this.productform.controls["freshness"].setValue(this.editData.freshness),
       this.productform.controls["price"].setValue(this.editData.price),
       this.productform.controls["comment"].setValue(this.editData. comment),
       this.productform.controls["date"].setValue(this.editData.date)
       
     }
     
     this.action=this.editData? "update" : "save";
    
  }
  addProduct() {
    if(!this.editData){
      let obj = {
        productName: this.productform.value.productName,
        category: this.productform.value.category,
        freshness: this.productform.value.freshness,
        price: this.productform.value.price,
        comment: this.productform.value.comment,
        date: this.productform.value.date,
      };
      this.api.postProduct(obj).subscribe((res) => {
        console.log(res, 'data');
      });
      this.dialogRef.close('save')

    }
    else{
      let obj = {
        productName: this.productform.value.productName,
        category: this.productform.value.category,
        freshness: this.productform.value.freshness,
        price: this.productform.value.price,
        comment: this.productform.value.comment,
        date: this.productform.value.date,
      };
      this.updateProduct(this.editData.id,obj);
      this.dialogRef.close('update')
    }
  
  }

  updateProduct(id:any,data:any){
    this.api.updateProduct(id,data).subscribe((res)=>{
      console.log(res,"res")
    });
   
  }

}
