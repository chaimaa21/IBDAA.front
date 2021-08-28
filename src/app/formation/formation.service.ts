import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Formation } from "./formation";


@Injectable({providedIn: 'root'})
export class FormationService{
    public formationApi=environment.formationApi;
    formations:Formation[];
    constructor(public http:HttpClient){}

    form:FormGroup=new FormGroup({
        id:new FormControl(null),
        nom:new FormControl('',Validators.required),
        formateur:new FormControl(0),
        duree:new FormControl('',Validators.required),
        objectifs:new FormControl('',Validators.required),
        prerequis:new FormControl('',Validators.required),
        phase:new FormControl(1),
        date_debut:new FormControl(''),
        date_fin:new FormControl('')

    });

    initializeFormGroup(){
        this.form.setValue({
            id:null,
            nom:'',
            formateur:0,
            duree:'',
            objectifs:'',
            prerequis:'',
            phase:'1',
            date_debut:'',
            date_fin:''
        }); }
        

    public getFormationsList():Observable<Formation[]>{
        return this.http.get<Formation[]>(`${this.formationApi}/all`);
    }
       
    public addFormation(formation: Formation):Observable<Formation> {
        return this.http.post<Formation>(`${this.formationApi}/add`, formation);
      }
    
      public updateFormation(formation: Formation): Observable<Formation> {
        return this.http.put<Formation>(`${this.formationApi}/update`,formation);
      }
    
      public removeFormation(id: number):Observable<Formation> {
        console.log(id); 
        return this.http.delete<Formation>(`${this.formationApi}/delete/${id}`);
      }
    
    }