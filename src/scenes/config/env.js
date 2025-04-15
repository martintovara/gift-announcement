export const COLORS = {
  BOX: process.env.REACT_APP_COLOR_BOX,
  RIBBON: process.env.REACT_APP_COLOR_RIBBON,
  BOW: process.env.REACT_APP_COLOR_BOW,
  SHADOW_INSIDE: process.env.REACT_APP_COLOR_SHADOW_INSIDE,
  PRIMARY: process.env.REACT_APP_COLOR_PRIMARY,
};

export const TIMINGS = {
  SHOW_RIDDLE_DELAY: Number(process.env.REACT_APP_TIMING_SHOW_RIDDLE_DELAY),
};

export const TIME_FULFILLED = process.env.REACT_APP_TIME_FULFILLED;

export const LABELS = {
  DAYS: process.env.REACT_APP_LABEL_DAYS || "d",
  HOURS: process.env.REACT_APP_LABEL_HOURS || "h",
  MINUTES: process.env.REACT_APP_LABEL_MINUTES || "m",
  SECONDS: process.env.REACT_APP_LABEL_SECONDS || "s",
};

export const TARGET_DATE = new Date(process.env.REACT_APP_TARGET_DATE);

export const MODAL = {
  CLOSE: process.env.REACT_APP_MODAL_BUTTON_TEXT,
  WRONG_ANSWER: process.env.REACT_APP_MODAL_TEXT_WRONG_ANSWER,
  HINT: process.env.REACT_APP_MODAL_HINT,
};

export const RIDDLE = {
  CORRECT_ANSWERS:
    process.env.REACT_APP_RIDDLE_CORRECT_ANSWERS?.split(",") || [],
  HEAD: process.env.REACT_APP_RIDDLE_HEAD,
  TEXT: process.env.REACT_APP_RIDDLE_TEXT,
  INPUT_PLACEHOLDER: process.env.REACT_APP_RIDDLE_INPUT_PLACEHOLDER,
  SEND_ANSWER: process.env.REACT_APP_RIDDLE_SEND_ANSWER,
};

export const REVEAL = {
  IMAGE_ALT: process.env.REACT_APP_REVEAL_IMAGE_ALT,
  IMAGE_SRC: process.env.REACT_APP_REVEAL_IMAGE_SRC,
  SECRET_TEXT: process.env.REACT_APP_REVEAL_SECRET_TEXT,
};

/* console.log({
  COLORS,
  TIMINGS,
  TIME_FULFILLED,
  LABELS,
  TARGET_DATE,
  MODAL,
  RIDDLE,
  REVEAL,
}); */
