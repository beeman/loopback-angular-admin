import { Component, OnInit, OnDestroy } from '@angular/core'
import { UiService, FormService } from '@colmena/admin-ui'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/switchMap'

import { UsersService } from '../users.service'

@Component({
  selector: 'app-user-roles',
  templateUrl: '../templates/user-roles.html',
})
export class UserRolesComponent implements OnInit, OnDestroy {

  public formConfig: any
  public tableConfig: any
  public item: any
  public items: any[]
  public columns = [
    {
      label: 'Role',
      field: 'name',
    },
    {
      label: 'Description',
      field: 'description',
    }
  ]

  private subscriptions: Subscription[] = []

  constructor(
    public service: UsersService,
    public uiService: UiService,
    private formService: FormService,
  ) { }

  ngOnInit() {
    this.refresh()
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }

  refresh() {
    const id = this.service.selectedUser['user'].id
    this.subscriptions.push(
      this.service.getItem(id)
        .subscribe((item) => {
          this.item = item.user
          this.items = item.roles
        }))
  }

  handleAction(event) {
    switch (event.type) {
      case 'addRole':
        return this.service.addUserToRole(
          {
            user: this.item,
            role: event.payload
          },
          (res) => {
            this.refresh()
            this.uiService.toastSuccess('Add Role Success', `<u>${this.item.username}</u> has been successfully added to the <u>${event.payload}</u> role`)
          },
          (err) => this.uiService.toastError('Add Role Fail', err.message)
        )
      case 'removeRole':
        return this.service.removeUserFromRole(
          {
            user: this.item,
            role: event.payload
          },
          (res) => {
            this.refresh()
            this.uiService.toastSuccess('Remove Role Success', `<u>${this.item.username}</u> has been successfully removed from the <u>${event.payload}</u> role`)
          },
          (err) => this.uiService.toastError('Remove Role Fail', err.message)
        )
      default:
        return console.log('Unknown Event Type', event)
    }
  }

}
