import cls from './Button.module.scss'
import {
    ButtonHTMLAttributes, FC, memo, ReactNode,
} from 'react';


export enum ButtonColor {
    PRIMARY = 'primary',
    SECONDARY='secondary',
    OUTLINE = 'outline',
}
export enum ButtonSize {
   BASE = 'size_base',
   MEDIUM = 'size_medium',
   BIG = 'size_big',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    size?: ButtonSize;
    disabled?: boolean;
    children?: ReactNode;
    typeBtn?: "button" | "submit" | "reset";
}

export const Button: FC<ButtonProps> = memo((props:ButtonProps) => {
    const {
        className,
        children,
        disabled,
        size = ButtonSize.MEDIUM,
        typeBtn = 'button',
        ...otherProps
    } = props;
  const classes = `${cls[size]} ${className || ''}`;
    return (
        <button
        type={typeBtn}
            className={classes}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});