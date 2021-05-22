import { LightningElement, track } from 'lwc';
import LightApex from '@salesforce/apex/AccManagerApex2.getAccountRecs';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class AccManagerApex2 extends LightningElement {

@track numberofrecords;
@track accRecsFetched;


get showRecs(){
    if(this.accRecsFetched){
        return true;
    }
    return false;
}

numberofrecords(event){
    this.numberofrecords = event.target.value;
    console.log('^^Number entered^^ ',this.numberofrecords);
}

fetchnumberofrecords(){

    LightApex({numberofrecords:this.numberofrecords}).then(response =>{
        this.accRecsFetched = response;
        console('Response >>> '+response);
        const toastEvent = new ShowToastEvent({
            title : 'Account Fetched',
            message : this.numberofrecords + 'Account Records fetched from Server',
            variant : 'success',
        });
        this.dispatchEvent(toastEvent);
    }).catch(error =>{
        console.error('Error fetching the records for given number',error.body.message);
        const toastEvent = new ShowToastEvent({
            title : 'Error',
            message : this.numberofrecords + 'Account Records fetched from Server',
            variant : 'error',
        });
        this.dispatchEvent(toastEvent);
    })

}

}