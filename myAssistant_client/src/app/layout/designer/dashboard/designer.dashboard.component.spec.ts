import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { DashboardDesignerComponent } from './designer.dashboard.component'
import { DashboardDesignerModule } from './designer.dashboard.module'

describe('DashboardComponent', () => {
  let component: DashboardDesignerComponent
  let fixture: ComponentFixture<DashboardDesignerComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DashboardDesignerModule,
        RouterTestingModule,
        BrowserAnimationsModule,
       ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDesignerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
