import { Component, OnInit, ViewChild } from '@angular/core';
import { FormationService } from '../formation.service';
import { MatTableDataSource } from '@angular/material/table';
import { DemoMaterialModule } from 'src/app/material-module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateFormationComponent } from '../create-formation/create-formation.component';
import { NotificationService } from '../../shared/notification.service';
import { Formation } from '../formation';
import * as _ from 'lodash';
import { remove } from 'lodash';
import { DialogService } from 'src/app/shared/dialog.service';
import { UpdateFormationComponent } from '../update-formation/update-formation.component';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'list-formation',
  templateUrl: './list-formation.component.html',
  styleUrls: ['./list-formation.component.css'],
})
export class ListFormationComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private service: FormationService,
    public authService: AuthService
  ) {}

  formations: Formation[];
  formateur: Formation;
  listData: MatTableDataSource<Formation>;
  searchKey: string;

  displayedColumns: string[] = [
    'id',
    'nom',
    'formateur',
    'prerequis',
    'objectifs',
    'phase',
    'duree',
    'date_debut',
    'date_fin',
    'actions',
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.service.getFormationsList().subscribe((list) => {
      let formateur = list.map((item) => {
        this.listData = new MatTableDataSource(list);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some((ele) => {
            return (
              ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1
            );
          });
        };
      });
    });
  }

  /*onSearchClear(event:Event) {
    this.searchKey = "";
    this.applyFilter(event);
  }*/

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateFormationComponent, dialogConfig);
    this.service.getFormationsList();
  }

  onEdit(formation: Formation) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = formation;
    this.dialog.open(UpdateFormationComponent, dialogConfig);
  }

  onDelete(id) {
    this.dialogService
      .openConfirmDialog('Voulez-vous vraiment supprimer cet enregistrement?')
      .afterClosed()
      .subscribe((data) => {
        this.service.removeFormation(id).subscribe((res) => {
          console.log(res);
        });
        if (data) {
          console.log('deleted');
          this.listData.data.splice(data.id, 1);
          this.listData._updateChangeSubscription();
          this.notificationService.warn('! Deleted successfully');
        }
      });
  }
}
