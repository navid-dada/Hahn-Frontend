import { inject } from 'aurelia-dependency-injection';
import { bindable } from 'aurelia-framework';
import {Applicant} from "./applicant";
import {HttpClient} from 'aurelia-http-client';
import { ValidationController, ValidationRules } from "aurelia-validation";
@inject(ValidationController)
  export class App {
  public errors : string[] ;//= ["navid", "berad", "reyahne"];
  httpClient : HttpClient ;
  @bindable
  public data : Applicant = new Applicant();
  

  constructor(private validationController :ValidationController){
    this.httpClient = new HttpClient();
    
  }

  public reset() {
    this.data= new Applicant();
    
  }

  public submit() {
    this.validationController.validate().then(v=>
      {
          if (v.valid){
            this.httpClient.post("https://localhost:5001/Applicant",this.data).then(
              d => console.log(d.response)
            );
          }
          else{
            console.log(v.results)
          }
      });
    /*
    this.httpClient.get("https://localhost:5001/Applicant")
    .then(d => {console.log(d)});*/
  }

  public bind(){
    ValidationRules.ensure("name").minLength(5).required()
    .ensure("family").minLength(5).required()
    .ensure("address").minLength(10).required()
    .ensure("countryOfOrigin").required()
    .ensure("age").required().between(19,61)
    .ensure("emailAddress").required().email()
    .on(this.data);
  }
}
