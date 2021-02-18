import { DashboardDesignerModule } from './designer.dashboard.module';

describe('DashboardModule', () => {
  let dashboardModule: DashboardDesignerModule;

  beforeEach(() => {
    dashboardModule = new DashboardDesignerModule();
  });

  it('should create an instance', () => {
    expect(dashboardModule).toBeTruthy();
  });
});
