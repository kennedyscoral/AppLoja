import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CoresPage } from './cores.page';

describe('CoresPage', () => {
  let component: CoresPage;
  let fixture: ComponentFixture<CoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
