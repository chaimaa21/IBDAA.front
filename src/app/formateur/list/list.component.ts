import { Component, OnInit, ViewChild } from '@angular/core';
import { FormateurService } from '../formateur.service';
import { MatTableDataSource } from '@angular/material/table';
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
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'formateur-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private service: FormateurService,
    public authService: AuthService
  ) {}

  formateurs: Formateur[];
  formateur: Formateur;
  listData: MatTableDataSource<Formateur>;
  dataSource = new MatTableDataSource();
  searchKey: string;

  displayedColumns: string[] = [
    'id',
    'nom',
    'prenom',
    'profil',
    'email',
    'cin',
    'telephone',
    'adresse',
    'actions',
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.service.getFormateursList().subscribe((list) => {
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateComponent, dialogConfig);
    this.service.getFormateursList();
  }

  onEdit(formateur: Formateur) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = formateur;
    this.dialog.open(UpdateComponent, dialogConfig);
  }

  onDelete(id) {
    this.dialogService
      .openConfirmDialog('Voulez-vous vraiment supprimer cet enregistrement?')
      .afterClosed()
      .subscribe((data) => {
        this.service.removeFormateur(id).subscribe((res) => {
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
