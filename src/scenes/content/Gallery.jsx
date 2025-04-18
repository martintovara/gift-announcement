import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Dialog,
  IconButton,
  useMediaQuery,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { GALLERY } from "../../config/env";

const Gallery = ({ folderPath, imageCount = 10 }) => {
  const navigate = useNavigate();

  //Check access to gallery
  useEffect(() => {
    const allowAccessGallery = JSON.parse(
      localStorage.getItem("allowAccessGallery")
    );

    if (!allowAccessGallery) {
      alert(GALLERY.NO_PERMISSIONS);
      navigate("/");
    }
  }, [navigate]);

  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const loadedImages = [];
    for (let i = 1; i <= imageCount; i++) {
      loadedImages.push(`${folderPath}/${i}.jpg`);
    }

    setImages(loadedImages);
  }, [folderPath, imageCount]);

  const handleClick = (index) => {
    const name = index + 1;
    const imgPath = `${folderPath}/${name}.jpg`;

    const img = new Image();
    img.onload = () => {
      setCurrentIndex(index);
      setOpen(true);
    };
    img.onerror = () => {
      console.warn(`Image not found: ${imgPath}`);
    };

    img.src = imgPath;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return;

      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, goToPrev, goToNext]);

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 2,
        }}
      >
        {images.map((src, index) => (
          <Box
            key={index}
            component="img"
            src={src}
            alt={`img-${index}`}
            onClick={() => handleClick(index)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/my-gallery/fallback.jpg";
              e.target.style.cursor = "not-allowed";
            }}
            sx={{
              width: "50%",
              aspectRatio: "1 / 1",
              objectFit: "cover",
              cursor: "pointer",
              borderRadius: 1,
              mt: 7,
              ml: 5,
              border: "solid 10px #f2f2f2",
              borderBottom: "solid 3vh #f2f2f2",
              boxShadow: "0 0 20px rgba(0,0,0,0.4)",
            }}
          />
        ))}
      </Box>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={false}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "black",
              height: "100%",
              width: "100%",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
          }}
        >
          <IconButton onClick={handleClose} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Left Arrow */}
          <IconButton
            onClick={goToPrev}
            sx={{
              position: "absolute",
              left: 20,
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {/* Image */}
          <Box
            component="img"
            src={images[currentIndex]}
            alt={`fullscreen-${currentIndex}`}
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />

          {/* Right Arrow */}
          <IconButton
            onClick={goToNext}
            sx={{
              position: "absolute",
              right: 20,
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          {/* Optional Image Counter */}
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              px: 2,
              py: 0.5,
              borderRadius: 1,
            }}
          >
            {currentIndex + 1} / {images.length}
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};

export default Gallery;
