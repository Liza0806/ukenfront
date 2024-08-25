import cls from './Text.module.scss'

type TextTypeProps = {
    classN ?: 'large' | 'medium' | 'small',
    color?: 'orange' | 'white' | 'grey',
    text: string,
}

export const Text = (props: TextTypeProps) => {
    const { classN, text, color } = props
return (
    <p className={`${cls[classN || '']} ${cls[color || '']}`}>
{text}
</p>
)
}