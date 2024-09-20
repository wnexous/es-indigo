import { ProviderControllerI } from "@/interfaces/Provider.interface";
import { UserProfileI } from "@/interfaces/UserProfile.interface";
import apiFrontend from "@/vendors/api-frontend";

// u can insert logical data login here
interface LoginInterface {
    profile: UserProfileI;
    hasLoaded: boolean
}

export default class ProfileController extends ProviderControllerI<LoginInterface> {
    // need use init method to initialize this class

    init() {
        this.fetchUserProfile()
    }

    setProfile(profile: UserProfileI) {
        this.setValue({ profile })
    }


    hasLoaded() {
        return !!this.value?.hasLoaded
    }

    getProfile() {
        return this.value?.profile
    }

    getProofs() {
        return this.value?.profile?.proofs
    }

    private async fetchUserProfile() {
        try {
            const profile = await apiFrontend.request.getProfile()
            this.setProfile(profile)
            this.setValue({ hasLoaded: true })
        } catch (error) {

        }
    }

    isRegistred() {
        return !!this.value?.profile?.isRegistred
    }
}
