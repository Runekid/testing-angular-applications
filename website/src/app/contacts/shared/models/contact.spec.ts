import ContactClass from "./contact";

describe('Contact class tests', () => {
  let contact: ContactClass = null;

  beforeEach(() => {
    contact = new ContactClass();
  });

  it('should have a valid constructor', () => {
    expect(contact).not.toBeNull();
  });

  it('should set name correctly through constructor', () => {
    contact = new ContactClass('Liz');
    expect(contact.name).toEqual('Liz');
  });

  it('should get and set id correctly', () => {
    contact.id = 1;
    expect(contact.id).toEqual(1);
  });

  it('should get and set name correctly', () => {
    contact.name = 'Liz';
    expect(contact.name).toEqual('Liz');
  });

  it('should get and set email correctly', () => {
    contact.email = 'bob@test.com';
    expect(contact.email).toEqual('bob@test.com');
  });

  it('should get and set country correctly', () => {
    contact.country = 'Turkiye';
    expect(contact.country).toEqual('Turkiye');
  });

  it('should get and set favorite correctly', () => {
    contact.favorite = true;
    expect(contact.favorite).toEqual(true);
  });

  it('should get and set number correctly', () => {
    contact.number = '0466377793';
    expect(contact.number).toEqual('0466377793');
  });

  afterEach(() => {
    contact = null;
  });
})
