import { Component, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UiService } from '@colmena/colmena-angular-ui'

import { PostsService } from './posts.service'

@Component({
  selector: 'app-posts',
  template: `
    <ui-modal-form #form>
      <ui-form [config]="config" [item]="item" (action)="action($event)"></ui-form>
    </ui-modal-form>

    <ui-modal #view title="View Item">
      <pre>{{item | json}}</pre>
    </ui-modal>

    <template #iconTemplate let-item="item">
      <div class="card-block" style="min-height: 200px">
        <h6 style="text-decoration: underline; cursor: pointer;" (click)="action({ action: 'view', item: item })">
          <i class="icon-note"></i> {{item.title}}
        </h6>
        <div class="text-muted" *ngIf="item.created">Date: {{item.created | date: 'short' }}</div>
      </div>
    </template>

    <ui-data-grid #grid (action)="action($event)" [iconTemplate]="iconTemplate" [service]="service"></ui-data-grid>
  `,
})
export class PostsComponent {

  @ViewChild('grid') private grid
  @ViewChild('form') private form
  @ViewChild('view') private view

  public item: any = {}
  public config: any = {}

  save(item): void {
    this.service.upsertItem(
      item,
      (res) => {
        this.uiService.toastSuccess('Post saved', res.name)
        this.close()
        this.refresh()
      },
      err => console.error(err)
    )
  }

  close(): void {
    this.form.hide()
  }

  refresh(): void {
    this.grid.refreshData()
  }

  constructor(
    public service: PostsService,
    public uiService: UiService,
    private route: ActivatedRoute,
  ) {
    this.service.domain = this.route.snapshot.data['domain']
    this.service.domainApi.getFiles(this.service.domain.id)
      .subscribe(files => files.map(file => this.service.files.push({ value: file.id, label: file.name })))
    this.config = {
      icon: this.service.icon,
      showCancel: true,
      fields: this.service.formFields,
    }
  }

  action(event) {
    switch (event.action) {
      case 'edit':
        this.item = Object.assign({}, event.item)
        this.form.title = `Edit: ${this.item.name}`
        this.form.show()
        break
      case 'add':
        this.item = Object.assign({}, { title: null, content: null })
        this.form.title = 'Add Post'
        this.form.show()
        break
      case 'view':
        this.item = event.item
        this.form.title = `${this.item.name}`
        this.view.show()
        break
      case 'cancel':
        this.close()
        break
      case 'save':
        this.save(event.item)
        break
      case 'delete':
        const successCb = () => this.service
          .deleteItem(event.item,
            () => this.refresh(),
            (err) => this.uiService.toastError('Error deleting item', err.message))

        this.uiService.alertQuestion(
          {
            title: 'Are you sure?',
            text: 'The action can not be undone.'
          },
          successCb,
          () => ({})
        )
        break
      default:
        console.log('Unknown event action', event)
        break
    }
  }

}
