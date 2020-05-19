import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RoupasPage } from './roupas.page';

describe('RoupasPage', () => {
  let component: RoupasPage;
  let fixture: ComponentFixture<RoupasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoupasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoupasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
