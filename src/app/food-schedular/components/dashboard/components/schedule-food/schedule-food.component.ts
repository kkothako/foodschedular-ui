import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarApi, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserProfileModel } from 'src/app/food-schedular/store/models/user-profile.model';
import { AppState } from 'src/app/food-schedular/store/state/app.state';
import { AddFoodComponent } from '../../dialogs/add-food/add-food.component';

import * as userAccountActions from './../../../../store/action/user-account.action';
import * as userAccountSelectors from './../../../../store/selector/user-account.selector'
import * as orderActions from './../../../../store/action/order.action';
import * as foodSelectors from './../../../../store/selector/food-shedular.selectors';
import { OrderModel } from 'src/app/food-schedular/store/models/order.model';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ConstantService } from 'src/app/food-schedular/store/service/constant.service';


declare var $: any;

@Component({
  selector: 'app-schedule-food',
  templateUrl: './schedule-food.component.html',
  styleUrls: ['./schedule-food.component.scss']
})
export class ScheduleFoodComponent implements OnInit {
  events: any[];

  options: any;
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    headerToolbar: {
      // start: 'prevYear,today prev,next,nextYear', // will normally be on the left. if RTL, will be on the right
      start: 'prev,next',
      center: 'title',
      // end: 'dayGridMonth,timeGridWeek,timeGridDay'
      end: ''
    },
    buttonText: {
      today: 'today',
      month: 'month',
      week: 'week',
      day: 'day',
      list: 'list'
    },
    dayHeaders: true,
    navLinks: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    slotMinTime: '11:00:00',
    slotMaxTime: '23:00:00',
    height: 'auto',
    allDaySlot: false,
    // slotDuration:'01:00', // 1 Hours
    contentHeight: 800,
    // firstDay:1,
    businessHours: {
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6, 7],
      startTime: '11:00', // 8am
      endTime: '23:00' // 6pm
    },
    views: {
      titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }

    },
    // dateClick: this.handleDateClick.bind(this),
    // events: [
    //   { title: 'event 1', date: '2021-03-17 18:00:00' },
    //   { title: 'event 1', date: '2021-03-20 12:00:00' },
    //   { title: 'event 2', date: '2021-03-21 11:00:00' }
    // ],
    eventClick: function (info) {
      alert('Event: ' + info.event.title);
    }
  };

  userProfiles$: Observable<UserProfileModel[]>;
  userProfileFormGroup: FormGroup;
  userId: string;
  userProfiles: UserProfileModel[] = [];
  hasActionDisapactched = false;
  draftOrdersEvents: any[] = [];
  profileId: string;

  constructor(private router: Router,
    public dialog: MatDialog,
    private store: Store<AppState>,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private constantService: ConstantService) {

  }

  ngOnInit(): void {

    this.userProfileFormGroup = this._formBuilder.group({
      userProfile: [null, Validators.required]
    });

    this.route.params.subscribe(param => {
      this.userId = param["userId"];
      this.profileId = param["profileId"];
      this.bindUserProfiles();
      this.store.dispatch(orderActions.getDraftOrders({ userId: this.userId, profileId: this.profileId }));
    });
  }

  addFood(): void {
    this.router.navigate(["food-schedular/dashboard/add-food"]);
  }
  openAddFoodDialog(scheduleDate = null): void {
    this.dialog.open(AddFoodComponent, {
      width: '500px',
      data: { userId: this.userId,
        profileId: this.userProfileFormGroup.get('userProfile').value.id,
        scheduleDate: scheduleDate
       }
    });
  }

  bindUserProfiles(): void {
    this.userProfiles$ = this.store.pipe(select(userAccountSelectors.selectUserProfiles));
    this.userProfiles$.subscribe(response => {
      if (response && this.userProfileFormGroup.get('userProfile')) {
        this.userProfiles = response;
        const userProfile = response.find(dr => dr.userId === this.userId);
        this.userProfileFormGroup.get('userProfile').setValue(userProfile);
      }
    });
  }

  bindDraftOrders(): void {
    this.store.pipe(select(foodSelectors.selectDraftOrders))
      .subscribe(draftOders => {
        if (draftOders) {
          this.draftOrdersEvents = [];
          draftOders.forEach(order => {
            this.draftOrdersEvents.push({ title: `${order.cuisineName}, ${order.proteinName}`, date: order.scheduledDate })
          });
          this.calendarOptions.eventBackgroundColor = '#ff4081';
          this.calendarOptions.events = this.draftOrdersEvents;
          //this.ch.detectChanges();
        }
      });

  }
  opendialogWithSelectedDate(): void{
    this.calendarOptions.dateClick = (arg)=>{
      const scheduleDate = this.constantService.getFormatedDateWithNoMinutes(arg.date)
      this.openAddFoodDialog(scheduleDate);
    }
  }

  ngAfterViewInit() {
    this.bindDraftOrders();
    this.opendialogWithSelectedDate();
  }

}
