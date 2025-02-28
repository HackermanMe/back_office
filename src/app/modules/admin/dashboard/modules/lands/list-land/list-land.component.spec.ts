import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLandComponent } from './list-land.component';

describe('ListLandComponent', () => {
  let component: ListLandComponent;
  let fixture: ComponentFixture<ListLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListLandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
