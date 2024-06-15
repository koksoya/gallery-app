import {
  Container,
  Grid,
  Button,
  ImageList,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { lazy, Suspense, useCallback, useState } from "react";
import { itemList } from "./itemList";
const PhotoDetail = lazy(() => import("./PhotoDetail"));

export interface Item {
  id: number;
  url: string;
  title: string;
  author: string;
  thumbnail: string;
}

export default function PhotoGallery() {
  const [items, setItems] = useState<Item[]>(itemList);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleRemoveImage = useCallback(
    (id: number) => {
      setItems(items.filter((item) => item.id !== id));
    },
    [items]
  );

  const handleSelectedItem = useCallback((item: Item) => {
    setSelectedItem(item);
  }, []);

  const handleUnselectItem = useCallback(() => {
    setSelectedItem(null);
  }, []);

  return (
    <Container
      maxWidth="md"
      component={"main"}
      style={{ marginTop: "100px", marginBottom: "100px" }}
    >
      {selectedItem ? (
        <Suspense fallback={<div>Loading...</div>}>
          <PhotoDetail item={selectedItem} unselect={handleUnselectItem} />
        </Suspense>
      ) : (
        <ImageList rowHeight="auto" gap={100}>
          {items.map((item, index) => (
            <PhotoListItem
              key={item.id}
              item={item}
              handleSelectedItem={handleSelectedItem}
              handleRemoveImage={handleRemoveImage}
            />
          ))}
        </ImageList>
      )}
    </Container>
  );
}

const PhotoListItem = React.memo(
  ({
    item,
    handleSelectedItem,
    handleRemoveImage,
  }: {
    item: Item;
    handleSelectedItem: (item: Item) => void;
    handleRemoveImage: (id: number) => void;
  }) => (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={item.title}
              height="300"
              image={item.thumbnail}
              onClick={() => handleSelectedItem(item)}
              style={{ cursor: "pointer" }}
            />
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
              onClick={() => handleSelectedItem(item)}
            >
              View
            </Button>
            <Button
              size="small"
              color="warning"
              variant="outlined"
              onClick={() => handleRemoveImage(item.id)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
);
