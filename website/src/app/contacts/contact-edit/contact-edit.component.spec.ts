import { DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import {
  Contact, ContactService, FavoriteIconDirective,
  InvalidEmailModalComponent, InvalidPhoneNumberModalComponent
} from
  '../shared';
import { AppMaterialModule } from '../../app.material.module';
import { ContactEditComponent } from './contact-edit.component';
import '../../../material-app-theme.scss';
import { APP_BASE_HREF } from "@angular/common";



describe('ContactEditComponent tests', () => {
  let fixture: ComponentFixture<ContactEditComponent>;
  let component: ContactEditComponent;
  let rootElement: DebugElement;

  const contactServiceStub = {
    contact: {
      id: 1,
      name: 'Janet'
    },

    save: async function( contact: Contact) {
      component.contact = contact;
    },

    getContact: async function() {
      component.contact = this.contact;
      return this.contact;
    },

    updateContact: async function(contact: Contact) {
      component.contact = contact;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactEditComponent, FavoriteIconDirective, InvalidEmailModalComponent, InvalidPhoneNumberModalComponent],
      imports: [AppMaterialModule, FormsModule, NoopAnimationsModule, RouterModule.forRoot([])],
      providers: [{provide: ContactService, useValue: contactServiceStub}, { provide: APP_BASE_HREF, useValue: '/' }]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [InvalidEmailModalComponent, InvalidPhoneNumberModalComponent]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });

  describe('saveContact() tests', () => {
    it('should display contact name after contact set', fakeAsync(() => {
      const contact = {
        id: 1,
        name: 'lorace'
      };

      component.isLoading = false;
      component.saveContact(contact);
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('lorace');
    }));
  });

  describe('loadContact() tests', () => {
    it('should load contact', fakeAsync(() => {
      component.isLoading = false;
      component.loadContact();
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('Janet');
    }));
  });

  describe('updateContact() tests', () => {
    it('should update the contact', fakeAsync(() => {
      const newContact = {
        id: 1,
        name: 'delia',
        email: 'delia@example.com',
        number: '1234567890'
      };

      component.contact = {
        id: 2,
        name: 'rhonda',
        email: 'rhonda@example.com',
        number: '1234567890'
      }
      component.isLoading = false;
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('rhonda');

      component.updateContact(newContact);
      fixture.detectChanges();
      tick(100);
      expect(nameInput.nativeElement.value).toBe('delia');

    }));

    it('should not update the contact if email is invalid', fakeAsync(() => {
      const newContact = {
        id: 1,
        name: 'london',
        email: 'london@example',
        number: '1234567890'
      };

      component.contact = {
        id: 2,
        name: 'chauncey',
        email: 'chauncey@example.com',
        number: '1234567890'
      }
      component.isLoading = false;
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('chauncey');

      component.updateContact(newContact);
      fixture.detectChanges();
      tick(100);
      expect(nameInput.nativeElement.value).toBe('chauncey');

    }));

    it('should not update the contact if phone number is invalid', fakeAsync(() => {
      const newContact = {
        id: 1,
        name: 'london',
        email: 'london@example.com',
        number: '12345678901'
      };

      component.contact = {
        id: 2,
        name: 'chauncey',
        email: 'chauncey@example.com',
        number: '1234567890'
      }
      component.isLoading = false;
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('chauncey');

      component.updateContact(newContact);
      fixture.detectChanges();
      tick(100);
      expect(nameInput.nativeElement.value).toBe('chauncey');

    }));
  });
})
