import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationService } from './authentication.service';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [

  ],
  entryComponents: [

  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService
  ]
})

export class ServiceModule {
}
