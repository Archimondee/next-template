import { cn } from "@/lib/utils"
import * as React from "react"
import { Box, type BoxProps } from "./box"

export interface SectionProps extends BoxProps {
	spacing?: "sm" | "md" | "lg" | "xl" | "2xl" | "none"
	background?: "primary" | "secondary" | "muted" | "accent" | "none"
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
	(
		{
			className,
			as = "section",
			spacing = "lg",
			background = "none",
			...props
		},
		ref,
	) => {
		return (
			<Box
				ref={ref}
				as={as}
				className={cn(
					spacing === "sm" && "py-4",
					spacing === "md" && "py-8",
					spacing === "lg" && "py-12",
					spacing === "xl" && "py-16",
					spacing === "2xl" && "py-20",
					background === "primary" && "bg-primary text-primary-foreground",
					background === "secondary" &&
						"bg-secondary text-secondary-foreground",
					background === "muted" && "bg-muted text-muted-foreground",
					background === "accent" && "bg-accent text-accent-foreground",
					className,
				)}
				{...props}
			/>
		)
	},
)
Section.displayName = "Section"

export { Section }
