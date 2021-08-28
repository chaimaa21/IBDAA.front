import { Component, Inject, OnInit } from '@angular/core';
import { DemoMaterialModule } from 'src/app/material-module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Route } from '@angular/router';
import { Formation } from '../formation';
import { FormationService } from '../formation.service';
import { NotificationService } from '../../shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { FormateurService } from 'src/app/formateur/formateur.service';
import { Formateur } from 'src/app/formateur/formateur';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-formation',
  templateUrl: './create-formation.component.html',
  styleUrls: ['./create-formation.component.css']
})


export class CreateFormationComponent implements OnInit {
  formateurs:Formateur[];
  formateur:Formateur;
  formation: Formation;
  listData: MatTableDataSource<Formation>;
  formations:Formation[];
  campaignOne: FormGroup;
  campaignTwo: FormGroup;

  constructor(public service:FormationService,public formateurService:FormateurService,
    public dialogRef: MatDialogRef<CreateFormationComponent>, private notificationService: NotificationService,@Inject(MAT_DIALOG_DATA) public data: Formation) {
      
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });

    this.campaignTwo = new FormGroup({
      start: new FormControl(new Date(year, month, 15)),
      end: new FormControl(new Date(year, month, 19))
    });
  }
     

  ngOnInit(){this.service.getFormationsList();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      this.service.addFormation(this.service.form.value).subscribe(data => {
        console.log(data)
       /* this.formateurs.push({
          id:this.formateur.id,
          nom:this.formateur.nom,
         prenom:this.formateur.prenom,
          email:this.formateur.email,
          cin:this.formateur.cin,
          telephone:this.formateur.telephone,
          profil:this.formateur.profil,
          adresse:this.formateur.adresse
        })*/
        window.location.reload();
        });
      this.notificationService.success(':: Submitted successfully');
      this.onClose();

    }
  }

  onClose() {
    this.onClear();
    this.dialogRef.close();
  }
  }
