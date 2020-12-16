import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { Message, MessageService } from '../shared/components/index';
import { LogginService, UserService, LabelService, StructureService, ScreenService } from '../shared/services/index';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()],
    providers: [MessageService, StructureService, ScreenService]
})
export class LoginComponent implements OnInit {


@ViewChild('versionDiv') divVersion: ElementRef;

	authentification : any = {};
	mess: string = '';

	userInfoGathered: boolean = false;
	environmentGathered: boolean = false;
	parameterGathered: boolean = false;
	labelsGathered: boolean = false;

    canConnect: boolean = false;
	connectionMessage: Message [] = [];

    constructor(public router: Router, private _logginService: LogginService, 
                private _userService: UserService,
                private _messageService: MessageService,) { 
        this.canConnect = false;
        this.authentification.username = '';
        this._messageService.add({severity:'success', summary: 'Success Message', detail:'Order submitted'});
    
    }

    ngOnInit() {}

    onLoggedin() {
        //localStorage.setItem('isLoggedin', 'true');

        if (!this.authentification.password) {
            this.showInvalidCredential();
        }
        else {
            this._logginService.login(this.authentification.username, this.authentification.password) 
                .subscribe( result => {
                    this.canConnect = result;
                    if (this.canConnect) {
                        this.fetchUserConfiguration();
                    }
                    else {
                        this.showInvalidCredential();
                    }
                }
            );
        }
    }

    showInvalidCredential() {
        console.log('Showing issue');
		this.connectionMessage = [];
        this._messageService.add({severity:'error', summary:'Invalid credentials', detail:'Use your GOLD user/password'});
	}

    async fetchUserConfiguration() {
        /**
		 * 1. Load User information to enable menu access and functionnality
		 * 2. Get the corporate environments user can have access
		 * 3. Get Profile and Menu access
		 */

        this.parameterGathered = true;
        this.labelsGathered = true;
        await this._userService.getInfo(localStorage.getItem('myAssistantUser'))
            .subscribe( result => { this.userInfoGathered = true; });        

        await this._userService.getEnvironment(localStorage.getItem('myAssistantUser'))       
            .subscribe( result => { 
                console.log('Environment data gathered');
                this.environmentGathered = true;
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigate(['/dashboard']);
            });

        
    }

    showHideVersion() {
       if(this.divVersion.nativeElement.style.visibility === 'hidden') {
            this.divVersion.nativeElement.style.visibility = 'visible';
        }
        else {
            this.divVersion.nativeElement.style.visibility = 'hidden';
        }
    }
}