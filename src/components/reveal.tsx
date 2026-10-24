"use client";

import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";

// Subtle, usability-focused reveal only — small offset, runs once.
// reducedMotion="user": with the OS setting on, the offset jumps instead of
// sliding, so the reveal is a plain fade (and the server markup is unchanged).
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
