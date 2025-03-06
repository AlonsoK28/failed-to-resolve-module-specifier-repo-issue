import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

  /**
   * @deprecated The method should not be used anymore
   */
  referenceDialog: MatDialogRef<any>

  constructor() { }

  /**
   * @deprecated The method should not be used anymore
   */
  closeDialog(){
    this.referenceDialog.close();
  }
}
