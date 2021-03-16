import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {

  users$: Observable<User[]> = this.userService.getAll();
  phrase = '';
  columnKey: string = '';


  constructor(private userService: UserService,) {}

  ngOnInit(): void {
  }

  onChangePhrase(event: any): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onColumnSelect(key: string): void {
    this.columnKey = key;    
  }

  onDelete(user: User): void {
    if (!confirm("Biztosan törölni akarod?")) {
      return;
    }
    this.userService.remove(user).subscribe(
      () => location.reload()     
    );  
  }
}