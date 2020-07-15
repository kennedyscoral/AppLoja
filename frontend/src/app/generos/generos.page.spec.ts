import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerosPage } from './generos.page';

describe('GenerosPage', () => {
  let component: GenerosPage;
  let fixture: ComponentFixture<GenerosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
