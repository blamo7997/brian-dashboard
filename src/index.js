import { handleLumenRequest } from "./lumen-router.js";

export default {
  async fetch(request, env, ctx) {
    return handleLumenRequest(request, env, ctx);
  }
};
