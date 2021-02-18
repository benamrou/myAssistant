import { Component, Input, EventEmitter, Output, OnInit, ViewEncapsulation, OnChanges } from '@angular/core';
import {NgModule } from '@angular/core';

import * as Survey from "survey-angular";
import * as widgets from "surveyjs-widgets";

import { init as initCustomWidget } from "../create/customwidget";

widgets.icheck(Survey);
widgets.select2(Survey);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey);
widgets.jqueryuidatepicker(Survey);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey);
//widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
// widgets.ckeditor(Survey);
widgets.autocomplete(Survey);
widgets.bootstrapslider(Survey);
widgets.prettycheckbox(Survey);
//widgets.emotionsratings(Survey);
initCustomWidget(Survey);

Survey.JsonObject.metaData.addProperty("questionbase", "popupdescription:text");
Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");

Survey.StylesManager.applyTheme("default");

@Component({
	moduleId: module.id,
    selector: 'survey-page',
    templateUrl: './survey.page.component.html',
    providers: [],
    encapsulation: ViewEncapsulation.None
})
export class SurveyComponent implements OnInit {
  @Output() submitSurvey = new EventEmitter<any>();
  @Input()
  json: object;
  result: any;

  ngOnInit() {
    const surveyModel = new Survey.Model(this.json);
    surveyModel.onAfterRenderQuestion.add((survey, options) => {
      if (!options.question.popupdescription) {
        return;
      }
      // Add a button;
      const btn = document.createElement("button");
      btn.className = "btn btn-info btn-xs";
      btn.innerHTML = "More Info";
      btn.onclick = function () {
        // showDescription(question);
        alert(options.question.popupdescription);
      };
      const header = options.htmlElement.querySelector("h5");
      const span = document.createElement("span");
      span.innerHTML = "  ";
      header.appendChild(span);
      header.appendChild(btn);
    });
    surveyModel.onComplete.add((result, options) => {
      this.submitSurvey.emit(result.data);
      this.result = result.data;
    });
    Survey.SurveyNG.render("surveyElement", { model: surveyModel });
  }
}
