import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { TemplateManagerComponent } from './template.manager.component'
import { TemplateManagerModule } from './template.manager.module'

describe('TemplateManagerComponent', () => {
  let component: TemplateManagerComponent
  let fixture: ComponentFixture<TemplateManagerComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TemplateManagerModule,
        RouterTestingModule,
        BrowserAnimationsModule,
       ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateManagerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
