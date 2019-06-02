import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
  spacing: 16,
  palette: {
    type: 'dark',
    primary: {
      main: '#18ddf8',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    }
  },
});

export default responsiveFontSizes(theme);
