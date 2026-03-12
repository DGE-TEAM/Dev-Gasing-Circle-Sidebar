import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "gasing-sidebar-init",
  initialize() {
    withPluginApi("0.8", (api) => {
      // Tambahkan class khusus ke body untuk memudahkan styling CSS
      api.onPageChange(() => {
        document.body.classList.add("custom-gasing-sidebar");
      });

      // Logika tambahan jika kamu ingin memodifikasi link bisa ditaruh di sini
    });
  },
};
