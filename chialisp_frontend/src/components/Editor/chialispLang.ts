import * as monaco from "monaco-editor-core";

export const monarchLanguage = <monaco.languages.IMonarchLanguage>{
    // Set defaultToken to invalid to see what you do not tokenize yet
    defaultToken: 'invalid',
    keywords: [
        'mod', 
        'defun-inline', 
        'class', 
        'if',
        'f',
        'i',
        'c',
        'r',
        'l',
        'q',
        'a',
        'logand',
        'logior',
        'logxor',
        'lognot',
        'strlen',
        'concat',
        'divmod',
        'sha256',
        'ash',
        'lsh',
        'not',
        'any',
        'all',
        'point_add',
        'pubkey_for_exp',
        'CREATE_COIN',
        'AGG_SIG_UNSAFE',
        'AGG_SIG_ME',
    ],
    operators: [
        '+',
        '-',
        '*',
        '/',
        '>',
        '>s',
		'=',
        
    ],
    typeKeywords: ['TODO'],
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // identifiers and keywords
            [/[a-zA-Z_$][\w$]*/, {
                cases: {
                    '@keywords': { token: 'keyword' },
                    '@typeKeywords': { token: 'type' },
                    '@default': 'identifier'
                }
            }],
            [/0[xX][0-9a-fA-F']*[0-9a-fA-F]/, 'number.hex'],
            // whitespace
            { include: '@whitespace' },
            // strings for todos
            [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
            [/"/, 'string', '@string'],
        ],
        linecomment: [
			[/.*[^\\]$/, 'comment', '@pop'],
			[/[^]+/, 'comment']
		],
        whitespace: [
			[/[ \t\r\n]+/, ''],
            [/\/\/.*\\$/, 'comment', '@linecomment'],
		],
        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, 'string', '@pop']
        ],
    },
    
}

export const configuration = {
    comments: {
      lineComment: ";",
    },
    brackets: [
      ["{", "}"], ["[", "]"], ["(", ")"],
    ],
    autoClosingPairs: [
		{ open: '[', close: ']' },
		{ open: '{', close: '}' },
		{ open: '(', close: ')' },
		{ open: "'", close: "'", notIn: ['string', 'comment'] },
		{ open: '"', close: '"', notIn: ['string'] }
	],
	surroundingPairs: [
		{ open: '{', close: '}' },
		{ open: '[', close: ']' },
		{ open: '(', close: ')' },
		{ open: '"', close: '"' },
		{ open: "'", close: "'" }
	],
  }