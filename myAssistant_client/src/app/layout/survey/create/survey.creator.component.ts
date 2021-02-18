import { Component,Input , OnInit, AfterViewInit, Output, ViewEncapsulation, EventEmitter } from "@angular/core";

import * as SurveyKo from "survey-knockout";
import * as SurveyCreator from "survey-creator";
import * as widgets from 'surveyjs-widgets';
import * as Survey from 'survey-angular';

import "survey-knockout/survey.css";
import "survey-creator/survey-creator.css";


@Component({
	moduleId: module.id,
    selector: 'survey-create',
    templateUrl: './survey.create.component.html',
    providers: [],
    styleUrls: ['./survey.create.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SurveyCreateComponent implements OnInit, AfterViewInit {

  @Input() json: any;
  @Output() surveySaved: EventEmitter<Object> = new EventEmitter();

  surveyCreator: SurveyCreator.SurveyCreator;
  saveNo: number= 0;
  options;

  constructor() {}

  ngOnInit() {

    SurveyCreator.StylesManager.applyTheme("stone");

    let options = { showEmbededSurveyTab: false, showJSONEditorTab: false };
    this.surveyCreator = new SurveyCreator.SurveyCreator("surveyCreatorContainer", options);
    
    this.surveyCreator.showToolbox = "right";
    this.surveyCreator.showPropertyGrid = "right";
    this.surveyCreator.rightContainerActiveItem("toolbox");

    this.customProperty(this);
      
    //Automatically save survey definition on changing. Hide "Save" button
    this.surveyCreator.isAutoSave = false;
    //Show state button here
    this.surveyCreator.showState = true;

    //Setting this callback will make visible the "Save" button

    this.surveyCreator.text = this.json;
    
    this.surveyCreator.saveSurveyFunc = this.saveSurvey.bind(this);
    }

    ngAfterViewInit() {
      //Survey.JsonObject.metaData.findProperty('survey', 'Id').isRequired = true;
      //Survey.JsonObject.metaData.findProperty('survey', 'Duration').isRequired = true;
    }

  saveSurvey(sNo, isSuccess) {
        this.saveNo ++;
        sNo = this.saveNo;
        isSuccess = true;
        this.surveySaved.emit(this.surveyCreator.text);
        return isSuccess;

    }

  customProperty (obj) {
      // Add property
      SurveyKo.JsonObject.metaData.addProperty("survey", {name: 'Duration:number', category: 'general'});
      SurveyKo.JsonObject.metaData.addProperty("survey", {name: 'Id:string', category: 'general'});
      
      // Make mandatory info
      Survey.JsonObject.metaData.findProperty('survey', 'title').isRequired = true;
      Survey.JsonObject.metaData.findProperty('survey', 'description').isRequired = true;
    }

}
