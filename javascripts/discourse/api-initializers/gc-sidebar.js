import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "gc-sidebar-custom",
  initialize() {
    withPluginApi("1.8.0", (api) => {
      // Menghapus section sidebar bawaan jika kamu ingin full custom
      // api.removeSidebarSection("community");

      // Menambahkan section baru untuk "Gasing Academy"
      api.addSidebarSection(
        (baseSection) => {
          baseSection.addLink({
            name: "gc-news",
            route: "discovery.latest", // Ganti dengan route yang sesuai
            text: "Gasing Academy News",
            icon: "newspaper",
          });
          baseSection.addLink({
            name: "gc-exclusive",
            route: "discovery.top", // Ganti dengan route yang sesuai
            text: "Konten Eksklusif",
            icon: "file-alt",
          });
          // Tambahkan link lainnya di sini (Komunitas, Virtual Meet-Up, dll)
        },
        "gc-main-menu",
        { title: "", icon: "" },
      );
    });
  },
};
