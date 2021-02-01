import { RouteFragment } from './route-fragment';

export class Route {
    private readonly PATTERN_REGEX = /^\/[0-9a-zA-Z-/:]*$/;

    private readonly pattern: string;

    private readonly fragmentedPattern: Array<RouteFragment>;

    constructor(pattern: string) {
        if (typeof pattern !== 'string') {
            throw new Error('Pattern must be a string');
        }

        const cleanPattern = pattern.trim();
        if (cleanPattern.length === 0) {
            throw new Error('Pattern must not be an empty string after trimming');
        }

        if (!this.PATTERN_REGEX.test(cleanPattern)) {
            throw new Error('Pattern must start with "/" and can include only chars (A-Z, a-z), digits (0-9), "/", ":" and "-');
        }

        this.pattern = cleanPattern;
        this.fragmentedPattern = this.urlToFragments(this.pattern);
    }

    matches(url: string, exact = false): boolean {
        const cleanUrl = this.cleanUrl(url);
        const fragmentedUrl = this.urlToFragments(cleanUrl);

        const validUrlLength = (exact && this.fragmentedPattern.length === fragmentedUrl.length)
            || (!exact && this.fragmentedPattern.length <= fragmentedUrl.length);

        if (!validUrlLength) {
            return false;
        }

        return this.fragmentedPattern
            .map((patternFragment, index) => patternFragment.matches(fragmentedUrl[index]))
            .every((isMatching) => isMatching);
    }

    extractParams(url: string): object {
        const cleanUrl = this.cleanUrl(url);
        const fragmentedUrl = this.urlToFragments(cleanUrl);

        const joinFragments = (patternFragment, index) => [patternFragment, fragmentedUrl[index]];
        const isParamFragmentTuple = ([patternFragment]) => patternFragment.isParamFragment;
        const fragmentTupleReducer = (obj, [patternFragment, urlFragment]) => ({
            ...obj,
            [this.paramFragmentToParam(patternFragment)]: urlFragment.fragmentStr,
        });

        return this.fragmentedPattern
            .map(joinFragments)
            .filter(isParamFragmentTuple)
            .reduce(fragmentTupleReducer, {});
    }

    cleanUrl(url: string): string {
        return url
            .trim()
            .split('#')[0]
            .split('?')[0];
    }

    private paramFragmentToParam(fragment: RouteFragment): string {
        return fragment.fragmentStr.replace(':', '');
    }

    private urlToFragments(url: string): Array<RouteFragment> {
        return url
            .split('/')
            .filter((fragmentStr) => !!fragmentStr)
            .map((fragmentStr) => new RouteFragment(fragmentStr));
    }
}
