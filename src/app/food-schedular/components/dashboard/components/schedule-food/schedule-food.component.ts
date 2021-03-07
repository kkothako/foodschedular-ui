import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';

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
      start: 'prevYear,today prev,next,nextYear', // will normally be on the left. if RTL, will be on the right
      center: 'title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    buttonText: {
      today: 'today',
      month: 'month',
      week: 'week',
      day: 'day',
      list: 'list'
    },
    dayHeaders: true,
    navLinks: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    views: {
      titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }

    },
    dateClick: this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2021-03-01 12:00:00' },
      { title: 'event 2', date: '2021-03-06' }
    ],
    eventClick: function (info) {
      alert('Event: ' + info.event.title);
    }
  };
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  constructor(private router: Router) { }

  ngOnInit(): void {



  }

  addFood(): void {
    this.router.navigate(["food-schedular/dashboard/add-food"]);
  }

}
