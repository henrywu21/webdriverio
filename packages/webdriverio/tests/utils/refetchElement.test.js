import request from 'request'
import { remote } from '../../src'
import refetchElement from '../../src/utils/refetchElement'

describe('blah', () => {
    let browser;

    beforeAll( async () => {
        browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            },
            waitforInterval: 20,
            waitforTimeout: 100
        })
    })

    it('should successfully refetch a non chained element', async () => {
        const elem = await browser.$('#foo')
        //const result = await refetchElement.call(elem)
        expect(refetchElement(elem)).resolves.toEqual(elem);
    })

    it('should successfully refetch a chained element', async () => {
        const elem = await browser.$('#foo')
        const subElem = await elem.$('#subfoo')
        const result = await refetchElement(subElem)
        expect(refetchElement(subElem)).resolves.toEqual(subElem)
    })

    it('should successfully refetch a deeply chained element', async () => {
        const elem = await browser.$('#foo')
        const subElem = await elem.$('#subfoo')
        const subSubElem = await subElem.$('#subsubfoo');
        const result = await refetchElement(subSubElem)
        expect(refetchElement(subSubElem)).resolves.toEqual(subSubElem)
    })
})
