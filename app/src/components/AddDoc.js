import { useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

function AddDoc() {
  const [open, setOpen] = useState(false);
  const [addData, setAddData] = useState({ className: "", detail: "" });

  const openPopup = () => {
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setAddData({
      // ...はスプレッド演算子で、オブジェクトの全プロパティを展開する。
      ...addData,
      [e.target.id]: e.target.value,
    });
  };

  const registData = () => {
    console.log(addData);
    addDoc(collection(db, "classLists"), {
      name: addData.className,
      detail: addData.detail,
    });
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "10vh",
      }}
    >
      <Button
        onClick={openPopup}
        variant="contained"
        sx={{
          background: "linear-gradient(45deg, #2196F3 30%, #1976D2 90%)",
          boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .3)",
          borderRadius: 3,
          border: 0,
          color: "white",
          height: 40,
          padding: "0 60px",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 5px 15px 5px rgba(33, 150, 243, .6)",
          },
        }}
      >
        <AddCircleOutlineIcon />
      </Button>

      {/* ポップアップ表示 */}
      <Dialog open={open} onClose={closePopup}>
        <DialogTitle>AddDocForm</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="className"
            label="ClassName"
            type="text"
            fullWidth
            value={addData["className"]}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="detail"
            label="detail"
            type="text"
            fullWidth
            value={addData["detail"]}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup}>キャンセル</Button>
          <Button onClick={registData} variant="contained" color="primary">
            追加
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AddDoc;
