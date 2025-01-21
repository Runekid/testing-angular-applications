import { TestBed, fakeAsync, flushMicrotasks, inject } from '@angular/core/testing';

import { PreferencesAsyncService } from './preferences-async.service';
import { BrowserStorageAsync } from './browser-storage-async.service';

class BrowserStorageAsyncMock {
  getItem = (property: string) => {
    return Promise.resolve({key: 'testProp', value: 'testValue'});
  };
  setItem = ({key: key, value: value}) => Promise.resolve(true);
}


describe('PreferencesAsyncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreferencesAsyncService, {provide: BrowserStorageAsync, useClass: BrowserStorageAsyncMock}]
    });
  });

  it('should be created', inject([PreferencesAsyncService], (service: PreferencesAsyncService) => {
    expect(service).toBeTruthy();
  }));

  it('should get a value', fakeAsync(inject([PreferencesAsyncService,BrowserStorageAsync], (service: PreferencesAsyncService, browserStorage: BrowserStorageAsyncMock) => {
    spyOn(browserStorage, 'getItem').and.callThrough();

    let results, error;

    service.getPropertyAsync('testProp')
    .then(val => results = val)
    .catch(err => error = err);

    flushMicrotasks();

    expect(results.key).toEqual('testProp');
    expect(results.value).toEqual('testValue');
    expect(error).toBeUndefined();
    expect(browserStorage.getItem).toHaveBeenCalledWith('testProp');
  })));

  it('should throw an error if the key is missing', fakeAsync(inject([PreferencesAsyncService], (service: PreferencesAsyncService) => {

    let result, error;

    service.getPropertyAsync('')
    .then(val => result = val)
    .catch(err => error = err);

    flushMicrotasks();

    expect(result).toBeUndefined();
    expect(error).toEqual('getPropertyAsync requires a property name');
  })));
});
