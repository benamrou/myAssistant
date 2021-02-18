import { DashboardCustomerModule } from './dashboard.customer.module';

describe('DashboardModule', () => {
  let dashboardModule: DashboardCustomerModule;

  beforeEach(() => {
    dashboardModule = new DashboardCustomerModule();
  });

  it('should create an instance', () => {
    expect(DashboardCustomerModule).toBeTruthy();
  });
});
