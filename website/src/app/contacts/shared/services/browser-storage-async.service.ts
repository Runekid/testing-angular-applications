import { Injectable } from '@angular/core';
import { IContactPreference } from './preferences.service';

@Injectable()
export class BrowserStorageAsync {

  getItem: (property: string) => Promise<IContactPreference>;
  setItem: (property: string, value: string | object) => void;

}
