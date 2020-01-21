export class IInfo {
    FULL_NAME: string;
    NATIONAL_ID: string;
    CONSENT_ID: string;
    CUST_GB: string;

    constructor(FULL_NAME, NATIONAL_ID, CONSENT_ID, CUST_GB) {
        this.FULL_NAME = FULL_NAME;
        this.NATIONAL_ID = NATIONAL_ID;
        this.CONSENT_ID = CONSENT_ID;
        this.CUST_GB = CUST_GB;
    }
}
