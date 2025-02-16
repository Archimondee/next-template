import { cn } from "@/lib/utils"
import * as React from "react"
import { Box, type BoxProps } from "./box"

export interface ContainerProps extends BoxProps {
	size?: "sm" | "md" | "lg" | "xl" | "2xl" | "fluid"
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
	({ className, size = "lg", ...props }, ref) => {
		return (
			<Box
				ref={ref}
				className={cn(
					"mx-auto px-4 w-full",
					size === "sm" && "max-w-screen-sm",
					size === "md" && "max-w-screen-md",
					size === "lg" && "max-w-screen-lg",
					size === "xl" && "max-w-screen-xl",
					size === "2xl" && "max-w-screen-2xl",
					size === "fluid" && "max-w-none",
					className,
				)}
				{...props}
			/>
		)
	},
)
Container.displayName = "Container"

export { Container }
