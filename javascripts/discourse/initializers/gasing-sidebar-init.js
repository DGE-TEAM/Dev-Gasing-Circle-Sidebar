import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "gasing-sidebar-init",
  initialize() {
    withPluginApi("1.0.0", (api) => {

      // ── 1. Matikan sidebar bawaan Discourse ──────────────────────────────
      // Discourse mengelola sidebar lewat body classes dan inline styles.
      // Fungsi ini memastikan tidak ada konflik layout dengan sidebar kustom kita.
      const killDiscourseSidebar = () => {
        document.body.classList.remove(
          "has-sidebar-page",
          "sidebar-animate",
          "sidebar--visible"
        );
        // Bersihkan margin/padding yang mungkin di-inject Discourse
        const wrap = document.querySelector(".wrap");
        if (wrap) {
          wrap.style.removeProperty("padding-left");
          wrap.style.removeProperty("margin-left");
        }
        const outlet = document.querySelector("#main-outlet-wrapper");
        if (outlet) {
          outlet.style.removeProperty("padding-left");
          outlet.style.removeProperty("margin-left");
        }
      };

      // ── 2. Sync state collapsed sidebar → body class ─────────────────────
      // MutationObserver memantau class di .gs-sidebar dan mengupdate
      // body.gs-collapsed secara reaktif, sehingga CSS padding-left body
      // ikut berubah saat sidebar di-collapse/expand.
      let sidebarObserver = null;

      const syncCollapseState = () => {
        const sidebar = document.querySelector(".gs-sidebar");
        if (!sidebar) return;

        if (sidebarObserver) {
          sidebarObserver.disconnect();
        }

        sidebarObserver = new MutationObserver(() => {
          const isCollapsed = sidebar.classList.contains("gs-sidebar--collapsed");
          document.body.classList.toggle("gs-collapsed", isCollapsed);
          killDiscourseSidebar();
        });

        sidebarObserver.observe(sidebar, {
          attributes: true,
          attributeFilter: ["class"],
        });

        // Set state awal
        const isCollapsed = sidebar.classList.contains("gs-sidebar--collapsed");
        document.body.classList.toggle("gs-collapsed", isCollapsed);
      };

      // ── 3. Jalankan setiap kali route berubah (Ember router) ──────────────
      api.onPageChange(() => {
        requestAnimationFrame(() => {
          killDiscourseSidebar();
          syncCollapseState();
        });
      });

      // ── 4. Jalankan sekali saat pertama load ─────────────────────────────
      requestAnimationFrame(() => {
        killDiscourseSidebar();
        syncCollapseState();
      });
    });
  },
};
