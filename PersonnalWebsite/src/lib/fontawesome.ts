import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Next.js handles the Font Awesome CSS import above, so disable the
// runtime injection that would otherwise cause icons to flash full-size.
config.autoAddCss = false;
