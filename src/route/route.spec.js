import { Route } from './route';

describe('Route tests', () => {
    test('Should remove hash from url', () => {
        const url = '/my-rul#someting';
        const route = new Route('/route');
        expect(route.cleanUrl(url)).toBe('/my-rul');
    });

    test('Should remove search params from url', () => {
        const url = '/my-rul?someting=else';
        const route = new Route('/route');
        expect(route.cleanUrl(url)).toBe('/my-rul');
    });

    test('Should remove search params and hash from url', () => {
        const url = '/my-rul#some-hash?someting=else';
        const route = new Route('/route');
        expect(route.cleanUrl(url)).toBe('/my-rul');
    });

    test('Should not create route without pattern', () => {
        // @ts-ignore
        expect(() => new Route()).toThrow(Error);
    });

    test('Should not create route with empty pattern', () => {
        expect(() => new Route('       ')).toThrow(Error);
    });

    test('Should not create route with pattern, that doesn\'t start with "/"', () => {
        expect(() => new Route('my-route')).toThrow(Error);
    });

    test('Should not create route with pattern, that includes invalid chars', () => {
        expect(() => new Route('/my-route?*some#route')).toThrow(Error);
    });

    test('Should match routes with itself', () => {
        const route = new Route('/my-route');
        expect(route.matches('/my-route')).toBeTruthy();
    });

    test('Should not match different routes', () => {
        const route = new Route('/my-route');
        expect(route.matches('/not-my-route')).toBeFalsy();
    });

    test('Should match when route is prefix of url', () => {
        const route = new Route('/my-route');
        expect(route.matches('/my-route/more')).toBeTruthy();
    });

    test('Should not match when route is prefix of url, but exact is set to true', () => {
        const route = new Route('/my-route', true);
        expect(route.matches('/my-route/more')).toBeFalsy();
    });

    test('Should match route with params', () => {
        const route = new Route('/my-route/:id');
        expect(route.matches('/my-route/my-id')).toBeTruthy();
    });

    test('Should return empty object after getting params', () => {
        const route = new Route('/my-route');
        expect(route.extractParams('/my-route')).toEqual({});
    });

    test('Should return all params', () => {
        const route = new Route('/:id/my-route/:user/:userId');
        expect(route.extractParams('/1/my-route/me/2')).toEqual({
            id: '1',
            user: 'me',
            userId: '2',
        });
    });
});
