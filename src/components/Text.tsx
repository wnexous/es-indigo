import React, { PropsWithChildren } from "react"




export default function Text({ className, children, ...props }: PropsWithChildren<React.HTMLAttributes<any> & {}>) {

    return <span {...props} className={`${className} text-white font-light font-gotham`}>{children}</span>
}