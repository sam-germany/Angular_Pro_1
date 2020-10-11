import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {outputPath} from '@angular-devkit/build-angular/src/test-utils';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.componenet.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {}


    ngOnInit() {
    this.userSub = this.authService.user.subscribe( user => {
      this.isAuthenticated = !!user;
    });
    }

  onSaveData() {
      this.dataStorageService.storeRecipes();
    }

    onFetchData() {
      this.dataStorageService.fetchRecipes().subscribe();
    }

  onLogout() {
    this.authService.logout22();
  }

    ngOnDestroy() {
    this.userSub.unsubscribe();
    }
}
