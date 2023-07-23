import { render, RenderResult } from '@testing-library/angular';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: RenderResult<AlertComponent>;

  beforeEach(async () => {
    component = await render(AlertComponent);
  });

  it('should create', () => {
    expect(component.fixture.componentInstance).toBeTruthy();
  });
});
