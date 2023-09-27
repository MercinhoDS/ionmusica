import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolicesPage } from './polices.page';

describe('PolicesPage', () => {
  let component: PolicesPage;
  let fixture: ComponentFixture<PolicesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PolicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
