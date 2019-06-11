import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
  animations: [routerTransition()]
})
export class TripsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
