import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageReciveComponent } from './message-recive.component';

describe('MessageReciveComponent', () => {
  let component: MessageReciveComponent;
  let fixture: ComponentFixture<MessageReciveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageReciveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageReciveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
