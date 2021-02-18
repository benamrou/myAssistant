import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { DashboardAdminComponent } from './admin.dashboard.component'
import { DashboardAdminModule } from './admin.dashboard.module'

describe('DashboardComponent', () => {
  let component: DashboardAdminComponent
  let fixture: ComponentFixture<DashboardAdminComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DashboardAdminModule,
        RouterTestingModule,
        BrowserAnimationsModule,
       ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAdminComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
