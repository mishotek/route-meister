import { RouteFragment } from './route-fragment';

export class Route {
    get PATTERN_REGEX() {
        return /^\/[0-9a-zA-Z-/:]*$/;
    }

    constructor(pattern, exact = false) {
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

        this._fragmentedPattern = this._urlToFragments(cleanPattern);
        this.exact = exact;
    }

    matches(pathname) {
        const cleanPathname = this.cleanUrl(pathname);
        const fragmentedPathname = this._urlToFragments(cleanPathname);

        // eslint-disable-next-line max-len
        const validUrlLength = (this.exact && this._fragmentedPattern.length === fragmentedPathname.length)
            || (!this.exact && this._fragmentedPattern.length <= fragmentedPathname.length);

        if (!validUrlLength) {
            return false;
        }

        return this._fragmentedPattern
            .map((patternFragment, index) => patternFragment.matches(fragmentedPathname[index]))
            .every((isMatching) => isMatching);
    }

    extractParams(url) {
        const cleanUrl = this.cleanUrl(url);
        const fragmentedUrl = this._urlToFragments(cleanUrl);

        const joinFragments = (patternFragment, index) => [patternFragment, fragmentedUrl[index]];
        const isFragmentTupleParam = ([patternFragment]) => patternFragment.isParamFragment;
        const fragmentTupleReducer = (obj, [patternFragment, urlFragment]) => ({
            ...obj,
            [this._paramFragmentToParam(patternFragment)]: urlFragment.fragmentStr,
        });

        return this._fragmentedPattern
            .map(joinFragments)
            .filter(isFragmentTupleParam)
            .reduce(fragmentTupleReducer, {});
    }

    cleanUrl(url) {
        return url
            .trim()
            .split('#')[0]
            .split('?')[0];
    }

    _paramFragmentToParam(fragment) {
        return fragment.fragmentStr.replace(':', '');
    }

    _urlToFragments(url) {
        return url
            .split('/')
            .filter((fragmentStr) => !!fragmentStr)
            .map((fragmentStr) => new RouteFragment(fragmentStr));
    }
}
