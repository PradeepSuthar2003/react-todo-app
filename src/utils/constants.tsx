export interface InputProp {
    ref: React.MutableRefObject<HTMLInputElement | null>,
    helpText: string,
    onClick: () => void,
}

export interface TaskObj {
    checked: boolean,
    title: string
}