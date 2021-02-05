export class RouteFragment {
    constructor(fragmentStr) {
        this.fragmentStr = fragmentStr;
        this.isParamFragment = fragmentStr[0] === ':';
    }

    matches(routeFragment) {
        if (this.isParamFragment || routeFragment.isParamFragment) {
            return true;
        }

        return routeFragment.fragmentStr === this.fragmentStr;
    }
}
