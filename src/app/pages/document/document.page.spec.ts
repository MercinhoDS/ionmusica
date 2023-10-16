import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentPage } from './document.page';

describe('DocumentPage', () => {
  let component: DocumentPage;
  let fixture: ComponentFixture<DocumentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DocumentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
