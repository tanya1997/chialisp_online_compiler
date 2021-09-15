import * as React from 'react';
import * as monaco from 'monaco-editor-core';

interface IEditorPorps {
    language: string;
    value: string
}

const Editor: React.FC<IEditorPorps> = (props: IEditorPorps) => {
    let divNode: any;
    let editor:any;
    const assignRef = React.useCallback((node) => {
        // On mount get the ref of the div and assign it the divNode
        divNode = node;
    }, []);

    React.useEffect(() => {
       editor = monaco.editor.create(divNode, {
                language: props.language,
                value: props.value,
                minimap: { enabled: false },
                autoIndent: 'keep'
            });

    }, [assignRef, editor])

    if (editor)
        editor.value = props.value

    return <div ref={assignRef} style={{ height: '90vh' }}></div>;
}

export { Editor };