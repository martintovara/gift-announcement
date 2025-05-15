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

  useEffect(() => {
    const loadedImages = [];
    for (let i = 1; i <= imageCount; i++) {
      loadedImages.push(`${folderPath}/${i}.jpg`);
    }

    setImages(loadedImages);
  }, [folderPath, imageCount]);

  const ARR_IMGS_DESCRIPTIONS = GALLERY.IMGS_DESCRIPTIONS.split(",");

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
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 5,
              ml: 5,
              mr: 5,
              mb: 5,
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "50%",
                aspectRatio: "1 / 1",
                borderRadius: 1,
                overflow: "hidden",
                border: "solid 10px #f2f2f2",
                boxShadow: "0 0 20px rgba(0,0,0,0.4)",
                cursor: "pointer",
                minHeight: "120px",
                minWidth: "120px",
                backgroundColor: "#f2f2f2",
                transition: "transform 0.4s ease-in-out",
                transformOrigin: "center center",
                willChange: "transform",
                "&:hover": {
                  transform: "scale(1.07)",
                },
              }}
              onClick={() => handleClick(index)}
            >
              <Box
                component="img"
                src={src}
                alt={`img-${index}`}
                draggable={false}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/my-gallery/fallback.jpg";
                  e.target.style.cursor = "not-allowed";
                }}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: 1,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  px: 1,
                  py: 0.55,
                  backgroundColor: "rgba(242, 242, 242, 0.9)",
                  textAlign: "center",
                  fontSize: "clamp(0.7rem, 1.5vw, 1rem)",
                  color: "#444",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: {
                    xs: "normal",
                    sm: "nowrap",
                  },
                }}
              >
                {ARR_IMGS_DESCRIPTIONS[index] || ""}
              </Box>
            </Box>
          </Box>
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
            <CloseIcon sx={{ color: "white" }} />
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
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/my-gallery/fallback.jpg";
              e.target.style.cursor = "not-allowed";
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
