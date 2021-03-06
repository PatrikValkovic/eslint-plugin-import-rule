import {Rule} from "eslint";
import fixed from "./fixer";
import {ImportSpecifier} from "estree";

export function ImportRule(context: Rule.RuleContext): Rule.RuleListener {
    return {
        ImportDeclaration(node) {
            const specifiers = node.specifiers.filter(spec => spec.type === 'ImportSpecifier') as ImportSpecifier[];
            if (specifiers.length === 0)
                return;
            const allImportsOnSingleLine = node?.loc?.start?.line === specifiers?.[0]?.loc?.start?.line;
            if (allImportsOnSingleLine) {
                specifiers.forEach(function (specifier) {
                    if (specifier?.loc?.start?.line !== node?.loc?.start?.line) {
                        context.report({
                            node: specifier,
                            message: 'Imports are not formatted correctly',
                            fix: fixed(node, allImportsOnSingleLine, specifiers),
                        });
                    }
                });
                if (node?.loc?.start?.line !== node?.loc?.end?.line) {
                    context.report({
                        node,
                        message: 'Imports are not formatted correctly',
                        fix: fixed(node, allImportsOnSingleLine, specifiers),
                    });
                }
            } else {
                specifiers.forEach(function (specifier, index) {
                    if (specifier?.loc?.start?.line !== (node?.loc?.start?.line || 0) + 1 + index) {
                        context.report({
                            node: specifier,
                            message: 'Imports are not formatted correctly',
                            fix: fixed(node, allImportsOnSingleLine, specifiers),
                        });
                    }
                });
                if ((specifiers[specifiers.length - 1]?.loc?.end?.line || 0) + 1 !== node?.loc?.end?.line) {
                    context.report({
                        node: node,
                        message: 'Imports are not formatted correctly',
                        fix: fixed(node, allImportsOnSingleLine, specifiers),
                    });
                }
            }
        }
    };
}