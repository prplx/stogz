type ExcludeFalsy = <T>(x: T | false | null | 0 | '' | undefined) => x is T;
