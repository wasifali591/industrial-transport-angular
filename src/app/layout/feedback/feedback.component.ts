import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  animations: [routerTransition()]
})
export class FeedbackComponent implements OnInit {
  currentRate = 3.75;
  review: string[] = ['Good service', 'Bad experience', 'Not so great not so bad.'];

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
   }

  ngOnInit() {
  }

}
