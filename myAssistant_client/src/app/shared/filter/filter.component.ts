import { Component, Output, EventEmitter } from '@angular/core';
import { ViewEncapsulation, Input, OnChanges,} from '@angular/core';

import { QueryService, UserService } from '../../shared/services';

import { Message } from 'primeng/api';

@Component({
	moduleId: module.id,
    selector: 'filter-cmp',
    templateUrl: './filter.component.html',
    providers: [QueryService, UserService],
    styleUrls: ['./filter.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FilterComponent implements OnChanges {

    //@ViewChild('fc') fc: FullCalendar;
    @Input() selectedStructure;  
    @Input() selectedNetwork;  
    @Input() selectedFlow; 
    @Input() disabledButton;

    @Output() clickRefresh = new EventEmitter();
    @Output() initCompleted = new EventEmitter();

    network;
    structure;
    flow;

    networkDataReady = false;
    structureDataReady = false;
    public flowDataReady = false;

    flatSelectedNetworkID = []; // contains the selected netork ID
    flatSelectedStructureID = []; // contains the selected structure ID
    flatSelectedFlowID = []; // contains the selected flow ID

    
    dataNetwork;
    dataStructure;
    dataFlow;

    
    msgs: Message[] = [];


    constructor(private _queryService: QueryService) {

    }
    
    ngOnInit()  { 
        this.initializeData();
    }

    ngAfterViewInit () {
        
    }

    ngOnChanges() {
    }

    initializeData() {
        //console.log('Received network : ',this.network, this.structure);

        this.flow = [ { "data":0,
            "NODE_ID":0,
            "LABEL":"DISTRIBUTION FLOW",
            "PARENT_ID": null,
            "children":[ {"data":1,
                            "NODE_ID":3,
                            "LABEL":"WAREHOUSE",
                            "PARENT_ID": 0,
                            "children":[ ] },
                            {"data":2,
                            "NODE_ID":1,
                            "LABEL":"DIRECT DELIVERY",
                            "children":[ ] }
                        ]
        }];
    }


    refresh() {
        // Event clickedRefresh already shared through html directive attribute
        this.disabledButton = true;
    }

    nodeSelect(flatData, e) {
        //console.log('nodeSelect :', e);
        let indice = flatData.indexOf(e.node.NODE_ID)
        if (indice === -1 ) {
            flatData.push(e.node.NODE_ID);
        }
        for (let i =0; i < e.node.children.length; i++) {
            this.nodeSelect(flatData, { node: e.node.children[i]});
        }
        //this.ngOnChanges();
        this.disabledButton = false;
    }

    nodeUnSelect(flatData, e) {
        //console.log('nodeUnSelect :', e);
        let indice = flatData.indexOf(e.node.NODE_ID)
        if (indice > -1 ) {
            flatData.splice(indice, 1);
        }
        for (let i =0; i < e.node.children.length; i++) {
            this.nodeUnSelect(flatData, { node: e.node.children[i]});
        }
        //this.ngOnChanges();
        this.disabledButton = false;
    }

    public setSelectedNetwork(nodeID) {
        this.setSelected(this.selectedNetwork, this.flatSelectedNetworkID, this.network.data[0], nodeID);
    }

    public setSelectedStructure(nodeID) {
        this.setSelected(this.selectedStructure, this.flatSelectedStructureID, this.structure.data[0], nodeID);
    }

    public setSelectedFlow(nodeID) {
        this.setSelected(this.selectedFlow, this.flatSelectedFlowID, this.flow[0], nodeID);
    }

    public setSelected(masterNode, flatSelection, node, nodeID) {
        //console.log('setSelected : ', nodeID, node);
        if (node.children.length ===0 && node.NODE_ID === nodeID) {
            if(flatSelection.indexOf(node.NODE_ID) === -1)  {
                flatSelection.push(node.NODE_ID);
                masterNode.push(node);
            }
            return true;
        }
        for (let i =0; i < node.children.length; i ++) {
            if(node.NODE_ID === nodeID){
                masterNode.push(node);
                return true;
            }
            if (this.setSelected(masterNode, flatSelection, node.children[i], nodeID)) {
                if(flatSelection.indexOf(node.NODE_ID) === -1)  {
                    flatSelection.push(node.NODE_ID);
                    masterNode.push(node);
                }
                return true;
            }
        }
        return false;
    }
}
