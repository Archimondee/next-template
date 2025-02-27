import { cn } from "@/lib/utils"
import * as React from "react"
import { Box, type BoxProps } from "./box"

export interface TypographyProps extends BoxProps {
	variant?:
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "h5"
		| "h6"
		| "p"
		| "blockquote"
		| "code"
		| "lead"
		| "large"
		| "small"
		| "muted"
		| "div"
}

const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(
	({ className, as, variant = "div", ...props }, ref) => {
		const Component = as || variant

		return (
			<Box
				ref={ref}
				as={Component as React.ElementType}
				className={cn(
					variant === "h1" &&
						"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
					variant === "h2" &&
						"scroll-m-20 text-3xl font-semibold tracking-tight",
					variant === "h3" &&
						"scroll-m-20 text-2xl font-semibold tracking-tight",
					variant === "h4" &&
						"scroll-m-20 text-xl font-semibold tracking-tight",
					variant === "h5" &&
						"scroll-m-20 text-lg font-semibold tracking-tight",
					variant === "h6" &&
						"scroll-m-20 text-base font-semibold tracking-tight",
					variant === "p" && "leading-7 [&:not(:first-child)]:mt-6",
					variant === "blockquote" && "mt-6 border-l-2 pl-6 italic",
					variant === "code" &&
						"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
					variant === "lead" && "text-xl text-muted-foreground",
					variant === "large" && "text-lg font-semibold",
					variant === "small" && "text-sm font-medium leading-none",
					variant === "muted" && "text-sm text-muted-foreground",
					className,
				)}
				{...props}
			/>
		)
	},
)
Typography.displayName = "Typography"

export { Typography }
