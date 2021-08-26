import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormateurService } from '../formateur.service';
import {MatTableDataSource} from '@angular/material/table';
import { DemoMaterialModule } from 'src/app/material-module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { NotificationService } from '../../shared/notification.service';
import { Formateur } from '../formateur';
import * as _ from 'lodash';
import { remove } from 'lodash';
import { DialogService } from 'src/app/shared/dialog.service';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'formateur-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private notificationService: NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private service: FormateurService) { } 

formateurs:Formateur[];
formateur:Formateur;
  listData: MatTableDataSource<Formateur>;

  displayedColumns: string[] = ['id', 'nom', 'prenom','profil','email','cin','telephone','adresse','actions'];
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  
  ngOnInit() {
    this.reloadData();
  }

reloadData(){
  this.service.getFormateursList().subscribe(
    list => {
      let formateur = list.map(item => {
      this.listData = new MatTableDataSource(list);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
      });
      };
     }) });
}

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CreateComponent,dialogConfig);
    this.service.getFormateursList();
    
    /*this.formateurs.push({
      $id:this.formateur.$id,
      nom:this.formateur.nom,
     prenom:this.formateur.prenom,
      email:this.formateur.email,
      cin:this.formateur.cin,
      telephone:this.formateur.telephone,
      profil:this.formateur.profil,
      adresse:this.formateur.adresse
    })*/
   
  }

  onEdit(formateur:Formateur){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data=formateur;
    this.dialog.open(UpdateComponent,dialogConfig);
  }

  onDelete(id){
    this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer cet enregistrement?')
    .afterClosed().subscribe(data =>{
      this.service.removeFormateur(id).subscribe((res)=>{console.log(res)})
      if(data){
      /*  console.log(data[''])*/
        console.log('deleted')
    this.listData.data.splice(data.id, 1)
    this.listData._updateChangeSubscription()
    this.notificationService.warn('! Deleted successfully')
      }
  })
}
}