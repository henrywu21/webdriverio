export default function refetch () {

    let currentElement = this;

    // Generate selector array
    let selectors = [];

    //Crawl back to the browser object, and cache all selectors
    while(currentElement.elementId && currentElement.parent) {
        selectors.push(currentElement.selector);
        currentElement = currentElement.parent;
    }
    selectors.reverse();

    // Beginning with the browser object, rechain
    const element = selectors.reduce((element, selector) =>
        element.$(selector).waitForExist(), currentElement);

    this.parent = element.parent;
    this.elementId = element.elementId;

    return this;
}
