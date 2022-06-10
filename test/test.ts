// create a new tester with a typescript parser
import {RuleTester} from "eslint";
import index from "../src/index";


const ruleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
});

const error = { message: 'Imports are not formatted correctly' };
const rule = index.rules['format-import'];

// pass in test cases
ruleTester.run("import-rule", rule, {
    // valid case has no errors
    valid: [
        { code: `import { foo, bar } from 'baz';` },
        { code: `import { foo } from 'baz';` },
        { code: `import { foo, bar, baz } from 'baz';` },
        { code: `import { 
    foo
    } from 'baz';` },
        { code: `import { 
    foo,
    bar,
    baz,
    } from 'baz';` },
        { code: `import SomethingDefault, {
    foo,
    bar,
    baz,
    } from 'baz';` },
        { code: `import SomethingDefault, { foo, bar, baz } from 'baz';` },
    ],

    invalid: [
        {
            code: `import { 
  foo, 
  bar, 
  baz } from 'bar'`,
            errors: [error],
            output: `import {
  foo,
  bar,
  baz
} from 'bar'`,
        },
        {
            code: `import { foo,
  bar,
  baz
  } from 'bar'`,
            errors: [error, error, error],
            output: `import {foo, bar, baz} from 'bar'`,
        },
        {
            code: `import {
  foo, bar,
  baz
  } from 'bar'`,
            // for an invalid case we list which messageIds (or any other reported data) should be present
            errors: [error, error],
            output: `import {
  foo,
  bar,
  baz
} from 'bar'`,
        },
        {
            code: `import SomethingDefault, {
  foo, bar,
  baz
  } from 'bar'`,
            // for an invalid case we list which messageIds (or any other reported data) should be present
            errors: [error, error],
            output: `import SomethingDefault, {
  foo,
  bar,
  baz
} from 'bar'`,
        },
        {
            code: `import SomethingDefault, { foo,
  bar,
  baz
  } from 'bar'`,
            errors: [error, error, error],
            output: `import SomethingDefault, {foo, bar, baz} from 'bar'`,
        },
        {
            code: `import SomethingDefault,{foo,
bar,
baz} from 'bar'`,
            errors: [error, error, error],
            output: `import SomethingDefault,{foo, bar, baz} from 'bar'`,
        },
    ],
});