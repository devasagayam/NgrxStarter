import {Component, inject, OnInit} from "@angular/core";
import * as userActions from '../store/user.actions';
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styles: [``]
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
  }

}
