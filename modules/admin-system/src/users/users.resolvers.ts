import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { UsersService } from './users.service'

@Injectable()
export class SystemUserResolver implements Resolve<any> {

  constructor(
    private service: UsersService,
    private route: ActivatedRoute,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.service.getItem(route.params['id'])
  }

}
