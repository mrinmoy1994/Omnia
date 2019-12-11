import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showMsg: string = '';
  showSuccess: string = '';
  Updated: boolean = false;
  divcontent : string;
  selectedId : any;

  selectedElement : any;
  response: any = [];
  response_back: any;
  response_1: any;

  constructor(private homeService: HomeService) {
   this.getAllDetails(0);
   }

  ngOnInit() {   }


  setValue(id : any){
    this.selectedId=id;
    this.selectedElement = this.response[id];
  }

  getAllDetails(id : any) {
    this.selectedId=id;
    this.homeService.getDetails().subscribe(
      response => {
        this.response = response;
        this.response_back = response;
        console.log(this.response);
        this.selectedElement = this.response[id];
      }
    );

    
    return this.response;
  }

  getDetailscheck() {
    this.homeService.getDetails().subscribe(
      response => {
        this.response_1 = response
      }
    );

    return this.response_1;
  }

  updateDetails() {

    this.showMsg = '';
    this.showSuccess = '';

   // var responsedata = this.getAllDetails(this.selectedId);
    // console.log(responsedata.description);
    if (this.selectedElement.Causes === null || this.selectedElement.Causes === '' ) {
      this.showMsg = "Description required !!!";
    }
    // else if(responsedata.description !== this.response_back.description)
    // {
    //   console.log(this.response_1);
    //   console.log(this.response_back);
    //   this.showMsg = "Document has been updated, after loading !!!! Reload the page to get the updated value !!!";
    // }
    else {
      console.log(this.selectedId);
      console.log(this.selectedElement.Causes);
      var data = {
        "Id" : this.selectedId,
        "Causes": this.selectedElement.Causes.toString().split(",")
      };
      console.log(data);
      this.homeService.putDetails(data).subscribe(
        response => {
          console.log(response);
          //this.response = response;
          //this.response_back = response;
          this.getAllDetails(this.selectedId);
          this.showSuccess = 'Updated Successfuly !!';
        }
      );
    }
  }

}
