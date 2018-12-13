export default function refetchElement () {
    let currentElement = this;

    return new Promise (() => {
        let selectors = [];

        //Crawl back to the browser object, and cache all selectors
        while(currentElement.elementId && currentElement.parent) {
            selectors.push(currentElement.selector);
            currentElement = currentElement.parent;
        }
        selectors.reverse();

        // Beginning with the browser object, rechain
        const element = selectors.reduce((element, selector) => {
            const newElement = element.$(selector);
            newElement.waitForExist();
            return newElement;
        }, currentElement);

        this.parent = element.parent;
        this.elementId = element.elementId;

        return this;
    })
}
