import { Component, OnInit } from '@angular/core';
import { Input} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/index';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    
    @Input() doRefresh: boolean;
    collapedSideBar: boolean;

    mode;
    _router;

    constructor(private router: Router, private _userService: UserService) {
        if(!_userService)    {
            this.router.navigate(['/login']);
        }
        this._router = router;
        if (this._router.url.indexOf('design') > -1)     { this.mode =1}
        if (this._router.url.indexOf('customer') > -1)   { this.mode =2}
        if (this._router.url.indexOf('admin') > -1)      { this.mode =3}
    }

    ngOnInit() {
        if (this.router.url === '/') {
            //this.router.navigate(['/dashboard']);
        }
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }

    refresh () {
        this.doRefresh = true;
    }
}


