import { ConfirmDialog } from './dialogs/ConfirmDialog';
import {inject} from 'aurelia-dependency-injection';
import {bindable} from 'aurelia-framework';
import {Applicant} from "./applicant";
import {HttpClient} from 'aurelia-http-client';
import {ValidationController, ValidationRules } from "aurelia-validation";
import {DialogService} from 'aurelia-dialog';

  @inject(ValidationController, DialogService)
  export class App {
  //static inject = [ValidationController, DialogService];
  public errors : string[] ;//= ["navid", "berad", "reyahne"];
  httpClient : HttpClient ;
  public formIsDeirty : boolean = false;
  @bindable
  public data : Applicant = new Applicant();
  private dlgModel : ConfirmDialog = new ConfirmDialog(); 
  
  private dialogService :DialogService
  constructor(private validationController :ValidationController,
    dialogService: DialogService){
    this.httpClient = new HttpClient();
    this.dialogService = dialogService; 
    this.dlgModel.Header="Confirm";
    this.dlgModel.Body="Do you realy want to reset the form?";
  }

  public reset() {

    
    this.dialogService.open({viewModel : ConfirmDialog, 
      model: this.dlgModel, 
      lock: false }
      ).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('good');
      } else {
        console.log('bad');
      }
    this.data.name = "";
    this.data.family = "";
    this.data.address = "";
    this.data.countryOfOrigin = "";
    this.data.emailAddress = "";
    this.data.hired = false;
    this.data.age = 0;
    
    this.validationController.reset();
      
    }).catch(res => {
      console.log(res);
    });
    
    
  }

  get isFormDirty():boolean{
    return  this.data.name?.length > 0 ||
    this.data.family?.length > 0 ||
    this.data.address?.length > 0 ||
    this.data.countryOfOrigin?.length > 0 ||
    this.data.emailAddress?.length > 0 ||
    this.data.age > 0 ||
    this.data.hired; 
    
   
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
