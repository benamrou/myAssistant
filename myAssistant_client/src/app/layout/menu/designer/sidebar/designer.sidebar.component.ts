import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService, LabelService } from '../../../../shared/services/index';

@Component({
    selector: 'designer-sidebar',
    templateUrl: './designer.sidebar.component.html',
    styleUrls: ['./designer.sidebar.component.scss']
})
export class SidebarDesignerComponent {
    isActive: boolean = false;
    collapsed: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';

	lbl_templateMgr    = {id: 'DESIGN000000000002', desc: ''};
	lbl_wrapQuestion   = {id: 'DESIGN000000000003', desc: ''};

    @Output() collapsedEvent = new EventEmitter<boolean>();
    
    constructor(private translate: TranslateService, public router: Router, public _userService: UserService, private _labelService: LabelService) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

		this.lbl_templateMgr.desc = this._labelService.getLabel(this.lbl_templateMgr.id);
		this.lbl_wrapQuestion.desc = this._labelService.getLabel(this.lbl_wrapQuestion.id);
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

}
