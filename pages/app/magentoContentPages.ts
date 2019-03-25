import { BrowserActions } from "../../support/browser";
import { ElementFinder, $, ElementArrayFinder, $$ } from "protractor";
import { Actions } from "../../support/actions";
import { protractor } from "protractor/built/ptor";




export class MagentoContentPages {
    private url: string = "index.php/admin/cms/page";
    private addNewPageButton: ElementFinder;
    private lastRowTitle: ElementFinder;
    private lastRowUrl: ElementFinder;
    private EC = protractor.ExpectedConditions;
    public tableIsLoaded;

    constructor() {
        this.addNewPageButton = $('#add');
        this.lastRowTitle = $('tbody > tr.data-row:last-child>td:nth-child(3)>div');
        this.lastRowUrl = $('tbody > tr.data-row:last-child>td:nth-child(4)>div');
        this.tableIsLoaded = this.EC.elementToBeClickable(this.lastRowTitle);
    }

    async navigateTo() {
        await BrowserActions.get(this.url);
    };

    async clickAddNewPageButton() {
        await Actions.click(this.addNewPageButton);
    }

    async getLastRowTitle() {
        return await this.lastRowTitle.getText();
    }

    async getLastRowUrl() {
        return await this.lastRowUrl.getText();
    }

    // async tableIsLoaded() {
        
    // }
    

}