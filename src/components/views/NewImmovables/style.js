import { emphasize, withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

export const style = {
    container: {
        paddingTop: '8px'
    },
    paper: {
        margingTop: 8,
        display: 'flex',
        flexDireccion: 'column',
        alingItems: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5'
    },
    link: {
        display: 'flex'
    },
    homeIcon: {
        width: 20,
        height: 20,
        marginRight: '4px'
    },
    submit: {
        marginTop: 15,
        marginBottom: 10
    },
    photo: {
        height: "100px"
    }
};

export const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip); 
