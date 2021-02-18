import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { DesignComponent } from './design.component'
import { DesignModule } from './design.module'

describe('DesignComponent', () => {
  let component: DesignComponent
  let fixture: ComponentFixture<DesignComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DesignModule,
        RouterTestingModule,
        BrowserAnimationsModule,
       ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
