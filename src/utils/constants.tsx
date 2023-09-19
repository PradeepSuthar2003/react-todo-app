import { AlertColor } from "@mui/material/Alert/Alert"

export interface InputProp {
    ref: React.MutableRefObject<HTMLInputElement | null>,
    helpText: string,
    onClick: () => void,
}

export interface TaskObj {
    checked: boolean,
    title: string
}

export interface AlertObj {
    alertType: AlertColor | undefined,
    alertTitle: string,
    sx: any
}

export interface MessageObj {
    alertType: AlertColor | undefined,
    alertTitle: string,
    display: string,
}