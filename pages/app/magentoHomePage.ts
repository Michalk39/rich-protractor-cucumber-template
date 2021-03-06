import { ElementFinder, $, element, by, browser } from "protractor";
import { BrowserActions } from "../../support/browser";
import { Actions } from "../../support/actions";
import { protractor } from "protractor/built/ptor";
import { CustomWait } from "../../support/wait";

export class MagentoHomePage {
    private url: string = "";
    private cartIcon: ElementFinder;
    private searchField: ElementFinder;
    private searchMagnifier: ElementFinder;
    private addToCartButton: ElementFinder;

    constructor() {
        this.cartIcon = $("a.action.showcart");
        this.searchField = $("#search");
        this.searchMagnifier = $("button[title='Search']");
        this.addToCartButton = $("button[title='Add to Cart']");
    }

    public async navigateTo() {
        await BrowserActions.get(this.url);
    }

    public async fillSearchField(text: string) {
        await Actions.sendKeys(this.searchField, text);
    }

    public async clickSearchMagnifier() {
        await CustomWait.waitForElementToBeClickable(this.searchMagnifier);
        await Actions.click(this.searchMagnifier);
    }

    public async clickAddToCartButton() {
        await CustomWait.waitForElementToBeClickable(this.addToCartButton);
        await Actions.click(this.addToCartButton);
    }

    public async searchPhrase(phrase: string) {
        await this.fillSearchField(phrase);
        await this.clickSearchMagnifier();
    }

    public async addProductToCart() {
        let productName: string = "Example Product";
        await this.navigateTo();
        await CustomWait.waitForElementToBeClickable(this.searchField, CustomWait.timeouts.long);
        await this.searchPhrase(productName);
        let productNameLink = await element(by.cssContainingText(".product-item-link", productName));
        await CustomWait.waitForElementToBeClickable(productNameLink);
        await Actions.click(productNameLink);
        await this.clickAddToCartButton();
    }
}
