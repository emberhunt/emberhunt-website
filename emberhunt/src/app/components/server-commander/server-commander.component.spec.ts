import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerCommanderComponent } from './server-commander.component';

describe('ServerCommanderComponent', () => {
  let component: ServerCommanderComponent;
  let fixture: ComponentFixture<ServerCommanderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerCommanderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerCommanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
