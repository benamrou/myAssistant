import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService, LabelService } from '../../../../shared/services/index';

@Component({
    selector: 'customer-sidebar',
    templateUrl: './customer.sidebar.component.html',
    styleUrls: ['./customer.sidebar.component.scss']
})
export class SidebarCustomerComponent {
    isActive: boolean = false;
    collapsed: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';

    lbl_workshop_menu       = {id: 'CUST0000000000002', desc: ''};
    lbl_data_load_menu       = {id: 'CUST0000000000003', desc: ''};
    lbl_workshop_execution       = {id: 'CUST0000000000006', desc: ''};
    lbl_detail_design       = {id: 'CUST0000000000007', desc: ''};
	lbl_data_load_network   = {id: 'CUST0000000000008', desc: ''};
	lbl_data_load_hierarchy   = {id: 'CUST0000000000009', desc: ''};
    lbl_batch_menu      = {id: 'CUST0000000000010', desc: ''};
    lbl_batch_design       = {id: 'CUST0000000000011', desc: ''};

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

		this.lbl_workshop_menu.desc = this._labelService.getLabel(this.lbl_workshop_menu.id);
        this.lbl_data_load_menu.desc = this._labelService.getLabel(this.lbl_data_load_menu.id);
        this.lbl_workshop_execution.desc = this._labelService.getLabel(this.lbl_workshop_execution.id);
        this.lbl_detail_design.desc = this._labelService.getLabel(this.lbl_detail_design.id);
        this.lbl_data_load_network.desc = this._labelService.getLabel(this.lbl_data_load_network.id);
        this.lbl_data_load_hierarchy.desc = this._labelService.getLabel(this.lbl_data_load_hierarchy.id);
        this.lbl_batch_menu.desc = this._labelService.getLabel(this.lbl_batch_menu.id);
        this.lbl_batch_design.desc = this._labelService.getLabel(this.lbl_batch_design.id);
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
