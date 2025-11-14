import { useTheme } from "../../hooks/useTheme/useTheme"

interface HeaderButtonProps{
    button_name: string;
    onClick?: () => void; 
}

function HeaderButton({button_name, onClick} : HeaderButtonProps) {

    const {dark} = useTheme();

    return (
        <button className="w-fit h-fit
        flex justify-center items-center
        p-3 rounded-md font-bold text-xl
        cursor-pointer hover:opacity-50"
        
        style={{
            background: dark
            ? 'var(--color-btn-dark)'
            : 'var(--color-btn-light)',

            color: dark
            ? 'var(--color-text-primary-dark)'
            : 'var(--color-text-primary-light)'
        }}

        onClick={onClick}>
            
            {button_name}
        </button>
    )
}

export default HeaderButton
