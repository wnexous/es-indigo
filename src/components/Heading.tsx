import React, { PropsWithChildren } from "react"


const headingTypes = {
    h3: "sm:text-xl text-sm",
    h2: "sm:text-3xl text-2xl",
    h1: "lg:text-5xl md:text-4xl sm:text-3xl text-3xl"
}

export default function Heading({ as, children, ...props }: PropsWithChildren<React.HTMLAttributes<any> & { as: keyof typeof headingTypes }>) {
    const Element = as
    
    return <Element {...props} className={`${headingTypes[as]} text-white font-bold font-owners`}>{children}</Element>
}