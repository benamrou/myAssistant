import { DashboardAdminModule } from './admin.dashboard.module';

describe('DashboardModule', () => {
  let dashboardAdminModule: DashboardAdminModule;

  beforeEach(() => {
    dashboardAdminModule = new DashboardAdminModule();
  });

  it('should create an instance', () => {
    expect(dashboardAdminModule).toBeTruthy();
  });
});
