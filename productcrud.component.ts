import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productcrud',
  templateUrl: './productcrud.component.html',
  styleUrls: ['./productcrud.component.css']
})
export class ProductcrudComponent {

  ProductArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  product_name: string ="";
  compony_name: string ="";
  price: number=0;
  currentProductID = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.http.get("http://localhost:8088/api/products/")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.ProductArray = resultData.data;
      });
  }

  
  register() {
    let bodyData = {
      "product_name": this.product_name,
      "compony_name": this.compony_name,
      "price": Number(this.price), // Convert to number
    };
    console.log("Sending registration request with data:", bodyData);
    this.http.post("http://localhost:8088/api/products/add", bodyData)
      .subscribe((resultData: any) => {
        console.log("Registration response:", resultData);
        alert("Product Registered Successfully");
        this.getAllProducts();
      });
  }

  setUpdate(data: any) {
    this.product_name = data.product_name;
   this.compony_name= data.compony_name;
   this.price = data.price;
    this.currentProductID = data.product_id;
  }

  UpdateRecords()
  {
    let bodyData = 
    {
      "product_name" : this.product_name,
      "compony" : this.compony_name,
      "price" : this.price
    };
    
    this.http.put("http://localhost:8088/api/products/update"+ "/"+ this.currentProductID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("product Registered Updateddd")
        this.getAllProducts();
      
    });
  }
 
  save()
  {
    if(this.currentProductID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       
  }
  setDelete(data: any)
  {
   this.http.delete("http://localhost:8088/api/products/delete/" + data.product_id)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("product Deletedddd")
        this.getAllProducts();
    });
  }

}
