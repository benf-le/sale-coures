//_componenst là một quy ước mới, các component chỉ được dùng trong (dáhboard) mà nókhông được dùng ra bên ngoài
import {Logo} from "./logo";
import {SidebarRoutes} from "./sidebar-routes";

export const Sidebar=()=>{
    return(
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-6">
                <Logo/>
            </div>

            <div className="flex flex-col w-full">
                <SidebarRoutes/>
            </div>
        </div>
    )
}