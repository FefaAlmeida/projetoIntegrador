import { ROUTES } from "@/constants/web-routes";
import { USER_TYPE } from "@/constants/enums";

export function postLoginRouteFor(user) {
 if (user?.tipo === USER_TYPE.ADMIN) return ROUTES.ADMIN.USERS.href;
 if (user?.tipo === USER_TYPE.CLIENTE) return ROUTES.CUSTOMER.DASHBOARD.href;
 return ROUTES.HOME.href;
}
