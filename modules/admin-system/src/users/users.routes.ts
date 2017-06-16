import { Routes } from '@angular/router'

import { UserListComponent } from './containers/user-list.component'
import { UserDetailComponent } from './containers/user-detail.component'

import { UserAccessTokensComponent } from './components/user-access-tokens.component'
import { UserPasswordComponent } from './components/user-password.component'
import { UserFormComponent } from './components/user-form.component'
import { UserRolesComponent } from './components/user-roles.component'

import { SystemUserResolver } from './users.resolvers'

export const SystemUsersRoutes: Routes = [
  {
    path: 'users',
    data: { title: 'Users' },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: UserListComponent,
        data: { title: 'List' },
      },
      {
        path: 'create',
        component: UserDetailComponent,
        data: { title: 'Create' },
        children: [
          {
            path: '',
            component: UserFormComponent,
          },
        ]
      },
      {
        path: ':id',
        component: UserDetailComponent,
        resolve: {
          systemUser: SystemUserResolver
        },
        data: { title: 'user' },
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          {
            path: 'profile',
            component: UserFormComponent,
            data: { title: 'Profile' },
          },
          {
            path: 'password',
            component: UserPasswordComponent,
            data: { title: 'Password' },
          },
          {
            path: 'access-tokens',
            component: UserAccessTokensComponent,
            data: { title: 'Access Tokens' },
          },
          {
            path: 'roles',
            component: UserRolesComponent,
            data: { title: 'Roles' },
          },
        ]
      },
    ]
  } ]
