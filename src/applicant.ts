import { bindable } from 'aurelia-framework';
export class Applicant{
    @bindable
    public id : number; 
    public name : string; 
    public family : string; 
    public address : string; 
    public countryOfOrigin : string; 
    public emailAddress : string; 
    public age :number; 
    public hired : boolean = false; 

    
}
