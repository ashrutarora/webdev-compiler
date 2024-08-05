import CodeMirror from "@uiw/react-codemirror";
import React from "react";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { tags as t } from "@lezer/highlight";
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateCodeValue } from "@/redux/slices/compilerSlice";


export default function CodeEditor() {

    const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage)
    const dispatch = useDispatch()

    const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode)

    const onChange = React.useCallback((value: string) => {

        dispatch(updateCodeValue(value))
    }, []);
    return (
        <CodeMirror
            value={fullCode[currentLanguage]}
            height="88vh"
            className="code-editor"
            extensions={[loadLanguage(currentLanguage)!]}
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
