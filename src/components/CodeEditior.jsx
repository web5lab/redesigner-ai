import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html as Html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import { useEditor } from "../editior/context/EditorContext";

export default function CodeEditor() {
  const {
    html,
    setHtml, 
  } = useEditor();

  const handleChange = (value) => {
    console.log("HTML content changed:", value);
    setHtml(value);
  };

  return (
    <div className="w-full h-full"  style={{
  
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }}>
      <CodeMirror
        value={html}
        height="calc(100vh - 46px)"
        extensions={[Html()]}
        onChange={handleChange}
        theme={oneDark}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          foldGutter: true,
        }}
      />
    </div>
  );
}
