import { ACCESS_TOKEN, USER_LOGGED } from "@/constants/tokens";
import { cache } from "./cache.util";
import { notify } from "./notify.util";

export const logout = () => {
  cache.clearValue(ACCESS_TOKEN);
  cache.clearValue(USER_LOGGED);
  notify("Sua sessão foi encerrada...", { type: "info" });
};