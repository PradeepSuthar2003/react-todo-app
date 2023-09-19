import { Alert, AlertTitle } from '@mui/material';
import { AlertObj } from '../utils/constants';

const AlertMessage = (prop: AlertObj) => {
    return (
        <Alert severity={prop.alertType} sx={prop.sx}><AlertTitle>{prop.alertTitle}</AlertTitle></Alert>
    )
}

export default AlertMessage;
