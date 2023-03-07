import {Component,OnInit,ChangeDetectionStrategy} from '@angular/core';
import { flatpickrFactory } from './app.module';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {Subject} from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit{
  title = 'imsakiye';
  locale = 'tr';

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      title: 'Hoşgeldiniz',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: false
    }, {
      start: startOfDay(new Date()),
      title: 'Yeni etkinlik #1',
      color: { ...colors.yellow },
      actions: this.actions,
    },{
      start: subDays(endOfMonth(new Date()), 8),
      title: 'Ramazan 1',
      color: { ...colors.blue },
      allDay: true,
    },{
      start: new Date('2023-03-13'),
      title: 'Etkinlik #1',
      color: { ...colors.yellow },
      actions: this.actions,
    },{
      start: new Date('2023-03-13'),
      title: 'Etkinlik #2',
      color: { ...colors.blue },
      actions: this.actions,
    },{
      start: new Date('2023-04-21'),
      title: 'Ramazan Bayramı',
      color: { ...colors.yellow },
      actions: this.actions,
    }
  ];

  activeDayIsOpen: boolean = true;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
      events.length === 0
    ) {
      this.activeDayIsOpen = false;
    } else {
      this.activeDayIsOpen = true;
    }
    this.viewDate = date;
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
  }
  setView(view: CalendarView) {
    this.view = view;
  }
  ngOnInit() {
    flatpickrFactory()
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
