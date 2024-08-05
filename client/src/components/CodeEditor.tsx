import CodeMirror from "@uiw/react-codemirror";
import React from "react";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { tags as t } from "@lezer/highlight";
import { loadLanguage } from '@uiw/codemirror-extensions-langs';


export default function CodeEditor() {
    const [value, setValue] = React.useState("console.log('hello world!');");
    const onChange = React.useCallback((val: any) => {
        console.log("val:", val);
        setValue(val);
    }, []);
    return (
        <CodeMirror
            value={value}
            height="100vh"
            extensions={[loadLanguage('javascript')!]}
            onChange={onChange}
            theme={draculaInit({
                settings: {
                    caret: "#c6c6c6",
                    fontFamily: "monospace",
                },
                styles: [{ tag: t.comment, color: "#6272a4" }],
            })}
        />
    );
}
