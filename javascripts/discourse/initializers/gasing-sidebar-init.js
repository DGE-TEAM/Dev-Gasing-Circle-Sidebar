import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "gasing-sidebar-init",
  initialize() {
    withPluginApi("1.0.0", (api) => {
      // ✅ Helper: is the current Ember route an admin route?
      const isAdminRoute = () => {
        // api.container gives us access to any Ember service by name
        const router = api.container.lookup("service:router");
        const routeName = router?.currentRouteName || "";
        return routeName.startsWith("admin");
      };

      // Strip the layout classes/styles Discourse injects for its own sidebar.
      // ✅ ONLY called on non-admin routes — admin routes need these classes intact.
      const killDiscourseSidebar = () => {
        if (isAdminRoute()) return; // ← guard: leave admin layout alone

        document.body.classList.remove(
          "has-sidebar-page",
          "sidebar-animate",
          "sidebar--visible",
        );
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

      // Sync .gs-collapsed on <body> to match the Glimmer component's collapsed state.
      // ✅ Also guarded — no observer needed on admin pages.
      let sidebarObserver = null;

      const syncCollapseState = () => {
        if (isAdminRoute()) {
          // Clean up any lingering observer and body class when entering admin
          if (sidebarObserver) {
            sidebarObserver.disconnect();
            sidebarObserver = null;
          }
          document.body.classList.remove("gs-collapsed");
          return;
        }

        const sidebar = document.querySelector(".gs-sidebar");
        if (!sidebar) return;

        if (sidebarObserver) sidebarObserver.disconnect();

        sidebarObserver = new MutationObserver(() => {
          const isCollapsed = sidebar.classList.contains(
            "gs-sidebar--collapsed",
          );
          document.body.classList.toggle("gs-collapsed", isCollapsed);
          killDiscourseSidebar();
        });

        sidebarObserver.observe(sidebar, {
          attributes: true,
          attributeFilter: ["class"],
        });

        const isCollapsed = sidebar.classList.contains("gs-sidebar--collapsed");
        document.body.classList.toggle("gs-collapsed", isCollapsed);
      };

      // ── Run on every Ember route transition ──
      api.onPageChange(() => {
        requestAnimationFrame(() => {
          killDiscourseSidebar();
          syncCollapseState();
        });
      });

      // ── Run once on first load ──
      requestAnimationFrame(() => {
        killDiscourseSidebar();
        syncCollapseState();
      });
    });
  },
};
