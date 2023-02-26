import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import './style.scss'
import 'draft-js/dist/Draft.css';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { BASIC_API } from "../../config/API";

const SendMessage = () => {
  const [open, setOpen] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [sender, setSender] = useState(''); 

  useEffect(() => {
    axios.get(`${BASIC_API}api/v1/auth/user`)
      .then(res => {
        setSender(res.data.data.email); // Отримуємо email поточного корстувача та записуємо його у в стан sender
      })
      .catch(err => console.log(err));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = convertToRaw(editorState.getCurrentContent());
    const email = {
      sender: sender, // використовуємо sender замість currentUser
      recipient: recipient,
      subject: subject,
      text: JSON.stringify(content),
    };
    axios.post(`${BASIC_API}api/v1/emails/`, email)
      .then(res => {
        console.log(res.data);
        const content = JSON.parse(res.data.data.text);
      setEditorState(EditorState.createWithContent(convertFromRaw(content)));
        handleClose();
      })
      .catch(err => console.log(err));
  };
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    };
    return (
      <>
        <div className="btn__modal">
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Написати
          </Button>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Написати листа</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <DialogContentText>
                Заповніть форму для відправки листа
              </DialogContentText>
              <TextField
                margin="dense"
                id="sender"
                label="Відправник"
                type="email"
                fullWidth
                required
                value={sender}
                onChange={(event) => setSender(event.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="recipient"
                label="Отримувач"
                type="email"
                fullWidth
                value={recipient}
                onChange={(event) => setRecipient(event.target.value)}
                required
              />
              <TextField
                margin="dense"
                id="subject"
                label="Тема:"
                type="text"
                fullWidth
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                required
              />
              <TextField
                margin="dense"
                id="subject"
                label="Текст листа:"
                type="text"
                fullWidth
                fullHeight
              />
              <div className="editor">
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                placeholder="Введіть текст листа"
              />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Відміна
              </Button>
              <Button type="submit" color="primary">
                Відправити
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    );
}

export default SendMessage;