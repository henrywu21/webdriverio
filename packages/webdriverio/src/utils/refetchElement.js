export default function refetchElement () {
    let currentElement = this;

    return new Promise ( async () => {
        let selectors = [];

        //Crawl back to the browser object, and cache all selectors
        while(currentElement.elementId && currentElement.parent) {
            selectors.push(currentElement.selector);
            currentElement = currentElement.parent;
        }
        selectors.reverse();

        // Beginning with the browser object, rechain
        const element = await selectors.reduce(async (elementPromise, selector) => {
            const resolvedElement = await elementPromise;
            const newElement = await resolvedElement.$(selector);
            console.log(newElement);
            await newElement.waitForExist();
            return newElement;
        }, Promise.resolve(currentElement));

        this.parent = element.parent;
        this.elementId = element.elementId;

        return this;
    })
}
