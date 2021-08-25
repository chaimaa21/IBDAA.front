import { Component, OnInit } from '@angular/core';
import { DemoMaterialModule } from 'src/app/material-module';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { Route } from '@angular/router';
import { FormateurService } from '../formateur.service';
import { Formateur } from '../formateur';
import { NotificationService } from '../../shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  selector: 'create-formateur',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  
  formateur: Formateur;
  listData: MatTableDataSource<Formateur>;
  formateurs:Formateur[];

  constructor(public service:FormateurService,  
    public dialogRef: MatDialogRef<CreateComponent>, private notificationService: NotificationService) { }

  ngOnInit(){this.service.getFormateursList();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      this.service.addFormateur(this.service.form.value).subscribe(data => {
        console.log(data)
        this.formateurs.push({
          $id:this.formateur.$id,
          nom:this.formateur.nom,
         prenom:this.formateur.prenom,
          email:this.formateur.email,
          cin:this.formateur.cin,
          telephone:this.formateur.telephone,
          profil:this.formateur.profil,
          adresse:this.formateur.adresse
        })
        
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
/* this.employeeService
    .createEmployee(this.employee).subscribe(data => {
      console.log(data)
      this.employee = new Employee();
      this.gotoList();
    }, 
    error => console.log(error));*/