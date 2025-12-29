import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: 'user',
    loadComponent: () =>
      import('./user/user.component').then(c => c.UserComponent)
  },
  {path :'',   loadComponent: () =>
  import('./user/user.component').then(c => c.UserComponent)
},

];
