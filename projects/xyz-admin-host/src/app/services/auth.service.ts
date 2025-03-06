// firebase
import { 
  Firestore, collection, query, where, getDocs 
} from '@angular/fire/firestore';

// auth
import { 
  Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut 
} from '@angular/fire/auth';

import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth, 
    private firestore: Firestore ) { }

  loginWithEmail(email:string, password:string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUsername():string {
    if (this.auth.currentUser){
      return this.auth.currentUser?.displayName || this.auth.currentUser?.email || 'unknow logged user';
    }else{
      const guestUser = 'guest';
      return guestUser;
    }
  }

  async signInWithGoogleWithRestrictions() {
    try {
      const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
      const user = result.user;

      if (!user || !user.email) {
        throw new Error('User data could not be retrived.');
      }

      const allowedUser = await this.findUserByEmail(user.email);

      if (allowedUser) {
        return user;
      } else {
        await this.logout();
        throw new Error('User not Authorized.');
      }
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<any> {
    const myCollection = 'allowedUsers';
    const usersCollection = collection(this.firestore, myCollection);
    const q = query(usersCollection, where('email', '==', email));
    
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log('No matching documents.');
        return null;
      }

      const userData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      return userData[0]; // Return only first match
    } catch (error) {
      throw error;
    }
  }
}
