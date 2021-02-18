import { Injectable} from '@angular/core';
import { Response } from '@angular/http';
import {Router} from '@angular/router';
import {HttpService} from '../request/html.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';


export class User {
   public userNameDisplay: string;
   public username: string;
   public corporate: string;
   public password: string;
   public authentificationMethod: string;
   public language: string;
   public profile: string;
   public application: string;
   public firstname: string;
   public lastname: string;
   public email: string;
   public mobile: string;
   public team: string;
   public status: string;
   public createdOn: string;
   public updatedOn: string;
   public lastUserUpdate: string;
   public type: string;
   public default: number;

   public envCorporateAccess: Environment[] = [];
   public envUserAccess: Environment[] = [];
   public mainEnvironment: Environment[] = []; // Can be multiple such as GOLD CEMTRAL and GOLD STOCK , main is by env type
   public sid: String [] = [];
   public envDefaultLanguage: string;

   /********************************************************/
   /* Data Storage to refrain regular search - Static Info */
   /********************************************************/
   public screenInfo;
}
export class Environment {
   public level: string; 
   public id: string;
   public code: string;
   public type: string;
   public status: string;
   public dbType: string;
   public shortDescription: string;
   public longDescription: string;
   public ipAddress: string;
   public portNumber: string;
   public connectionID: string;
   public connectionPassword: string;
   public databaseSourceSID: string;
   public dbLink: string;
   public default: number;
   public defaultLanguage: string;
   public GOLDversion: string;
   public initSH: string;
   public titleColor: string;
   public title: string;
   public picture: string;
}

@Injectable()
export class UserService {

  public userInfo : User;

  /** Gathered data @login */
  public network; // Whole network location
  public networkTree; // Whole network location as TreeData
  public structure; // Whole merchandise structure
  public structureTree; // Whole merchandise structure as TreeData

  private baseUserUrl: string = '/api/user/';
  private baseEnvironmentUrl: string = '/api/environment/';
  
  private request: string;
  private params: HttpParams;
  private options: HttpHeaders;

  constructor(private http:HttpService, private router:Router) { 
  }

    /**
     * This function retrieves the User information.
     * @method getUserInfo
     * @param username 
     * @returns JSON User information object
     */
  getInfo (username: string) {
        //console.log('***** getInfo - User -  ****');
        this.userInfo = new User();
        this.request = this.baseUserUrl;
        this.params= new HttpParams();
        this.params =  this.params.set('USER_NAME', username);
        //this.options = new HttpParams().set('search',this.params); // Create a request option
    
        return this.http.get(this.request, this.params)
            .map((response: Response) => {
                let data = response as any;
                this.userInfo.username = data[0].ARCHID; // @ts-ignore
                this.userInfo.corporate = data[0].ARCHCUST; // @ts-ignore
                this.userInfo.password = data[0].ARCHPASS;
                this.userInfo.authentificationMethod = data[0].ARCHAUTH; // @ts-ignore
                this.userInfo.language = data[0].ARCHLANG; 
                this.userInfo.profile = data[0].ARCHPROF;
                this.userInfo.application = data[0].ARCHAPPLI;
                this.userInfo.firstname = data[0].ARCHFNAME;
                this.userInfo.lastname = data[0].ARCHLNAME;
                this.userInfo.email = data[0].ARCHEMAIL;
                this.userInfo.mobile = data[0].ARCHMOBILE;
                this.userInfo.team = data[0].ARCHTEAM;
                this.userInfo.status = data[0].ARCHACTIVE;
                this.userInfo.createdOn = data[0].ARCHDCRE;
                this.userInfo.updatedOn = data[0].ARCHDMAJ;
                this.userInfo.lastUserUpdate = data[0].ARCHUTIL;
                this.userInfo.type = data[0].ARCHTYPE;
                this.userInfo.default = data[0].ARCHDEF;

                //console.log ('data[0] : ' + JSON.stringify(data[0]));
                //console.log ('USERLNAME : ' + data[0].ARCHLNAME);
                this.userInfo.userNameDisplay = this.userInfo.firstname + ' ' + this.userInfo.lastname.substring(0,1) + '.';
                return this.userInfo;
            });
  }


    /**
     * This function retrieves the User Environment access information.
     * @method getUserInfo
     * @param username 
     * @returns JSON User Environment information object
     */
    getEnvironment(username: string) {
        //console.log('***** getEnvironment - User -  ****');
        // Reinitialize data
        this.userInfo.mainEnvironment =  [];
        this.userInfo.envUserAccess = [];
        this.userInfo.sid = [];

        this.request = this.baseEnvironmentUrl;
        this.params= new HttpParams();
        this.params =  this.params.set('USER_NAME', username);
        //this.options = new RequestOptions({ search : this.paramsEnvironment }); // Create a request option

       return this.http.get(this.request, this.params).map((response: Response) => {
                let data = response as any;
                //console.log('Environment: ' + data.length + ' => ' + JSON.stringify(data));
                this.userInfo.sid = [];
                for(let i=0; i < data.length; i ++) {
                    // Parse the environment and add them to the User Card
                    //console.log('Environment: ' + JSON.stringify(data[i]));

                    let env = new Environment();
                    env.level = data[i].LEVEL;
                    env.id = data[i].ENVID;
                    env.code = data[i].ENVCODE;
                    env.type = data[i].ENVTYPE;
                    env.status = data[i].ENVACTIVE;
                    env.shortDescription = data[i].ENVSDESC;
                    env.longDescription = data[i].ENVLDESC;
                    env.dbType = data[i].ENVDBTYPE;
                    env.ipAddress = data[i].ENVIP;
                    env.portNumber = data[i].ENVPORT;
                    env.connectionID = data[i].ENVUSER;
                    env.connectionPassword = data[i].ENVPASSWORD;
                    env.databaseSourceSID = data[i].ENVSOURCE;
                    env.dbLink = data[i].ENVDBLINK;
                    env.GOLDversion = data[i].ENVVERSION;
                    env.default = data[i].ENVDEFAULT;
                    env.defaultLanguage = data[i].ENVDEFLANG;
                    env.initSH = data[i].ENVVARINITSH;
                    env.titleColor = data[i].ENVTITLECOLOR;
                    env.title = data[i].ENVTITLE;
                    env.picture = data[i].CUSTPIC;

                    this.userInfo.envDefaultLanguage = env.defaultLanguage;
                
                    if (env.level === 'USER') { this.userInfo.envUserAccess.push(env); }
                    if (env.level === 'CORPORATE') { this.userInfo.envCorporateAccess.push(env); }

                    if (env.default === 1) {
                        if ((env.level === 'USER') || 
                            (env.level === 'CORPORATE' && this.userInfo.mainEnvironment.length === 0)) {
                           //console.log('MAIN ' + JSON.stringify(env));

                            localStorage.setItem('ENV_IP',env.ipAddress);
                            localStorage.setItem('ENV_ID',env.connectionID);
                            localStorage.setItem('ENV_PASS',env.connectionPassword);
                            this.userInfo.mainEnvironment.push(env);
                            this.userInfo.envDefaultLanguage = env.defaultLanguage;
                            if ( ! this.userInfo.sid.includes(env.dbLink)) {
                                this.userInfo.sid.push(env.dbLink);
                            }
                        } 
                    }

                }
                localStorage.setItem('myAssistantSID', this.userInfo.sid[0].toString());
                localStorage.setItem('myAssistantLanguage', this.userInfo.envDefaultLanguage);
                
                //console.log('Env: ' + JSON.stringify (this.userInfo));
        });
    }

    
    /**
     * This function is switching the User Main environment based on the environment type
     * @method setMainEnvironmentUsingType
     * @param envID envrionment type  
     */
    setMainEnvironment(envID: string) {
        this.userInfo.mainEnvironment = [];
        this.userInfo.sid = [];

        // Two information - 
        // INFO 1 - Redefine the main environment using the type
        // INFO 2 - Redefine the SIDs environment using the type
        if (this.userInfo.envUserAccess.length > 0) {
            for (let i = 0; i < this.userInfo.envUserAccess.length; i ++) {
                if (this.userInfo.envUserAccess[i].id === envID) {
                    this.userInfo.mainEnvironment.push(this.userInfo.envUserAccess[i]);
                    this.userInfo.sid.push(this.userInfo.envUserAccess[i].dbLink);

                    localStorage.setItem('ENV_IP',this.userInfo.envUserAccess[i].ipAddress);
                    localStorage.setItem('ENV_ID',this.userInfo.envUserAccess[i].connectionID);
                    localStorage.setItem('ENV_PASS',this.userInfo.envUserAccess[i].connectionPassword);
                }
            }
        } else {
            for (let i = 0; i < this.userInfo.envCorporateAccess.length; i ++) {
                if (this.userInfo.envUserAccess[i].id === envID) {
                    this.userInfo.mainEnvironment.push(this.userInfo.envCorporateAccess[i]);
                    this.userInfo.sid.push(this.userInfo.envUserAccess[i].dbLink);

                    localStorage.setItem('ENV_IP',this.userInfo.envUserAccess[i].ipAddress);
                    localStorage.setItem('ENV_ID',this.userInfo.envUserAccess[i].connectionID);
                    localStorage.setItem('ENV_PASS',this.userInfo.envUserAccess[i].connectionPassword);
                }
            }
        }
        localStorage.setItem('ICRSID', this.userInfo.sid[0].toString());
    }

    setMainLanguage (newLanguage: string) {
        this.userInfo.envDefaultLanguage =newLanguage;
        localStorage.setItem('ICRLanguage', this.userInfo.envDefaultLanguage);
    }
  
    setNetwork(in_network, in_networkTree) {
        this.network= in_network;
        this.networkTree = in_networkTree;
    }
    setStructure(in_structure, in_structureTree) {
        this.structure= in_structure;
        this.structureTree = in_structureTree;
    }

} 

