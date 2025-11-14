import { useTheme } from "../../hooks/useTheme/useTheme";

interface ButtonProps{
    button_name: string;
    button_width: string;
    button_type?: 'button' | 'submit';
    button_disabled?: boolean;
    onClick?: () => void;
}

function Button({button_name, button_width, button_type = 'button', button_disabled,onClick} : ButtonProps) {
  
    const { dark } = useTheme();
    
    return (
        <button className={`w-${button_width} h-fit
        flex justify-center items-center
        p-3 rounded-md font-bold cursor-pointer hover:opacity-50`}
        
        type={button_type}
        disabled={button_disabled}
        style={{
            background: dark
            ?   button_name === 'Delete'
                ? 'var(--color-btn-del-dark)'
                : 'var(--color-btn-dark)'
            :   button_name === 'Delete'
                ? 'var(--color-btn-del-light)'
                : 'var(--color-btn-light)',
                
            color: dark
            ? 'var(--color-text-primary-dark)'
            : 'var(--color-text-primary-light)',

            opacity: button_disabled ? 0.5 : 1,
            cursor: button_disabled ? 'not-allowed' : 'pointer',
        }}
        
        onClick={onClick}> 
            {button_name}
        </button>
    )
}
export default Button
