import { TestBed, inject } from '@angular/core/testing';

import { PreferencesService } from './preferences.service';
import { BrowserStorage } from './browser-storage.service';


class BrowserStorageMock {
  getItem = (property: string) => ({key: 'testProp', value: 'testValue'});
  setItem = ({key: key, value: value}) => {};
}


describe('PreferencesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreferencesService, {provide: BrowserStorage, useClass: BrowserStorageMock}]
    });
  });

  it('should be created', inject([PreferencesService], (service: PreferencesService) => {
    expect(service).toBeTruthy();
  }));

  describe('save preferences', () => {
    it('should save a preference', inject([PreferencesService, BrowserStorage], (service: PreferencesService, browserStorage: BrowserStorageMock) => {
      spyOn(browserStorage, 'setItem').and.callThrough();
      service.saveProperty({key: 'myProperty', value: 'myValue'});
      expect(browserStorage.setItem).toHaveBeenCalledWith('myProperty', 'myValue');
    }));

    it('saveProperty should require a non-zero length key', inject([PreferencesService], (service: PreferencesService) => {
      const shouldThrow = () => {
        service.saveProperty({key: '', value: 'foo'})
      };
      expect(shouldThrow).toThrowError();
    }));
  });
});
