import { Injectable } from '@angular/core';

@Injectable()
export class BrowserStorage {

  getItem: (property: string) => string | object;
  setItem: (property: string, value: string | object) => void;

}
