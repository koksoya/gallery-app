import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { Item } from "./PhotoGallery";

interface Props {
  item: Item;
  unselect: () => void;
}

export default function PhotoDetail({ item, unselect }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item sm={6} md={12}>
        <Card>
          <CardActionArea>
            <CardMedia component="img" alt={item.title} image={item.url} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                by: {item.author}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              onClick={unselect}
            >
              Back
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
