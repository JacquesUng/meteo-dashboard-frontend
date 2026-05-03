import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollectConfigurationDialog } from './create-collect-configuration-dialog';

describe('CreateCollectConfigurationDialog', () => {
  let component: CreateCollectConfigurationDialog;
  let fixture: ComponentFixture<CreateCollectConfigurationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCollectConfigurationDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCollectConfigurationDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
