import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Torus } from "@react-three/drei";
import { useState, useMemo, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import {
  COLORS,
  TIMINGS,
  TIME_FULFILLED,
  LABELS,
  TARGET_DATE,
  MODAL,
  RIDDLE,
  REVEAL,
  GALLERY,
} from "../../config/env";

const GiftBox = ({ isOpen, onDoubleClick }) => {
  const [isTrembling, setIsTrembling] = useState(false);
  const lastTapRef = useRef(0);
  const { size } = useThree();
  const screenWidth = size.width;

  const scaleFactor = useMemo(() => {
    if (screenWidth < 600) return 0.75;
    if (screenWidth < 1000) return 0.75;
    return 1;
  }, [screenWidth]);

  // Trembling animation
  const trembleSpring = useSpring({
    rotation:
      isTrembling && !isOpen
        ? [
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1,
          ]
        : [0, 0, 0],
    config: { tension: 130, friction: 1 },
    onRest: () => {
      if (isTrembling) setIsTrembling(false);
    },
  });

  const startTremble = () => {
    setIsTrembling(true);
    setTimeout(() => {
      setIsTrembling(false);
    }, 100);
  };

  // Lid animation
  const lidSpring = useSpring({
    rotation: isOpen ? [-Math.PI / 2, 0, 0] : [0, 0, 0],
    position: isOpen ? [0, 1.6, -1] : [0, 1.3, 0],
    config: { tension: 120, friction: 14 },
  });

  const handleClick = (e) => {
    startTremble();

    if (e.nativeEvent.pointerType === "touch") {
      const now = Date.now();
      const timeSince = now - lastTapRef.current;
      if (timeSince < 300 && timeSince > 0) {
        onDoubleClick();
      }
      lastTapRef.current = now;
    }
  };

  return (
    <animated.group
      position={[0, -0.5, 0]}
      scale={[scaleFactor, scaleFactor, scaleFactor]}
      rotation={trembleSpring.rotation}
    >
      {/* Hollow box base */}
      <Box args={[2, 0.95, 2]} position={[0, 0.5, 0]} castShadow>
        <meshStandardMaterial color={COLORS.BOX} />
      </Box>
      <Box args={[0.1, 1.5, 2]} position={[-0.95, 0.8, 0]}>
        <meshStandardMaterial color={COLORS.BOX} />
      </Box>
      <Box args={[0.1, 1.5, 2]} position={[0.95, 0.8, 0]}>
        <meshStandardMaterial color={COLORS.BOX} />
      </Box>
      <Box args={[2, 1.5, 0.1]} position={[0, 0.8, -0.95]}>
        <meshStandardMaterial color={COLORS.BOX} />
      </Box>
      <Box args={[2, 1.5, 0.1]} position={[0, 0.8, 0.95]}>
        <meshStandardMaterial color={COLORS.BOX} />
      </Box>

      {/* Ribbons on base */}
      <Box args={[0.2, 1.6, 2.01]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color={COLORS.RIBBON} />
      </Box>
      <Box args={[2.1, 0.2, 2.01]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color={COLORS.RIBBON} />
      </Box>

      {/* Inside shadow and resize sides */}
      {isOpen && (
        <>
          <Box args={[1.8, 1.3, 1.8]} position={[0, 0.97, 0]}>
            <meshStandardMaterial color={COLORS.SHADOW_INSIDE} />
          </Box>

          <Box args={[0.1, 1.5, 2]} position={[-0.95, 0.89, 0]}>
            <meshStandardMaterial color={COLORS.BOX} />
          </Box>

          <Box args={[0.1, 1.5, 2]} position={[0.95, 0.89, 0]}>
            <meshStandardMaterial color={COLORS.BOX} />
          </Box>

          <Box args={[2, 1.5, 0.1]} position={[0, 0.89, 0.95]}>
            <meshStandardMaterial color={COLORS.BOX} />
          </Box>
        </>
      )}

      {/* Lid with bow */}
      <animated.group
        position={lidSpring.position}
        rotation={lidSpring.rotation}
        onClick={handleClick}
        onDoubleClick={onDoubleClick}
      >
        <Box args={[2, 0.45, 2]} castShadow>
          <meshStandardMaterial color={COLORS.BOX} />
        </Box>

        {/* Bow */}
        <Torus
          args={[0.3, 0.07, 16, 100]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[-0.4, 0.3, 0]}
        >
          <meshStandardMaterial color={COLORS.BOW} />
        </Torus>
        <Torus
          args={[0.3, 0.07, 16, 100]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0.4, 0.3, 0]}
        >
          <meshStandardMaterial color={COLORS.BOW} />
        </Torus>
        <Box args={[0.2, 0.2, 0.2]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color={COLORS.BOW} />
        </Box>
      </animated.group>
    </animated.group>
  );
};

export default function GiftBoxAnnouncement() {
  const [showRiddle, setShowRiddle] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState("");
  const [modalSource, setModalSource] = useState(null);

  useEffect(() => {
    const targetDate = new Date(TARGET_DATE);

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeRemaining(TIME_FULFILLED);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining(
        `${days} ${LABELS.DAYS} ${hours} ${LABELS.HOURS} ${minutes} ${LABELS.MINUTES} ${seconds} ${LABELS.SECONDS}`
      );
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, []);

  const handleAnswer = () => {
    if (RIDDLE.CORRECT_ANSWERS.includes(userAnswer.toLowerCase().trim())) {
      setAnswered(true);
    } else {
      setModalText(MODAL.WRONG_ANSWER);
      setShowModal(true);
    }
  };

  const handleWarning = () => {
    setModalText(REVEAL.SECRET_TEXT);
    setShowModal(true);
  };

  const handleWarningAndGallery = () => {
    setModalText(REVEAL.SECRET_TEXT);
    setShowModal(true);

    localStorage.setItem("allowAccessGallery", JSON.stringify(true));

    setModalSource("galleryRedirect");
  };

  const handleBoxOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setShowRiddle(true), TIMINGS.SHOW_RIDDLE_DELAY);
    }
  };

  const handleCloseModal = () => {
    if (modalSource === "galleryRedirect") {
      setModalSource(null);
      setTimeout(() => navigate("/Gallery"), 250);
    } else {
      setShowModal(false);
      setModalSource(null);
    }
  };

  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Canvas shadows camera={{ position: [4, 4, 6], fov: 35 }}>
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <GiftBox isOpen={isOpen} onDoubleClick={handleBoxOpen} />

        <OrbitControls enableZoom={false} />
      </Canvas>
      {/* UI Overlays */}
      {showRiddle && !answered && (
        <div
          // @ts-ignore
          style={styles.riddleBox}
        >
          <h2 style={styles.riddleHead}>{RIDDLE.HEAD}</h2>
          <p
            // @ts-ignore
            style={styles.riddleText}
          >
            {RIDDLE.TEXT}
          </p>
          <p
            // @ts-ignore
            style={styles.riddleText}
          >
            {RIDDLE.GUESS}
          </p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            style={styles.input}
            placeholder={RIDDLE.INPUT_PLACEHOLDER}
          />
          <button onClick={handleAnswer} style={styles.button}>
            {RIDDLE.SEND_ANSWER}
          </button>
        </div>
      )}
      {answered && (
        <div
          // @ts-ignore
          style={styles.revealBox}
        >
          <h2 style={styles.revealHead}>
            {process.env.REACT_APP_REVEAL_HEAD_TEXT}
          </h2>
          <p style={styles.revealText}>{process.env.REACT_APP_REVEAL_TEXT}</p>
          {TARGET_DATE instanceof Date && !isNaN(TARGET_DATE.getTime()) && (
            <p style={styles.revealCountdown}>⏳ {timeRemaining}</p>
          )}
          <img
            src={REVEAL.IMAGE_SRC}
            alt={REVEAL.IMAGE_ALT}
            style={styles.revealImg}
          />
          <button
            onClick={() => {
              if (GALLERY.REDIRECT) {
                handleWarningAndGallery();
              } else {
                handleWarning();
              }
            }}
            style={{ ...styles.button, width: "75%" }}
          >
            {REVEAL.CONTINUE}
          </button>
        </div>
      )}
      {/* Custom modal for incorrect answer or warning */}
      {showModal && (
        <div
          // @ts-ignore
          style={styles.modal}
        >
          <div
            // @ts-ignore
            style={styles.modalContent}
          >
            <h3 style={styles.modalHeader}>{MODAL.HINT}</h3>
            <p style={{ ...styles.modalText, whiteSpace: "pre-line" }}>
              {modalText}
            </p>
            <button onClick={handleCloseModal} style={styles.modalButton}>
              {MODAL.CLOSE}
            </button>
          </div>
        </div>
      )}
      c
    </div>
  );
}

const styles = {
  riddleBox: {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translateX(-50%)",
    background: "white",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    textAlign: "center",
    zIndex: 10,
    color: "black",
    width: "30%",
    minWidth: "350px",
  },
  riddleText: {
    fontSize: "15pt",
    width: "80%",
    textAlign: "center",
    margin: "0 auto",
  },
  riddleHead: {
    fontSize: "22pt",
  },
  revealText: {
    fontSize: "20pt",
  },
  revealCountdown: {
    fontSize: "18pt",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    marginTop: "1.1rem",
    width: "75%",
    border: "solid 1px black",
    borderRadius: "5px",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    background: COLORS.PRIMARY,
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    width: "50%",
    height: "40px",
  },
  revealBox: {
    position: "absolute",
    top: "4vh",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    background: "white",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    zIndex: 10,
    color: "black",
    minWidth: "350px",
  },
  revealImg: {
    borderRadius: "1rem",
    marginTop: "0.2rem",
    maxWidth: "100%",
    maxHeight: "400px",
    height: "auto",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.7)",
    marginBottom: "5px",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  modalContent: {
    background: "white",
    padding: "2rem",
    borderRadius: "1rem",
    width: "80%",
    maxWidth: "450px",
    textAlign: "center",
  },
  modalHeader: {
    fontSize: "20pt",
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  modalText: {
    fontSize: "16pt",
    color: "black",
  },
  modalButton: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    background: COLORS.PRIMARY,
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    width: "60%",
    height: "40px",
  },
};
