import ListItem from "../ListItem/ListItem";
import { useState } from "react";
import useList from "../useList";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Gallery = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [centerImage, setCenterImage] = useState("");

  // Close image
  const handleClose = () => {
    setOpen(false);
  };

  // Loading gallery data
  const { data: list, isPending, error } = useList(
    "https://picsum.photos/v2/list"
  );

  // Image has clicked
  const handleOpenImage = (key) => {
    setOpen(true);
    let imageUrl = list.filter((item) => item.id === key);
    setCenterImage(imageUrl[0].download_url);
  };

  return (
    <div className="gallery">
      <AppBar position="static">
        <Toolbar>
          <h1 style={{ color: "white", flex: "1" }}>Gallery</h1>
        </Toolbar>
      </AppBar>

      {list &&
        list.map((imageData) => (
          <ListItem
            key={imageData.id}
            id={imageData.id}
            author={imageData.author}
            download_url={imageData.download_url}
            onOpenImage={handleOpenImage}
          />
        ))}
      {isPending && (
        <div className="gallery-loader">
          <CircularProgress
            style={{ width: "100px", height: "100px" }}
            color="secondary"
          />
        </div>
      )}
      {error && <div>{error}</div>}

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClick={handleClose}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div>
              <img src={centerImage} alt="img" width="900px" height="800px" />
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
