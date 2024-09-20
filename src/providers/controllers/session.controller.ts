import { ProviderControllerI } from "@/interfaces/Provider.interface";
import { UserSessionI } from "@/interfaces/User.interface";

// u can insert logical data login here
interface LoginInterface {
  session: UserSessionI;
}

export default class SessionController extends ProviderControllerI<LoginInterface> {
  // need use init method to initialize this class
  init() {
  }
  getRoles() {
    return this.value?.session?.roles 
  }

  setSession(session: UserSessionI) {
    this.setValue({ session })
  }

  getSession() {
    return this.value?.session
  }

  isLogged() {
    return !!this.value?.session
  }

}
