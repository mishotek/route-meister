export class RouteFragment {
    public readonly isParamFragment: boolean;

    constructor(public fragmentStr: string) {
        this.isParamFragment = fragmentStr[0] === ':';
    }

    public matches(routeFragment: RouteFragment): boolean {
        if (this.isParamFragment || routeFragment.isParamFragment) {
            return true;
        }

        return routeFragment.fragmentStr === this.fragmentStr;
    }
}
