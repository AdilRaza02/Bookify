import { render, RenderResult } from '@testing-library/angular';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: RenderResult<HeaderComponent>;

  beforeEach(async () => {
    component = await render(HeaderComponent);
  });

  it('should create', () => {
    expect(component.fixture.componentInstance).toBeTruthy();
  });
});
