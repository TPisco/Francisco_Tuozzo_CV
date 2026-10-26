import type { CSSProperties } from "react";
import { IntroControl } from "@/components/intro-control";
import { nameBaseline, nameLetters, nameViewBox, nameWidth } from "@/components/intro-name";

const [vx, vy, vw, vh] = nameViewBox.split(" ").map(Number);
const DOT_R = 62;

/**
 * The first thing a visitor sees, once per session: my name drawn stroke by
 * stroke, filled in, a clay dot, then the panel lifts off the page.
 *
 * It's CSS only (see .intro in globals.css), so it always ends on its own, even
 * without JavaScript. A tiny script in the root layout's <head> marks the page
 * to skip it for returning visitors in the same session and for anyone who
 * asked their system for reduced motion; IntroControl lets any key, click,
 * scroll or touch skip it. It's hidden from screen readers: the page under it
 * is already there.
 */
export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <svg className="intro-name" viewBox={`${vx} ${vy} ${vw + DOT_R * 4} ${vh}`} focusable="false">
        {nameLetters.map((letter, i) => (
          <path key={i} d={letter.d} pathLength={1} style={{ "--i": i } as CSSProperties} />
        ))}
        <circle className="intro-dot" cx={nameWidth + DOT_R * 2} cy={nameBaseline - DOT_R} r={DOT_R} />
      </svg>
      <IntroControl />
    </div>
  );
}

/**
 * Runs in <head> before the first paint and decides whether the intro plays
 * (see Intro). Only on the home page, as the way into the site: links straight to Info, a case study or a game open at once.
 */
export const introScript = `(function(){var d=document.documentElement;try{if(location.pathname!=="/"||window.matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem("intro-seen")){d.dataset.intro="skip";return}sessionStorage.setItem("intro-seen","1")}catch(e){}d.dataset.intro="play"})();`;
