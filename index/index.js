/** @file (Webpack) */

import {createApp} from "vue";
import Root from "./Root.vue";

const app = createApp(Root);
// app.config.compilerOptions.isCustomElement = () => true;
app.mount("main");