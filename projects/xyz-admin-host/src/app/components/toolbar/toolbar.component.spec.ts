import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ToolbarComponent } from './toolbar.component';

// translate
import { TranslateLoader, TranslateModule, TranslatePipe, TranslateService, TranslateStore } from '@ngx-translate/core';

// ng material
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// modules
import { AppLogoModule } from '@components/app-logo/module/app-logo.module';

// mocks
import { MockFirebaseAuth } from '@mocks/mock-auth';
import { MockFirestore } from '@mocks/mock-firestore';

// 3-parrt
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

// firebase
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeAll(() => {
    window.onbeforeunload = () => 'Oh no!';
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [
        MatDialogModule,
        AppLogoModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatChipsModule,
        MatButtonModule,
        TranslateModule.forRoot(),
        FontAwesomeModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
      ],
      providers: [
        TranslatePipe,
        TranslateService,
        TranslateStore,
        TranslateLoader,
        { provide: Auth, useClass: MockFirebaseAuth },
        { provide: Firestore, useClass: MockFirestore },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
