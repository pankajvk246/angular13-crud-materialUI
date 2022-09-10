import { Component,Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['productName','category', 'comment', 'date', 'freshness',
'price','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  title = 'Angular-13Crud-MaterialUi';
  productData: any;

  toggle = false;
  constructor(public dialog: MatDialog,private api:ApiService){
    
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllProducts()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
       width: "30%"
    }).afterClosed().subscribe((val)=>{
     
      console.log(val,"value")
      if(val=='save'){
        this.getAllProducts();

      }
      
      
    });
  }

  getAllProducts(){
    console.log('getAllProducts');
    this.productData=this.api.getProducts().subscribe({
      next: (res)=>{
        this.productData=res;
        console.log(this.productData);
        this.dataSource=new MatTableDataSource(res);
        // console.log(this.dataSource,"datasource");
        this.dataSource.paginator=this.paginator;
        // console.log(this.dataSource.paginator,"paginator");
        this.dataSource.sort=this.sort;
        // console.log(this.dataSource.sort,"sort")
      },
      error: (e)=>{
       // alert("error while fetching the records");
      }
    })

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe((val)=>{
      console.log(val,"value")
      if(val=='update'){
        this.getAllProducts();

      }
    })
  }
  deleteProduct(id:number){
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        alert("deleted ssuccesfully");
        this.getAllProducts();
      },
      error:(e)=>{
        console.log(e,"error")
        alert("there is an error please check console")
      }

    })
  }
}



