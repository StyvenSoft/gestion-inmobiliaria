import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography : {
        useNextvariants : true
    },
    palette : {
        primary : {
            main : '#0e9656'
        },
        common : {
            white : '#bebebe'
        },
        secondary : {
            main : '#ee5533'
        }
    },
    spacing : 10
});


export default theme;