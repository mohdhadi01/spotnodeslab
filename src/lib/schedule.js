/**
 * Generates the next open days for the intro-call scheduler.
 * Returns [{ iso, weekday, dayNum, month, full }] — `daysAhead` open days,
 * scanned up to 45 calendar days ahead. Weekends skipped when requested.
 */
export function nextOpenDays(daysAhead = 14, skipWeekend = true) {
  const out = [];
  const d = new Date();
  d.setDate(d.getDate() + 1); // start from tomorrow
  let guard = 0;
  while (out.length < daysAhead && guard < 60) {
    const dow = d.getDay();
    const isWeekend = dow === 0 || dow === 6;
    if (!(skipWeekend && isWeekend)) {
      out.push({
        iso: d.toISOString().slice(0, 10),
        weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: String(d.getDate()).padStart(2, "0"),
        month: d.toLocaleDateString("en-US", { month: "short" }),
        full: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      });
    }
    d.setDate(d.getDate() + 1);
    guard += 1;
  }
  return out;
}

/** Fires a preselect event consumed by the Connect section's scheduler. */
export function requestSlot(detail) {
  window.dispatchEvent(new CustomEvent("sn:select-slot", { detail }));
}

/** Fires a message-prefill event consumed by the Connect section's form. */
export function prefillMessage(text) {
  window.dispatchEvent(new CustomEvent("sn:prefill-message", { detail: { text } }));
}
