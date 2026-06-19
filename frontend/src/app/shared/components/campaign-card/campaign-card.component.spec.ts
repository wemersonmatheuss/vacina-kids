import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CampaignCardComponent } from './campaign-card.component';

describe('CampaignCardComponent', () => {
  let component: CampaignCardComponent;
  let fixture: ComponentFixture<CampaignCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CampaignCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignCardComponent);
    component = fixture.componentInstance;
    component.campaign = {
      id: '1',
      title: 'Test Campaign',
      description: 'Test description',
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-07-31'),
      targetAudience: '6 meses a 5 anos',
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
