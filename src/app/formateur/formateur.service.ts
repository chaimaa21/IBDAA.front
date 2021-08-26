import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Formateur } from "./formateur";


@Injectable({providedIn: 'root'})
export class FormateurService{
    public formateurApi=environment.formateurApi;
    formateurs:Formateur[];
    constructor(public http:HttpClient){}

    form:FormGroup=new FormGroup({
        id:new FormControl(''),
        nom:new FormControl('',Validators.required),
        prenom:new FormControl('',Validators.required),
        email:new FormControl('',[Validators.email,Validators.required]),
        cin:new FormControl('',Validators.required),
        telephone:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
        adresse:new FormControl('',Validators.required),
        profil:new FormControl('',Validators.required)

    });

    initializeFormGroup(){
        this.form.setValue({
            id:null,
            nom:'',
            prenom:'',
            email:'',
            cin:'',
            telephone:'',
            adresse:'',
            profil:''
        }); }
        

    public getFormateursList():Observable<Formateur[]>{
        return this.http.get<Formateur[]>(`${this.formateurApi}/all`);
    }
       
    public addFormateur(formateur: Formateur): Observable<Formateur> {
        return this.http.post<Formateur>(`${this.formateurApi}/add`, formateur);
      }
    
      public updateFormateur(formateur: Formateur): Observable<Formateur> {
        return this.http.put<Formateur>(`${this.formateurApi}/update`,formateur);
      }
    
      public removeFormateur(id: number):Observable<Formateur> {
        console.log(id); 
        return this.http.delete<Formateur>(`${this.formateurApi}/delete/${id}`);
      }
    
    }