import {ImportRule} from "./rule";

export = {
    rules: {
        'format-import': {
            meta: {
                fixable: 'code',
            },
            create: ImportRule,
        }
    }
} as const