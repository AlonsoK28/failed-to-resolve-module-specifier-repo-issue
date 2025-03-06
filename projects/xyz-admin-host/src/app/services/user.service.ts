import { Injectable } from '@angular/core';

interface UserProfileData {
  uid: string;
  email: string;
  displayName:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userProfileData: UserProfileData;

  constructor() { }
}
