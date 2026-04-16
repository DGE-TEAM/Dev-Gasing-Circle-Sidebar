import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import { action } from "@ember/object";

// ============================================================
// Helper: ekstrak URL upload dari nilai setting type:upload.
// Discourse theme settings type:upload mengembalikan URL string
// (seperti "/uploads/default/original/1X/abc.png") atau "" jika kosong.
// ============================================================
function extractUploadUrl(settingValue) {
  if (!settingValue) return null;
  // Kalau berupa string URL (dari Discourse upload), kembalikan apa adanya
  const val = String(settingValue).trim();
  if (val.startsWith("/") || val.startsWith("http")) return val;
  return null;
}

// ============================================================
// NAV ITEMS — Setiap item memiliki:
//   iconUrl  → URL gambar jika admin upload (null jika tidak)
//   iconSvg  → SVG inline fallback (selalu ada)
// Template akan pakai iconUrl jika ada, jika tidak pakai iconSvg.
// ============================================================
function buildNavItems(s) {
  return [
    {
      id: "home",
      label: "Home",
      href: "/",
      iconUrl: extractUploadUrl(s.gs_icon_home),
      iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    },
    {
      id: "news",
      label: "Gasing Academy News",
      href: "/c/ga-updates",
      iconUrl: extractUploadUrl(s.gs_icon_news),
      iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>`,
    },
    {
      id: "komunitas",
      label: "Komunitas",
      href: "/c/general",
      iconUrl: extractUploadUrl(s.gs_icon_komunitas),
      iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      children: [
        { id: "forum", label: "Forum", href: "/c/general/forum", dot: true },
        {
          id: "challenge",
          label: "Challenge",
          href: "/c/general/challenges/",
          dot: true,
        },
        {
          id: "members",
          label: "All Members",
          href: "/c/general/all-members/",
        },
      ],
    },
    {
      id: "konten",
      label: "Konten Eksklusif",
      href: "/c/downloads",
      iconUrl: extractUploadUrl(s.gs_icon_konten),
      iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>`,
    },
    {
      id: "meetup",
      label: "Virtual Meetup",
      href: "/c/webinar",
      iconUrl: extractUploadUrl(s.gs_icon_meetup),
      iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
    },
    {
      id: "materi",
      label: "Materi Gasing",
      href: "/c/gasing-library",
      iconUrl: extractUploadUrl(s.gs_icon_materi),
      iconSvg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
      children: [
        {
          id: "trainer",
          label: "Materi Trainer Utama",
          href: "/c/gasing-library/materi-trainer-utama/",
        },
        {
          id: "permainan",
          label: "Permainan di Pelatihan",
          href: "/c/gasing-library/permainan-pelatihan/",
          dot: true,
        },
        {
          id: "musik",
          label: "Musik Gasing",
          href: "/c/gasing-library/musik-gasing/",
        },
        {
          id: "minigames",
          label: "Mini Games",
          href: "/c/gasing-library/mini-games/",
        },
        {
          id: "thinkplay",
          label: "Gasing Think & Play",
          href: "/c/gasing-library/gasing-shop/",
        },
      ],
    },
  ];
}

export default class GasingSidebar extends Component {
  @service currentUser;
  @service router;

  @tracked collapsed = false;
  @tracked openGroups = new Set();

  constructor() {
    super(...arguments);
    // Buka group yang anaknya cocok dengan URL saat ini
    const path = window.location.pathname;
    this.navItems.forEach((item) => {
      if (item.children) {
        const match = item.children.some(
          (c) => c.href && path.startsWith(c.href),
        );
        if (match) this.openGroups.add(item.id);
      }
    });
  }

  // Returns true when the current Ember route is any admin route.
  get isAdminRoute() {
    return this.router.currentRouteName?.startsWith("admin") ?? false;
  }

  // Baca theme settings global yang disediakan Discourse theme system.
  get navItems() {
    // eslint-disable-next-line no-undef
    const s = typeof settings !== "undefined" ? settings : {};
    return buildNavItems(s);
  }

  // Logo URL dari settings atau null (fallback ke teks "GC").
  get logoUrl() {
    // eslint-disable-next-line no-undef
    const val = typeof settings !== "undefined" ? settings.gs_logo_url : "";
    return extractUploadUrl(val) || (val && String(val).trim()) || null;
  }

  get displayName() {
    return this.currentUser?.name || this.currentUser?.username || null;
  }

  get username() {
    return this.currentUser?.username;
  }

  get userAvatarUrl() {
    if (!this.currentUser) return null;
    return (this.currentUser.avatar_template || "").replace("{size}", "40");
  }

  get isLoggedIn() {
    return !!this.currentUser;
  }

  get displayInitial() {
    return (this.displayName || "?").charAt(0).toUpperCase();
  }

  @action
  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  @action
  toggleGroup(id) {
    const next = new Set(this.openGroups);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.openGroups = next;
  }

  @action
  isGroupOpen(id) {
    return this.openGroups.has(id);
  }

  @action
  isActive(href) {
    if (!href) return false;
    const path = this.router.currentURL?.split("?")[0] ?? "";
    return href === "/" ? path === "/" : path.startsWith(href);
  }
}
