import { createApp } from "vue";
import App from "./ui/App.vue";
import router from "./router";
import store from "./store";
import "./ui/assets/css/tailwind.css";

router.beforeEach(async (to, from, next) => {
    const apiToken = localStorage.getItem("api_token");

    if (to.path.startsWith("/admin")) {
        !apiToken && router.push({ name: "login" });
    }

    if (to.path === "/login" || to.path === "/") {
        apiToken && router.push({ name: "tonization_card" });
    }

    next();
});

createApp(App).use(store).use(router).mount("#app");
