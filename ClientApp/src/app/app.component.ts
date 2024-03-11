import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private accountService: AccountService) {}
  ngOnInit(): void {
    this.refreshUser();
  }

  private refreshUser() {
    const jwt = this.accountService.getJWT();
    console.log(jwt);
    if (jwt) {
      this.accountService.refreshUser(jwt).subscribe({
        next: _ => {},
        error: (error) => {
          console.log(error);
          this.accountService.logout();
        },
      });
    } else {
      this.accountService.refreshUser(null).subscribe();
    }
  }
}
