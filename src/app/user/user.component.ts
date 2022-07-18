import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, map, Observable, Subscription } from 'rxjs';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  id!: number;
  subscription!:Subscription;
  userActivated!:boolean;
  constructor(private route: ActivatedRoute,
    private userService:UserService) { }

  ngOnInit(): void {
    ///////////////////// -Toggle- ///////////////////
    // this.userService.activatedEmiter.subscribe(
    //   (u:boolean) => {
    //     this.userActivated = u
    //   }
    // )
    ////////////////////////////////////////////////
    // interval(1000).subscribe((count) =>{
    //   console.log(count)
    // })
    // this.subscription = interval(1000).subscribe((count)=>{
    //   console.log(count)
    // })
    const customInterval = new Observable(function subscribe(observer) {
      let count = 0;
      setInterval(()=>{
        observer.next(count);
        if (count === 2){ observer.complete(); }
        if(count > 3){
          observer.error(new Error("Counter is greater than 3 !"))
        }
        count++;
      },1000)
    })
    const customIntervalWithPipe = customInterval.pipe(map((data) => {
      return 'Round :'+ (Number(data) + 1);
    }));
    this.subscription = customIntervalWithPipe.subscribe( {
      next: (data) => { console.log(data); },
      error: (error) => { console.log(error);
      alert(error.message);
    },
    complete: () => {console.log("Completed!");}
      //แบบเก่า
    //   data => {
    //   console.log(data);
    // },error => {
    //   console.log(error);
    //   alert(error.message);
    });
    // this.route.params.subscribe( (params: Params) => {
    //     this.id =+params['id'];
    //   }
    // )
  }
  onActivate(){
    // this.userActivated = !this.userActivated
    // this.userService.activatedEmiter.emit(this.userActivated)
    this.userService.activatedEmiter.next(true)
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
