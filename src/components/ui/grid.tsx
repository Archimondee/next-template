import { cn } from "@/lib/utils"
import * as React from "react"
import { Box, type BoxProps } from "./box"

export interface GridProps extends BoxProps {
	columns?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "12"
	flow?: "row" | "col" | "dense" | "row-dense" | "col-dense"
	gap?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
	colGap?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
	rowGap?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
	({ className, columns, flow, gap, colGap, rowGap, ...props }, ref) => {
		return (
			<Box
				ref={ref}
				className={cn(
					"grid",
					columns && `grid-cols-${columns}`,
					flow && `grid-flow-${flow}`,
					gap && `gap-${gap}`,
					colGap && `gap-x-${colGap}`,
					rowGap && `gap-y-${rowGap}`,
					className,
				)}
				{...props}
			/>
		)
	},
)
Grid.displayName = "Grid"

export { Grid }
