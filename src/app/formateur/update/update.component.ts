import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared/notification.service';
import { CreateComponent } from '../create/create.component';
import { Formateur } from '../formateur';
import { FormateurService } from '../formateur.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  formateur: Formateur;
  editedFormateur:Formateur;
  listData: MatTableDataSource<Formateur>;
  formateurs:Formateur[];

  constructor(public service:FormateurService,
    public dialogRef: MatDialogRef<CreateComponent>, private notificationService: NotificationService,@Inject(MAT_DIALOG_DATA) public data: Formateur ){ this.editedFormateur=this.data
    }
  ngOnInit(){this.service.getFormateursList();
  
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      console.log(this.service.form.value)
     this.service.updateFormateur(this.service.form.value).subscribe(data => {
        console.log(data)
      /* this.formateurs.update({
          $id:this.formateur.$id,
          nom:this.formateur.nom,
         prenom:this.formateur.prenom,
          email:this.formateur.email,
          cin:this.formateur.cin,
          telephone:this.formateur.telephone,
          profil:this.formateur.profil,
          adresse:this.formateur.adresse
        })*/
        
        });
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
      window.location.reload();
    }
  }

  onClose() {
   /* this.onClear();*/
    this.dialogRef.close();
  }
  }



