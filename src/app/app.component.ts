import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Observable example';
  userActivated:boolean = false;
  activateSubscription!: Subscription;
  constructor(private userService:UserService){}
  ngOnInit(): void {
    //this.userService.activatedEmiter.emit(this.userActivated)
    this.activateSubscription = this.userService.activatedEmiter.subscribe(
      (u:boolean) => {
        this.userActivated = u
      }
    )
  }
  ngOnDestroy(): void {
    this.activateSubscription.unsubscribe();
  }

}
