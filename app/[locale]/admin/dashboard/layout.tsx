import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main>
        <SidebarTrigger className="text-black" />
        
        {children}
      </main>
      
    </SidebarProvider>
  )
}
