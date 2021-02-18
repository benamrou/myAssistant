import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService, LogginService, LabelService } from '../../../../shared/services/index';
import { Router } from '@angular/router';
import { SelectItem } from  'primeng/api';


@Component({
    selector: 'customer-header',
    templateUrl: './customer.header.component.html',
    styleUrls: ['./customer.header.component.scss']
})
export class HeaderCustomerComponent implements OnInit {


  @Output() languageSwitched = new EventEmitter();
	// List of environment to access
	public selectedEnvironment: string;
	environments: SelectItem [];
	
	appEnvironment : string ; //= 'Inventory Control Room';
	appForegroundColorEnvironment  : string ; //= 'yellow';
	
	msgEnvironment: string = 'You have been switched to ';
	msgDisplayed: string;
	envTypeConnected: string;

	lbl_titleApplication = {id: 'CUST0000000000001', desc: ''};
	lbl_usersSetting 	 = {id: 'CUST0000000000004', desc: ''};
	lbl_logout 		 	 = {id: 'CUST0000000000005', desc: ''};
	

	displaySwitch: boolean;
	style: any;

	groupedCustomers;
	selectedCustomer;

	constructor( private _logginService: LogginService, public _userService: UserService, 
				 private _labelService: LabelService, private router: Router) { 
		this.environments = [];
        if (!localStorage.getItem('isLoggedin')) {
			this.router.navigate(['/login']);
		}
        if (typeof this._userService.userInfo === 'undefined') {
			this.router.navigate(['/login']);
        }
        if (typeof this._userService.userInfo.envUserAccess === 'undefined') {
			this.router.navigate(['/login']);
        }


		//console.log("this._userService.userInfo: " + JSON.stringify(this._userService.userInfo));
		if (this._userService.userInfo.envUserAccess.length > 0) {
			for (let i = 0; i < this._userService.userInfo.envUserAccess.length; i ++) {
				this.environments.push({label: this._userService.userInfo.envUserAccess[i].shortDescription,
										value: {id: this._userService.userInfo.envUserAccess[i].id, 
												name: this._userService.userInfo.envUserAccess[i].shortDescription} });
				this.envTypeConnected = this._userService.userInfo.envUserAccess[i].type;
			}
		} else {
			for (let i = 0; i < this._userService.userInfo.envCorporateAccess.length; i ++) {
				this.environments.push({label: this._userService.userInfo.envCorporateAccess[i].shortDescription,
										value: {id: this._userService.userInfo.envCorporateAccess[i].id, 
												name: this._userService.userInfo.envCorporateAccess[i].shortDescription} });
			}
		}
		//console.log("HEADER - Environments: " + this.environments.length);

		this.lbl_titleApplication.desc = this._labelService.getLabel(this.lbl_titleApplication.id);
		this.lbl_usersSetting.desc = this._labelService.getLabel(this.lbl_usersSetting.id);
		this.lbl_logout.desc = this._labelService.getLabel(this.lbl_logout.id);

		this.displaySwitch = false;

		this.groupedCustomers = [
            {
                label: 'USA', value: 'us', 
                items: [
                    {label: 'Smart&Final', value: 'SNF'},
                    {label: 'Heinen\'s', value: 'HEI'},
                    {label: 'Longo\'s', value: 'LNG'},
                    {label: 'Spartannash', value: 'SPN'},
					{label: 'Walt Disney\'s World', value: 'DSN'}
                ]
            },
            {
                label: 'Canada', value: 'ca', 
                items: [
                    {label: 'Longo\'s', value: 'LNG'},
                    {label: 'Manitoba Liquor Mart', value: 'MLM'}
                ]
            },
            {
                label: 'France', value: 'fr', 
                items: [
                    {label: 'Carrefour', value: 'CRF'},
                    {label: 'Auchan', value: 'AUC'},
                    {label: 'CASINO', value: 'CAS'}
                ]
            }];
		this.setTopBarDisplay();
	}

    ngOnInit() {}

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        //this._labelService.use(language);
        this.languageSwitched.next(language);
        
        //this._userService.userInfo.language = language;
        //window.location.reload();
    }

	environmentChange(envLabel: string, envType: string) {
		this.msgDisplayed = this.msgEnvironment + ' ' + envLabel + '.';
		// switch User main environment to the selected one.
		
		this.envTypeConnected = envType;
		this._userService.setMainEnvironment(envType);
		//console.log('User env' + JSON.stringify(this._userService.userInfo));
		this.displaySwitch = true;
		this.setTopBarDisplay();
	}

	setTopBarDisplay (){
		//console.log('envTypeInt : ' + this.envTypeConnected);
		let envTypeInt = parseInt(this.envTypeConnected);
		this.appForegroundColorEnvironment = this._userService.userInfo.mainEnvironment[0].titleColor;
		this.appEnvironment = this._userService.userInfo.mainEnvironment[0].title;
		//console.log('Aoo environment : ' + this.appEnvironment );
	}
}
