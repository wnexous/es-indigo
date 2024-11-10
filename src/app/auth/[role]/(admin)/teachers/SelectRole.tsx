import { changeUserRole } from "@/backend/users"
import { roles, User } from "@prisma/client"
import { MultiSelect } from "primereact/multiselect"
import { useEffect, useState } from "react"

export default function SelectRole(user: User & { roles: roles[] }) {

    const [userRoles, setUserRoles] = useState(user.roles.map(r => r.roleName))
    console.log('userRoles', userRoles)
    const availableRoles = ["admin", "user", "teacher"]

    const setRoles = (roles: string[]) => {
        setUserRoles(roles)
        changeUserRole(user.id, roles)
    }

    return <MultiSelect
        className="min-w-64"
        options={availableRoles}
        value={userRoles}
        onChange={({ value }) => setRoles(value)}
    />
}