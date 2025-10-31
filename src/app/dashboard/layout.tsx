import dynamic from "next/dynamic"

const RootLayoutCustome  = dynamic(()=> import("@/layout/RootLayout")) 

const DashboardLayout = ({ chidlren}: {
    chidlren: React.ReactNode
}) =>{
    return(
        <RootLayoutCustome>
            {chidlren}
        </RootLayoutCustome>
    )
}

export default DashboardLayout