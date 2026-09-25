// Shared between Envelope.tsx and Home.tsx so the flap timing and the
// gallery timing can never drift apart by editing only one file.

// Each flap movement (flatten, then swing) takes this long.
export const FLAP_HALF = 0.25;

// How long the gallery's closing animation takes to tuck the cards back in,
// counting the stagger on the last card (index 3 of 4). The flap only
// starts closing after this, so it never visibly closes on top of a card.
export const GALLERY_CLOSE_DURATION = 0.4;
export const GALLERY_CLOSE_STAGGER = 0.04;
export const GALLERY_CLOSE_TOTAL =
  GALLERY_CLOSE_DURATION + GALLERY_CLOSE_STAGGER * 3;

// Cards wait for both flap movements to finish (open) before they start.
export const GALLERY_OPEN_DELAY = FLAP_HALF * 2;
export const GALLERY_OPEN_STAGGER = 0.1;