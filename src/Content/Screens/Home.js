import React from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { PublicContext } from "../../Template/Context/Public";


const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`

export default function Home() {
  document.title = process.env.REACT_APP_COMPANY_NAME;
  const { publicCtx , setPublicCtx } = React.useContext(PublicContext);
  const { currentDocument, currentKey } = publicCtx;

  const [editor, setEditor] = React.useState(null);
  const [prevKey, setPrevKey] = React.useState(currentKey);
  const editorRef = React.useRef()


  React.useEffect(() => {
    console.log("editor");
    console.log(editorRef);
    if (currentKey!== prevKey) {
      setPrevKey(currentKey);
      if (editorRef.current) { 

        console.log(editorRef);
        // console.log(editorRef.current.editorInst)
        // editorRef.current.editorInst.setMarkdown(currentDocument)
        try {
          if (editorRef.current.mdEditor) {
            console.log("no editorInst")
            editorRef.current.mdEditor.setMarkdown(currentDocument)
          } else {
            console.log("editorInst")
            editorRef.current.editorInst.mdEditor.setMarkdown(currentDocument)
          }
        } catch (error) {
        }
      }
    }
  }, [currentKey, prevKey]);

  const onChange = (e) => {
    // console.log(e);
    // console.log(editor)
    // console.log(editor.editorInst.mdEditor.el.innerText)
    setPublicCtx({
      ...publicCtx,
      currentDocument: editorRef.current.editorInst
        ? editorRef.current.editorInst.mdEditor.el.innerText
        : editorRef.current.mdEditor.el.innerText,
    });
    // console.log(editor.editorInst.mdEditor.el.innerText)
    
  }
  

  return (
    <>
      <Editor
        initialValue={currentDocument}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        usageStatistics={false}
        onChange={onChange}
        ref={editorRef}
        // events={{
        //   focus: () => {
        //     console.log('⭐ focus');
        //   },
        // }}

      />
    </>
  );
}
