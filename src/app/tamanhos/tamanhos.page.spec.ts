import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TamanhosPage } from './tamanhos.page';

describe('TamanhosPage', () => {
  let component: TamanhosPage;
  let fixture: ComponentFixture<TamanhosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamanhosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TamanhosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
