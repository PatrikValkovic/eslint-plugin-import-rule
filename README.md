# @patrikvalkovic/eslint-plugin-import-rule

This plugin makes sure all the imports are either on a single line, 
or each imported variable has its own row.

This is useful with some IDEs like WebStorm with auto-import enabled, 
which import variables alphabetically, but not considering position of imports.

✅ The rule is fixable.

## How to use

Install the package

```bash
npm install -D eslint-plugin-simple-import-sort
```

Install plugin and use the rule

```ts
import importRule from '@patrikvalkovic/eslint-plugin-import-rule';

export default [
    plugins: {
        '@patrikvalkovic/import-rule': importRule,
    },
    rules: {
        '@patrikvalkovic/import-rule/format-import': 'error',
    },
]
```

⚠️ It requires `@typescript-eslint/parser` package to be installed and configured first.

## Examples

✅ Correct imports
```ts
import { foo, bar, baz } from 'baz';

import SomethingDefault, {
    foo,
    bar,
    baz,
} from 'baz';
```

❌ Incorrect imports
```ts
import SomethingDefault, { foo,
  bar,
  baz
} from 'bar'

import {
    foo, bar,
    baz
} from 'bar'
```

More examples in tests.
