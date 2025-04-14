import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Torus } from "@react-three/drei";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/three";

const COLORS = {
  box: "#F9D8A3",
  ribbon: "#ffffff",
  bow: "#ffffff",
  shadowInside: "black",
  primary: "#0275d8",
};

const TIMINGS = {
  showRiddleDelay: 1000,
};

const GiftBox = ({ isOpen, onDoubleClick }) => {
  const lidSpring = useSpring({
    rotation: isOpen ? [-Math.PI / 2, 0, 0] : [0, 0, 0],
    position: isOpen ? [0, 1.6, -1] : [0, 1.3, 0],
    config: { tension: 120, friction: 14 },
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Hollow box base */}
      <Box args={[2, 0.95, 2]} position={[0, 0.5, 0]} castShadow>
        <meshStandardMaterial color={COLORS.box} />
      </Box>
      <Box args={[0.1, 1.5, 2]} position={[-0.95, 0.8, 0]}>
        <meshStandardMaterial color={COLORS.box} />
      </Box>
      <Box args={[0.1, 1.5, 2]} position={[0.95, 0.8, 0]}>
        <meshStandardMaterial color={COLORS.box} />
      </Box>
      <Box args={[2, 1.5, 0.1]} position={[0, 0.8, -0.95]}>
        <meshStandardMaterial color={COLORS.box} />
      </Box>
      <Box args={[2, 1.5, 0.1]} position={[0, 0.8, 0.95]}>
        <meshStandardMaterial color={COLORS.box} />
      </Box>

      {/* Ribbons on base */}
      <Box args={[0.2, 1.6, 2.01]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color={COLORS.ribbon} />
      </Box>
      <Box args={[2.1, 0.2, 2.01]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color={COLORS.ribbon} />
      </Box>

      {/* Inside shadow */}
      {isOpen && (
        <Box args={[1.8, 1.3, 1.8]} position={[0, 0.8, 0]}>
          <meshStandardMaterial color={COLORS.shadowInside} />
        </Box>
      )}

      {/* Lid with bow */}
      <animated.group
        position={lidSpring.position}
        rotation={lidSpring.rotation}
        onDoubleClick={onDoubleClick}
      >
        <Box args={[2, 0.45, 2]} castShadow>
          <meshStandardMaterial color={COLORS.box} />
        </Box>

        {/* Bow */}
        <Torus
          args={[0.3, 0.07, 16, 100]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[-0.4, 0.3, 0]}
        >
          <meshStandardMaterial color={COLORS.bow} />
        </Torus>
        <Torus
          args={[0.3, 0.07, 16, 100]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0.4, 0.3, 0]}
        >
          <meshStandardMaterial color={COLORS.bow} />
        </Torus>
        <Box args={[0.2, 0.2, 0.2]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color={COLORS.bow} />
        </Box>
      </animated.group>
    </group>
  );
};

export default function GiftBoxAnnouncement() {
  const [showRiddle, setShowRiddle] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const correctAnswers = ["dítě", "miminko", "dite", "baby", "mimi"];

  const handleAnswer = () => {
    if (correctAnswers.includes(userAnswer.toLowerCase().trim())) {
      setAnswered(true);
    } else {
      alert("Zkus to znovu 😉");
    }
  };

  const handleBoxOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setShowRiddle(true), TIMINGS.showRiddleDelay);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
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

        <OrbitControls />
      </Canvas>

      {/* UI Overlays */}
      {showRiddle && !answered && (
        <div style={styles.riddleBox}>
          <h2 style={styles.riddleHead}>🎁 Hádej:</h2>
          <p style={styles.riddleText}>
            Jsem malý zázrak, co v bříšku spí, <br />
            za pár měsíců tu s vámi být smí. <br />
            Co to je?
          </p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleAnswer} style={styles.button}>
            Odpovědět
          </button>
        </div>
      )}

      {answered && (
        <div style={styles.revealBox}>
          <h2 style={styles.riddleHead}>🎉 Překvapení!</h2>
          <p style={styles.riddleText}>Čekáme miminko 👶❤️</p>
          <img
            src="./imgs/termin.jpg"
            alt="Miminko"
            style={{
              borderRadius: "1rem",
              marginTop: "1rem",
              maxWidth: "50%",
              height: "auto",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
            }}
          />
        </div>
      )}
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
  },
  riddleText: {
    fontSize: "15pt",
  },
  riddleHead: {
    fontSize: "22pt",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    marginTop: "1rem",
    width: "80%",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    background: COLORS.primary,
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    width: "50%",
    height: "40px",
  },
  revealBox: {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    background: "white",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    zIndex: 10,
    color: "black",
  },
};
