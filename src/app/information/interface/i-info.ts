export class IInfo {
    FULL_NAME: string;
    NATIONAL_ID: string;
    CUST_CD: string;

    constructor(FULL_NAME, NATIONAL_ID, CUST_CD) {
        this.NATIONAL_ID = NATIONAL_ID;
        this.FULL_NAME = FULL_NAME;
        this.CUST_CD = CUST_CD;
    }
}
