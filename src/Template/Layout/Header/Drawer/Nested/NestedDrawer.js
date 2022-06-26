import React from "react";
import { Button } from '@mui/material';
import { TextField } from "@mui/material";
import { IconButton, Stack } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import MuiDrawer from "../Toys/MuiDrawer";
import User from "../../../../Components/Profile/Toys/User";
import Setting from "../../../Setting/Setting";
import { PublicContext } from "../../../../Context/Public";
import { List, ListItem } from "@mui/material";
import AddToQueueIcon from '@mui/icons-material/AddToQueue';


function ListDocuments() {
  const { publicCtx, setPublicCtx } = React.useContext(PublicContext);
  const { ssx, documents, documentPrefix } = publicCtx;

  const loadDocument = async (name) => {
    console.log(name)
    const { ok, statusText, data } = await ssx.orbitGet(name);
    const { ok1, data: documents} = await publicCtx.ssx.orbitList();
    console.log(statusText);
    console.log(data);
    console.log(documents)
    if (ok && ok1) {
      setPublicCtx({
        ...publicCtx,
        currentKey: name,
        currentDocument: data,
        documents: documents.filter((documentName) => documentName.startsWith(documentPrefix)),
      });
    }
  };

  return (
    <>
      <div style={{ paddingLeft: 15, paddingRight: 15 }}>
        <List>
          {documents.map((document, index) => (
            <ListItem onClick={(e) => { loadDocument(document) }} secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <AddToQueueIcon />
              </IconButton>
            } key={index}>{document.replace(documentPrefix, "")}</ListItem>
          ))}
        </List>

        {documents.length === 0 && (
          <p>No documents found</p>
        )}
      </div>
    </>
  );
}

function CreateDocuments() {
  const { publicCtx, setPublicCtx } = React.useContext(PublicContext);

  if (!publicCtx.currentDocument) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPublicCtx({
      ...publicCtx,
      currentKey: "",
      currentDocument: "",
    })
  }

  return (
    <>
      <div style={{ paddingLeft: 15, paddingRight: 15 }}>
        <Button variant="contained" onClick={handleSubmit}>Reset document</Button>
        {/* <p>This will overwrite your current document!</p> */}
      </div>
    </>
  );
}

// function CreateDocumentForm({ toggle }) {
//   const { publicCtx , setPublicCtx } = React.useContext(PublicContext);
//   const { ssx, documents, currentDocument } = publicCtx;
//   const [name, setName] = React.useState("");



//   return (
//     <>
//       <div style={{ textAlign: "center", paddingLeft: "10px" }}>
//         <TextField id="outlined-basic" variant="outlined" label="Document Name" value={name} onChange={(e) => setName(e.target.value)} />
//         <Button variant="contained" onClick={handleSubmit}>Create new document</Button>
//         {currentDocument !== "" && (<p>This will overwrite your current document!</p>)}
//       </div>
//     </>
//   );
// }

function TriggerSave({ toggle }) {
  const { publicCtx: { documents } } = React.useContext(PublicContext);

  return (
    <>
      <div style={{ paddingLeft: 15, paddingRight: 15 }}>
        <Button variant="contained" onClick={() => { toggle(true) }}>Save Document</Button>
      </div>
    </>
  );
}

function SaveDocument({ toggle }) {
  const { publicCtx, setPublicCtx } = React.useContext(PublicContext);
  const { ssx, documents, currentDocument, documentPrefix } = publicCtx;
  const [name, setName] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const key = `${documentPrefix}${name}`;
    await ssx.orbitPut(key, currentDocument);
    setPublicCtx({
      ...publicCtx,
      currentKey: key,
    })
    toggle(false);
  }

  return (
    <>
      <div style={{ textAlign: "center", paddingLeft: "10px" }}>

        <TextField id="outlined-basic" variant="outlined" label="Document Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button variant="contained" onClick={handleSubmit}>Save document</Button>
      </div>
    </>
  );
}


// function Create() {
//   const [showCreateDocument, setShowCreateDocument] = React.useState(false);

//   return (
//     <>
//       { !showCreateDocument && <CreateDocuments toggle={setShowCreateDocument}/>}
//       {/* { showCreateDocument && <CreateDocumentForm toggle={setShowCreateDocument}/> } */}
//     </>
//   );

// }

function Save() {
  const { publicCtx: { currentDocument } } = React.useContext(PublicContext);
  const [showSaveDocument, setShowSaveDocument] = React.useState(false);

  return (
    <>
      {currentDocument && !showSaveDocument && <TriggerSave toggle={setShowSaveDocument} />}
      {showSaveDocument && <SaveDocument toggle={setShowSaveDocument} />}
    </>
  );

}



export default function NestedDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  let closeDrawer = () => setIsDrawerOpen(false);
  let openDrawer = () => setIsDrawerOpen(true);
  const [showCreateDocument, setShowCreateDocument] = React.useState(false);

  return (
    <div style={{ paddingLeft: "10px" }}>
      {/* <Stack direction="row" spacing={2} alignItems="center">
        <IconButton onClick={openDrawer}>
          <SettingsIcon />
        </IconButton>
        <User />
      </Stack> */}
      {/* <MuiDrawer isDrawerOpen={isDrawerOpen} closeDrawer={closeDrawer}>
        <Setting />
      </MuiDrawer> */}
      <ListDocuments />
      <Save />
      <CreateDocuments />

      

    </div>
  );
}
