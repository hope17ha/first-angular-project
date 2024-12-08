import { Component, OnInit } from '@angular/core';

import { ErrorMessagesService } from './error-messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-messages',
  standalone: true,
  imports: [],
  templateUrl: './error-messages.component.html',
  styleUrl: './error-messages.component.css',
})
export class ErrorMessagesComponent implements OnInit {
  errorMsg: string | null | undefined = '';
  errorSubscription: Subscription | null = null;
  
  constructor(private errorMessagesService: ErrorMessagesService) {}



  ngOnInit(): void {
    
    this.errorSubscription = this.errorMessagesService.apiError$.subscribe((error: any) => {
      
      this.errorMsg = error
    })
  }
  ngOnDestroy(): void {
    this.errorSubscription?.unsubscribe();
  }
}
