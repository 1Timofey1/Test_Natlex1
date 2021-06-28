import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second-one',
  templateUrl: './second-one.component.html',
  styleUrls: ['./second-one.component.sass']
})
export class SecondOneComponent implements OnInit {
  public is_show: boolean = false
  public last_name: string = ''
  public first_name: string = ''
  public age: number = 0
  public phone: string = ''

  onClick() {
    this.is_show = !this.is_show
  }

  ngOnInit() {
    this.is_show = false
    this.last_name = 'Lukashov'
    this.first_name = 'Timofey'
    this.age = 23
    this.phone = '+7(953)536-85-14'
  }
}
