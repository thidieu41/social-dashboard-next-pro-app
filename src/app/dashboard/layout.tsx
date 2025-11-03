import dynamic from "next/dynamic"

const RootLayoutCustome = dynamic(() => import("@/layout/RootLayout"))
const Breadcrumb = dynamic(()=> import("@/components/breadcrumb"))


const DashboardLayout = ({ children}: {
    children: React.ReactNode
}) =>{
    return(
        <RootLayoutCustome>
            <Breadcrumb/>
            {children}
        </RootLayoutCustome>
    )
}

export default DashboardLayout