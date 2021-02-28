import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import "./ListItem.css";

const ListItem = ({ id, author, download_url, onOpenImage }) => {
  // Send image id that has clicked
  const handleOpenImage = () => {
    onOpenImage(id);
  };

  return (
    <div className="card-content">
      <Card elevation={10}>
        <ButtonBase onClick={handleOpenImage}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                Author: {author}
              </Typography>
            </CardContent>
            <CardMedia className="card-media" image={download_url} />
          </CardActionArea>
        </ButtonBase>
      </Card>
    </div>
  );
};

export default ListItem;
