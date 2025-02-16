import { cn } from "@/lib/utils"
import * as React from "react"

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
	as?: React.ElementType
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
	({ as: Component = "div", className, ...props }, ref) => {
		return <Component ref={ref} className={cn(className)} {...props} />
	},
)
Box.displayName = "Box"

export { Box }
