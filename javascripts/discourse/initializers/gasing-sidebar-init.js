import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "gasing-sidebar-init",
  initialize() {
    withPluginApi("1.6.0", (api) => {

      // ================================================
      // STEP 1: Daftarkan Custom Navigation Section
      // ================================================
      api.addSidebarSection(
        (BaseCustomSidebarSection, BaseCustomSidebarSectionLink) => {

          // Helper untuk buat link dengan cepat
          function makeLink(name, text, icon, href) {
            return class extends BaseCustomSidebarSectionLink {
              get name() { return name; }
              get href() { return href; }
              get title() { return text; }
              get text() { return text; }
              get prefixType() { return "icon"; }
              get prefixValue() { return icon; }
            };
          }

          const GCHomeLink       = makeLink("gc-home",     "Home",               "house",    "/");
          const GCNewsLink       = makeLink("gc-news",     "Gasing Academy News","newspaper","/c/news");
          const GCKomunitasLink  = makeLink("gc-komunitas","Komunitas",          "users",    "/c/komunitas");
          const GCKontenLink     = makeLink("gc-konten",   "Konten Eksklusif",   "star",     "/c/konten");
          const GCMeetUpLink     = makeLink("gc-meetup",   "Virtual Meet-Up",    "video",    "/c/meetup");
          const GCMateriLink     = makeLink("gc-materi",   "Materi Gasing",      "book",     "/c/materi");

          return class GCMainNavSection extends BaseCustomSidebarSection {
            get name() { return "gc-main-nav"; }
            get title() { return ""; }
            get text() { return ""; }
            get links() {
              return [
                new GCHomeLink(),
                new GCNewsLink(),
                new GCKomunitasLink(),
                new GCKontenLink(),
                new GCMeetUpLink(),
                new GCMateriLink(),
              ];
            }
          };
        }
      );

      // ================================================
      // STEP 2: Inject Logo Header + Toggle Button
      // ================================================
      const STORAGE_KEY = "gc_sidebar_collapsed";

      function getIsCollapsed() {
        return localStorage.getItem(STORAGE_KEY) === "true";
      }

      function applyCollapsedState(collapsed) {
        document.body.classList.toggle("gc-collapsed", collapsed);
      }

      function injectSidebarHeader() {
        // Cegah duplikat
        if (document.querySelector(".gc-sidebar-header")) return;

        // Cari wrapper paling atas di dalam sidebar
        const sidebarWrapper = document.querySelector(".sidebar-wrapper");
        if (!sidebarWrapper) return;

        // Buat elemen header
        const header = document.createElement("div");
        header.className = "sidebar-header gc-sidebar-header";
        header.innerHTML = `
          <div class="gc-logo-area">
            <div class="gc-logo-box">GC</div>
            <span class="gc-logo-text">GC LOGO</span>
          </div>
          <button class="gc-toggle-btn" aria-label="Toggle Sidebar">
            <svg viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        `;

        // Sisipkan sebagai anak pertama sidebar
        sidebarWrapper.insertBefore(header, sidebarWrapper.firstChild);

        // Event listener untuk toggle
        header.querySelector(".gc-toggle-btn").addEventListener("click", () => {
          const nowCollapsed = !getIsCollapsed();
          localStorage.setItem(STORAGE_KEY, nowCollapsed);
          applyCollapsedState(nowCollapsed);
        });
      }

      // ================================================
      // STEP 3: Jalankan saat setiap page change
      // ================================================
      api.onPageChange(() => {
        // Restore collapsed state dari localStorage
        applyCollapsedState(getIsCollapsed());

        // Inject header dengan sedikit delay agar DOM Discourse sudah siap
        setTimeout(() => {
          injectSidebarHeader();
        }, 100);
      });

    });
  },
};
