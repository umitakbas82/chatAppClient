import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage("accestoken")){
    return true
  }
  return true;
};
