import ProfileController from "./controllers/profile.controller"
import SessionController from "./controllers/session.controller"

const States = {
    session: new SessionController(),
    profile: new ProfileController()
}

export default States