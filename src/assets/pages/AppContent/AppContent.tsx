import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme/useTheme"
import RegisterUser from "../RegisterUser/RegisterUser";
import ListUser from "../ListUser/ListUser";
import UpdateUser from "../UpdateUser/UpdateUser";
import Header from "../../components/Header/Header";

function AppContent() {
    
    const {dark} = useTheme();

    return (
        <div className="w-full min-h-screen
        flex flex-col justify-start items-center pb-10"
        style={{
            background: dark 
            ? 'var(--color-body-dark)'
            : 'var(--color-body-light)'
        }}>
            <BrowserRouter>
                <header className="w-full h-40
                fixed top-0 right-0 left-0">
                    <Header />
                </header>
                <main className="w-full h-fit mt-40">
                    <Routes>
                        <Route path='/' element={<RegisterUser />} />
                        <Route path='/list' element={<ListUser />} />
                        <Route path='/update' element={<UpdateUser/>}/>
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    )
}

export default AppContent