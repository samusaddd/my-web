"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

let hasPlayedIntro = false;

export function HomeIntro() {
  const reducedMotion = useReducedMotion() ?? false;
  const [visible, setVisible] = useState(!hasPlayedIntro);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) {
      return;
    }

    hasPlayedIntro = true;

    const leaveDelay = window.setTimeout(() => {
      setLeaving(true);
    }, reducedMotion ? 900 : 1650);

    const removeDelay = window.setTimeout(() => {
      setVisible(false);
    }, reducedMotion ? 1250 : 2140);

    return () => {
      window.clearTimeout(leaveDelay);
      window.clearTimeout(removeDelay);
    };
  }, [reducedMotion, visible]);

  useEffect(() => {
    if (!visible) return;

    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          animate={leaving ? { opacity: 0, backdropFilter: "blur(0px)" } : { opacity: 1, backdropFilter: "blur(10px)" }}
          className="fixed inset-0 z-[140] flex items-center justify-center bg-[#05070d]"
          exit={{ opacity: 0 }}
          initial={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.3 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(80rem_80rem_at_20%_-10%,rgba(34,211,238,0.12),transparent_55%),radial-gradient(72rem_72rem_at_85%_0%,rgba(168,85,247,0.11),transparent_52%),linear-gradient(180deg,rgba(5,7,13,0.78),rgba(5,7,13,0.94))]"
          />

          <motion.div
            animate={leaving ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
            className="relative z-10 flex max-w-3xl flex-col items-center px-6 text-center"
            initial={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.25 : 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-serif text-white sm:text-5xl"
              initial={{ opacity: 0, y: 12 }}
              transition={{
                duration: reducedMotion ? 0.25 : 0.6,
                delay: reducedMotion ? 0 : 0.12,
              }}
            >
              I&apos;m Samir Seddiqi.
            </motion.p>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm uppercase text-white/56 sm:text-base"
              initial={{ opacity: 0, y: 12 }}
              transition={{
                duration: reducedMotion ? 0.25 : 0.6,
                delay: reducedMotion ? 0.1 : 0.48,
              }}
            >
              Welcome to my personal website.
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
