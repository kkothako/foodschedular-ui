import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { AddFoodComponent } from '../../dialogs/add-food/add-food.component';

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
    height:'auto',
    allDaySlot:false,
    // firstDay:1,
    businessHours: {
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6, 7],
      startTime: '11:00', // 8am
      endTime: '23:00' // 6pm
    },
    views: {
      titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }

    },
    dateClick: this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2021-03-17 18:00:00' },
      { title: 'event 1', date: '2021-03-20 12:00:00' },
      { title: 'event 2', date: '2021-03-21 11:00:00' }
    ],
    eventClick: function (info) {
      alert('Event: ' + info.event.title);
    }
  };
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  constructor(private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {



  }

  addFood(): void {
    this.router.navigate(["food-schedular/dashboard/add-food"]);
  }
  openAddFoodDialog(): void {
    this.dialog.open(AddFoodComponent, {
      width: '500px'
    });
  }
}
