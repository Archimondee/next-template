import { cn } from "@/lib/utils"
import * as React from "react"
import { Box, type BoxProps } from "./box"

export interface FlexProps extends BoxProps {
	inline?: boolean
	direction?: "row" | "row-reverse" | "column" | "column-reverse"
	justify?: "start" | "end" | "center" | "between" | "around" | "evenly"
	align?: "start" | "end" | "center" | "baseline" | "stretch"
	wrap?: "nowrap" | "wrap" | "wrap-reverse"
	gap?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
	(
		{
			className,
			inline = false,
			direction,
			justify,
			align,
			wrap,
			gap,
			...props
		},
		ref,
	) => {
		return (
			<Box
				ref={ref}
				className={cn(
					inline ? "inline-flex" : "flex",
					direction && `flex-${direction}`,
					justify && `justify-${justify}`,
					align && `items-${align}`,
					wrap && `flex-${wrap}`,
					gap && `gap-${gap}`,
					className,
				)}
				{...props}
			/>
		)
	},
)
Flex.displayName = "Flex"

export { Flex }
