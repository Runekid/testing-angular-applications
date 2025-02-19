import { Component } from "@angular/core";
import { ComponentFixture, TestBed, TestModuleMetadata } from "@angular/core/testing";
import { constants } from "./favorite-icon.constants";
import { FavoriteIconDirective } from "./favorite-icon.directive";
import { doClassesMatch, getStarElement } from "../../testing";

@Component({
  template: `
  <i [appFavoriteIcon]="true"></i>
  <i [appFavoriteIcon]="false"></i>
  <i [appFavoriteIcon]="true" [color]="'blue'"></i>
  <i [appFavoriteIcon]="true" [color]="'cat'"></i>
  `
})
class TestComponent {}


describe('Directive: FavoriteIconDirective', () => {
  let fixture: ComponentFixture<any>;
  const expectedSolidStartList = constants.classes.SOLID_STAR_STYLE_LIST;
  const expectedOutlineStarList = constants.classes.OUTLINE_STAR_STYLE_LIST;

  beforeEach(() => {
    const testModuleMetadata: TestModuleMetadata = {
      declarations: [FavoriteIconDirective, TestComponent]
    };
    fixture = TestBed.configureTestingModule(testModuleMetadata).createComponent(TestComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture = null;
  });

  describe('when favorite icon is set to true', () => {
    let starElement = null;

    beforeEach(() => {
      const defaultTrueElementIndex = 0;
      starElement = getStarElement(fixture, defaultTrueElementIndex);
    });

    it('should display a solid gold star after the page loads', () => {
      expect(starElement.style.color).toBe('gold');
      expect(doClassesMatch(starElement.classList, expectedSolidStartList)).toBeTruthy();
    });

    it('should display a solid gold star if the user rolls over the star', () => {
      const event = new Event('mouseenter');
      starElement.dispatchEvent(event);

      expect(starElement.style.color).toBe('gold');
      expect(doClassesMatch(starElement.classList, expectedSolidStartList)).toBeTruthy();
    });

    it('should display a black outline of a start after the user clicks on the star', () => {
      const event = new Event('click');
      starElement.dispatchEvent(event);

      expect(starElement.style.color).toBe('black');
      expect(doClassesMatch(starElement.classList, expectedOutlineStarList)).toBeTruthy();
    });

    afterEach(() => {
      starElement = null;
    });
  });
});
