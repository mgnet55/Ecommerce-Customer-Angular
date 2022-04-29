import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Mange Account')
    
   }

  ngOnInit(): void {
  }

}
