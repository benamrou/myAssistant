import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { DashboardCustomerComponent } from './customer.dashboard.component'
import { DashboardCustomerModule } from './customer.dashboard.module'

describe('DashboardComponent', () => {
  let component: DashboardCustomerComponent
  let fixture: ComponentFixture<DashboardCustomerComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DashboardCustomerModule,
        RouterTestingModule,
        BrowserAnimationsModule,
       ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCustomerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
