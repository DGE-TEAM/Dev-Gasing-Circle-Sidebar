import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "gasing-sidebar-init",
  initialize() {
    withPluginApi("1.6.0", (api) => {
      // =============================================
      // 1. DAFTARKAN CUSTOM SIDEBAR SECTIONS & LINKS
      // =============================================
      api.addSidebarSection(
        (BaseCustomSidebarSection, BaseCustomSidebarSectionLink) => {
          // ---- Main Navigation Links ----
          class GCHomeLink extends BaseCustomSidebarSectionLink {
            get name() {
              return "gc-home";
            }
            get route() {
              return "discovery.latest";
            }
            get title() {
              return "Home";
            }
            get text() {
              return "Home";
            }
            get prefixType() {
              return "icon";
            }
            get prefixValue() {
              return "house";
            }
          }

          class GCNewsLink extends BaseCustomSidebarSectionLink {
            get name() {
              return "gc-news";
            }
            get route() {
              return "discovery.latest";
            } // ganti ke route yg sesuai
            get title() {
              return "Gasing Academy News";
            }
            get text() {
              return "Gasing Academy News";
            }
            get prefixType() {
              return "icon";
            }
            get prefixValue() {
              return "newspaper";
            }
          }

          class GCKomunitasLink extends BaseCustomSidebarSectionLink {
            get name() {
              return "gc-komunitas";
            }
            get route() {
              return "discovery.latest";
            }
            get title() {
              return "Komunitas";
            }
            get text() {
              return "Komunitas";
            }
            get prefixType() {
              return "icon";
            }
            get prefixValue() {
              return "users";
            }
          }

          class GCKontenLink extends BaseCustomSidebarSectionLink {
            get name() {
              return "gc-konten";
            }
            get route() {
              return "discovery.latest";
            }
            get title() {
              return "Konten Eksklusif";
            }
            get text() {
              return "Konten Eksklusif";
            }
            get prefixType() {
              return "icon";
            }
            get prefixValue() {
              return "star";
            }
          }

          class GCMeetUpLink extends BaseCustomSidebarSectionLink {
            get name() {
              return "gc-meetup";
            }
            get route() {
              return "discovery.latest";
            }
            get title() {
              return "Virtual Meetup";
            }
            get text() {
              return "Virtual Meetup";
            }
            get prefixType() {
              return "icon";
            }
            get prefixValue() {
              return "video";
            }
          }

          class GCMateriLink extends BaseCustomSidebarSectionLink {
            get name() {
              return "gc-materi";
            }
            get route() {
              return "discovery.latest";
            }
            get title() {
              return "Materi Gasing";
            }
            get text() {
              return "Materi Gasing";
            }
            get prefixType() {
              return "icon";
            }
            get prefixValue() {
              return "book";
            }
          }

          // ---- Section (container untuk semua links) ----
          return class GCMainNavSection extends BaseCustomSidebarSection {
            get name() {
              return "gc-main-nav";
            }
            get title() {
              return "";
            } // Kosongkan agar tidak ada header section
            get text() {
              return "";
            }
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
        },
      );

      // =============================================
      // 2. TOGGLE COLLAPSE LOGIC
      // =============================================
      const STORAGE_KEY = "gc_sidebar_collapsed";

      // Restore state dari localStorage saat load
      api.onPageChange(() => {
        const isCollapsed = localStorage.getItem(STORAGE_KEY) === "true";
        document.body.classList.toggle("gc-sidebar-collapsed", isCollapsed);
        updateToggleIcon(isCollapsed);
        injectToggleButton(api);
      });

      function updateToggleIcon(isCollapsed) {
        const icon = document.querySelector(".gc-sidebar-toggle-btn .d-icon");
        if (!icon) return;
        // Icon rotate dihandle via CSS class di body
      }

      function injectToggleButton(api) {
        // Cek apakah tombol sudah ada
        if (document.querySelector(".gc-sidebar-toggle-btn")) return;

        const sidebarHeader = document.querySelector(
          ".sidebar-header, .sidebar-wrapper .sidebar-logo",
        );
        if (!sidebarHeader) return;

        const btn = document.createElement("button");
        btn.className = "gc-sidebar-toggle-btn btn-flat btn no-text";
        btn.setAttribute("aria-label", "Toggle Sidebar");
        btn.innerHTML = `
          <svg class="fa d-icon d-icon-chevron-left svg-icon" aria-hidden="true">
            <use href="#chevron-left"></use>
          </svg>
        `;

        btn.addEventListener("click", () => {
          const isNowCollapsed = document.body.classList.toggle(
            "gc-sidebar-collapsed",
          );
          localStorage.setItem(STORAGE_KEY, isNowCollapsed);
        });

        sidebarHeader.style.position = "relative";
        sidebarHeader.appendChild(btn);
      }
    });
  },
};
