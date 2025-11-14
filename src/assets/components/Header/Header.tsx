import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme/useTheme"
import HeaderButton from "../HeaderButton/HeaderButton";

function Header() {
    
    const {dark, setDark} = useTheme();
    const navigate = useNavigate();

    return (
        <div className="w-full h-full
        flex flex-col justify-center items-center gap-4"
        style={{
            background: dark
            ? 'var(--color-header-dark)'
            :'var(--color-header-light)',

            color: dark
            ? 'var(--color-text-primary-dark)'
            : 'var(--color-text-primary-light)'
        }}>
            <h1 className="text-2xl font-bold">API DEMO 3</h1>

            <div className="w-fit h-fit
            flex justify-center items-center gap-3">
                <HeaderButton button_name='Register' onClick={()=>navigate('/')} />
                <HeaderButton button_name='User List' onClick={()=>navigate('list')} />
                <HeaderButton button_name={dark?'Light':'Dark'} onClick={()=>setDark(!dark)}/>
            </div>
        </div>
    )
}

export default Header
