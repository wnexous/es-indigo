import { getServerSession } from "next-auth";

export default class AuthController {
    getUserSession() {
        return getServerSession()
    }

    error({ message, status }: { message: string, status: number }) {

        return Response.json({ message, error: true }, { status })
    }


}