// Pre-selects the reader's OS for every <Tabs groupId="os"> set on their first visit.
// Runs at module load, before hydration, so Tabs reads the stored value on a hard first load.
// Only writes when nothing is stored yet, so a tab the reader picked always wins.
// A ?os= query string still takes precedence over storage inside Tabs.
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { createStorageSlot } from '@docusaurus/theme-common';

// Matches the storage key Docusaurus Tabs uses for groupId="os". createStorageSlot applies the site's namespace.
const OS_TAB_STORAGE_KEY = 'docusaurus.tab.os';

function detectOs(platform) {
  const p = (platform || '').toLowerCase();
  if (!p) return null;
  if (/iphone|ipad|ipod|android/.test(p)) return null;
  if (p.startsWith('win')) return 'windows';
  if (p.startsWith('mac')) return 'macos';
  if (p.includes('linux') || p.includes('x11')) return 'linux';
  return null;
}

function preselectOsTab() {
  try {
    const slot = createStorageSlot(OS_TAB_STORAGE_KEY);
    if (slot.get()) return;

    // Phones and tablets keep the default. Android reports a "Linux ..." platform,
    // and an iPad requesting the desktop site reports "MacIntel" with touch points.
    if (navigator.userAgentData?.mobile) return;
    if (/android|iphone|ipad|ipod/i.test(navigator.userAgent || '')) return;
    if (navigator.maxTouchPoints > 1 && /mac/i.test(navigator.platform || '')) return;

    const os = detectOs(navigator.userAgentData?.platform || navigator.platform);
    if (os) slot.set(os);
  } catch {
    // Storage or navigator unavailable; keep the default tab.
  }
}

if (ExecutionEnvironment.canUseDOM) {
  preselectOsTab();
}
