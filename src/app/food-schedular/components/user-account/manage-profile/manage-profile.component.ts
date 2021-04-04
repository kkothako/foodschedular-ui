import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AddressModel } from 'src/app/food-schedular/store/models/user-account.model';
import { UserProfileModel } from 'src/app/food-schedular/store/models/user-profile.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';
import * as userAccountSelectors from './../../../store/selector/user-account.selector';
import * as userAccountActions from './../../../store/action/user-account.action';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit {
  userId: string;
  profiles: UserProfileModel[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit(): void {

    this.route.params.subscribe(param => {
      this.userId = param["userId"];
    });

    this.getProfiles();

  }

  getProfiles(): void {

    this.store.dispatch(userAccountActions.getUserProfiles({ userId: this.userId }));

    this.store.pipe(select(userAccountSelectors.selectUserProfiles))
      .subscribe(response => {
        if (response) {
          this.profiles = response;
        }
      });
  }

  redirectToProfile(selectedProfile: UserProfileModel): void {
    this.router.navigate(["food-schedular/useraccount/profile", this.userId]);
  }

}
