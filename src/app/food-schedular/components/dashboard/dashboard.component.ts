import { Component, OnInit } from '@angular/core';
import { DistanceModel } from '../../store/models/distance.model';
import { ReviewOrderService } from '../../store/service/review-order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private reviewOrderService: ReviewOrderService) { }

  ngOnInit(): void {

    var d = <DistanceModel>{
      lat1: "40.256230",
      lat2: "40.328228",
      lng1: "-74.758480",
      lng2: "-74.795630"

    };
    debugger
    //var distance = this.distanceSearchService.getDistanceBy(d);
  }

}
