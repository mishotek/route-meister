import { RouteFragment } from './route-fragment';

describe('RouteFragment tests', () => {
    test('Should match identical fragments', () => {
        const fragment1 = new RouteFragment('my-fragment');
        const fragment2 = new RouteFragment('my-fragment');
        expect(fragment1.matches(fragment2)).toBeTruthy();
    });

    test('Should not match different fragments', () => {
        const fragment1 = new RouteFragment('my-fragment');
        const fragment2 = new RouteFragment('another-fragment');
        expect(fragment1.matches(fragment2)).toBeFalsy();
    });

    test('Should match fragments, when first one is param fragment', () => {
        const fragment1 = new RouteFragment(':my-param');
        const fragment2 = new RouteFragment('param-value');
        expect(fragment1.matches(fragment2)).toBeTruthy();
    });

    test('Should match fragments, when second one is param fragment', () => {
        const fragment1 = new RouteFragment('param-value');
        const fragment2 = new RouteFragment(':my-param');
        expect(fragment1.matches(fragment2)).toBeTruthy();
    });
});
