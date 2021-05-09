import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AddressModel } from 'src/app/food-schedular/store/models/user-account.model';
import { UserProfileModel } from 'src/app/food-schedular/store/models/user-profile.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';
import * as userAccountSelectors from './../../../store/selector/user-account.selector';
import * as userAccountActions from './../../../store/action/user-account.action';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit, AfterViewInit {
  userId: string;
  profiles: UserProfileModel[] = [];;
  displayedColumns: string[] = ['nickName', 'name', 'mobile', 'actions'];
  dataSource: MatTableDataSource<UserProfileModel>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('address') address: TemplateRef<any>;
  @ViewChild('confirmDelete') confirmDelete: TemplateRef<any>;

  selectedProfile: UserProfileModel;
  selectedProfileId: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.route.params.subscribe(param => {
      this.userId = param["userId"];
      this.selectedProfileId = param["profileId"];
    });

    this.getProfiles();

  }

  getProfiles(): void {

    this.store.dispatch(userAccountActions.getUserProfiles({ userId: this.userId }));
  }

  redirectToProfile(): void {
    this.router.navigate(["food-schedular/useraccount/profile", this.userId,  this.selectedProfileId]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit(): void {
    this.store.pipe(select(userAccountSelectors.selectUserProfiles))
      .subscribe(response => {
        if (response) {
          this.profiles = response;
          this.dataSource = new MatTableDataSource<UserProfileModel>(response);;
          this.dataSource.sort = this.sort;
        }
      });

  }
  openDiaAddress(userProfile: UserProfileModel) {
    this.selectedProfile = userProfile;

    this.dialog.open(this.address);
  }
  confirmDeleteDialog(profileId: string): void {
    this.selectedProfileId = profileId;
    this.dialog.open(this.confirmDelete);
  }
  deleteProfileById(): void {
    this.store.dispatch(userAccountActions.deleteProfileById({ profileId: this.selectedProfileId }));
  }
}
