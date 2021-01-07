import {Applicant} from "./applicant";
import {HttpClient} from 'aurelia-http-client';
export class App {

  public data : Applicant = new Applicant();
  public errors : string[] = ["navid", "berad", "reyahne"];
  httpClient : HttpClient ;

  constructor(i18n){
    this.httpClient = new HttpClient();
    
  }

  public reset() {
    this.data= new Applicant();
    
  }

  public submit() {
    this.httpClient.post("https://localhost:5001/Applicant",this.data).then(
      d => console.log(d.response)
    );
    this.httpClient.get("https://localhost:5001/Applicant")
    .then(d => {console.log(d)});
  }
}
