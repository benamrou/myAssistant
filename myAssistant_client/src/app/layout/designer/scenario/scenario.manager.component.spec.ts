import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ScenarioManagerComponent } from './scenario.manager.component'
import { ScenarioManagerModule } from './scenario.manager.module'

describe('ScenarioManagerComponent', () => {
  let component: ScenarioManagerComponent
  let fixture: ComponentFixture<ScenarioManagerComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ScenarioManagerModule,
        RouterTestingModule,
        BrowserAnimationsModule,
       ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioManagerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
