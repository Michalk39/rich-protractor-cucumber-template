import { BrowserActions } from "../../support/browser";
import { ElementFinder, $, ElementArrayFinder, $$, browser } from "protractor";
import { Actions } from "../../support/actions";
import { protractor } from "protractor/built/ptor";
import { MagentoContentPagesAddNewPage } from "./magentoContentPagesAddNewPage";
import { CustomWait } from "../../support/wait";


export class MagentoContentPages {
    private url: string = "index.php/admin/cms/page";
    private addNewPageButton: ElementFinder;
    private lastRowTitle: ElementFinder;
    private lastRowUrl: ElementFinder;
    private EC = protractor.ExpectedConditions;
    private magentoContentPagesAddNewPage: MagentoContentPagesAddNewPage = new MagentoContentPagesAddNewPage;
    
    // private rowCheckbox;    
    //private tableOfPages;

    constructor() {
        this.addNewPageButton = $('#add');
        this.lastRowTitle = $('tbody > tr.data-row:last-child>td:nth-child(3)>div');
        this.lastRowUrl = $('tbody > tr.data-row:last-child>td:nth-child(4)>div');
        
        //this.tableOfPages = this.buildTable();
    }

    private async buildTable() {
        //zbudować jakos tabele
    }

    async navigateTo() {
        await BrowserActions.get(this.url);
    };

    async clickAddNewPageButton() {
        await Actions.click(this.addNewPageButton);
    }

    async getLastRowTitle() {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);        
        return await this.lastRowTitle.getText();
    }

    async getLastRowUrl() {
        await CustomWait.waitForElementToBeClickable(this.lastRowUrl);        
        return await this.lastRowUrl.getText();
    }

    async createNewTestPage(pageName: string = "Test Cms Page") {
        await this.navigateTo();
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);        
        await this.clickAddNewPageButton();
        await this.magentoContentPagesAddNewPage.fillPageTitleField(pageName);
        await this.magentoContentPagesAddNewPage.clickSaveButton();
    }

    async createMultipleTestPages(number: number) {
        for(let i = 0; i < number; i++) {
            await this.createNewTestPage("TestCMSPage" + String(i + 1));
        }
    }

    async clickRowCheckboxReversed(number: number) {
        await CustomWait.waitForElementToBeClickable(this.lastRowTitle);
        let checkBox = $("table[data-role='grid'] > tbody > tr:nth-last-child(" + number + ") > td:first-child")
        await Actions.click(checkBox);
    }

    async selectMultipleRowsReversed(quantity: number) {
        this.navigateTo();
        for(let i = 1; i <= quantity; i++) {
            this.clickRowCheckboxReversed(i);
        }
    }

}