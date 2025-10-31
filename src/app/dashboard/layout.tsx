import dynamic from "next/dynamic"

const RootLayoutCustome = dynamic(() => import("@/layout/RootLayout"))


const DashboardLayout = ({ children}: {
    children: React.ReactNode
}) =>{
    return(
        <RootLayoutCustome>
            {children}
        </RootLayoutCustome>
    )
}

export default DashboardLayout