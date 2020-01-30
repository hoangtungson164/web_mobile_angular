export class IInfo {
    fiCode = 'fiCode';
    taskCode = 'CIC_Mobile_Report';
    name: string;
    mobilePhoneNumber = '000011112222';
    natId: string;
    infoProvConcent = 'Y';

    constructor(FULL_NAME, NATIONAL_ID) {
        this.natId = NATIONAL_ID;
        this.name = FULL_NAME;
    }
}
