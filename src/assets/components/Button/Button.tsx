import { useTheme } from "../../hooks/useTheme/useTheme";

interface ButtonProps{
    button_name: string;
    button_width: string;
    button_type?: 'button' | 'submit';
    button_disabled?: boolean;
    onClick?: () => void;
}

function Button({button_name, button_width, button_type = 'button', button_disabled, onClick} : ButtonProps) {
  
    const { dark } = useTheme();
    
    return (
        <button className={`w-${button_width} h-fit
        flex justify-center items-center
        p-3 rounded-md font-bold
        transition-opacity duration-150
        ${button_disabled 
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:opacity-50 active:opacity-75 cursor-pointer'}`}
        
        type={button_type}

        disabled={button_disabled}

        style={{
            backgroundColor:`${dark
            ?   button_name === 'Delete'
                ? 'var(--color-btn-del-dark)'
                : 'var(--color-btn-dark)'
            :   button_name === 'Delete'
                ? 'var(--color-btn-del-light)'
                : 'var(--color-btn-light)'} !important`,
                
            color: `${dark
            ? 'var(--color-text-primary-dark)'
            : 'var(--color-text-primary-light)'} !important`,
        }}
        
        onClick={onClick}> 
            {button_name}
        </button>
    )
}
export default Button
