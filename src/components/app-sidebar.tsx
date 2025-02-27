"use client"

import type * as React from "react"
import { ChevronRight, HomeIcon } from "lucide-react"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar"
import { Typography } from "./ui/typography"
import { useRouter } from "next/navigation"
import { Box } from "./ui/box"

export const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			//items: [],
			// items: [
			// 	{
			// 		title: "Installation",
			// 		url: "#",
			// 		isActive: true,
			// 	},
			// 	{
			// 		title: "Project Structure",
			// 		url: "#",
			// 	},
			// ],
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const route = useRouter()

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<Box className="h-20 border-black border rounded-lg flex justify-center items-center">
					<Typography> Logo </Typography>
				</Box>
			</SidebarHeader>
			<SidebarContent className="gap-0">
				{/* We create a collapsible SidebarGroup for each parent. */}
				{data.navMain.map((item) => (
					<Collapsible
						key={item.title}
						title={item.title}
						defaultOpen
						className="group/collapsible"
					>
						<SidebarGroup>
							<SidebarGroupLabel
								asChild
								className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
							>
								{/* <CollapsibleTrigger> */}
								<Box className="flex items-center gap-3 ">
									<HomeIcon />
									<Typography className="text-md">{item.title}</Typography>
								</Box>

								{/* <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
								</CollapsibleTrigger> */}
							</SidebarGroupLabel>
							{/* <CollapsibleContent>
								<SidebarGroupContent>
									<SidebarMenu>
										{item.items.map((item) => (
											<SidebarMenuItem key={item.title}>
												<SidebarMenuButton asChild isActive={item.isActive}>
													<a href={item.url}>{item.title}</a>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</CollapsibleContent> */}
						</SidebarGroup>
					</Collapsible>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
