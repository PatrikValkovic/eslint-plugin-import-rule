import type {AST, Rule} from "eslint";
import {ImportDeclaration, ImportSpecifier} from "estree";
type Fix = Rule.Fix;
type Token = AST.Token;

const fixed = (node: ImportDeclaration, isSingleLine: boolean, specifiersOfInteest: ImportSpecifier[]) => (fixer: Rule.RuleFixer): Fix => {
    const allImports = specifiersOfInteest.map((specifier: ImportSpecifier) => {
        const importedVariable = specifier.imported.name;
        const localVariable = specifier.local.name;
        return `${localVariable !== importedVariable ? `${importedVariable} as ` : ''}${localVariable}`;
    })
    const firstSpecifier = specifiersOfInteest[0];
    const lastSpecifier = specifiersOfInteest[specifiersOfInteest.length - 1];
    let program = node;
    // @ts-ignore
    while(!!program.parent) program = program.parent;
    let bracketBefore: Token = null;
    let bracketAfter: Token = null;
    // @ts-ignore
    program.tokens.forEach(function(token) {
        if(token.type !== 'Punctuator' || !['{','}'].includes(token.value))
            return;
        if(token.range[1] <= firstSpecifier.range[0] && (bracketBefore === null || bracketBefore.range[1] < token.range[1]))
            bracketBefore = token;
        if(token.range[0] >= lastSpecifier.range[1] && (bracketAfter === null || bracketAfter.range[0] > token.range[0]))
            bracketAfter = token;
    });
    const joinedImports = allImports.join(isSingleLine ? ', ' : ',\n  ');
    const textToAdd = isSingleLine ? joinedImports : `\n  ${joinedImports}\n`;
    const rangeToRemove: [number, number] = [bracketBefore.range[1], bracketAfter.range[0]];
    return fixer.replaceTextRange(rangeToRemove, textToAdd);
};

export default fixed;