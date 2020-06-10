import React from 'react';
import { useTheme } from '../../theme';

const getStyles = (theme) => ({
    root: {
        fontSize: '2em',
        color: theme.color.primary || 'default'
    }
})

const Loader = () => {
    const { theme } = useTheme();
    console.log(theme);
    const styles = getStyles(theme);

    return (
        <div className="loader" style={styles.root}>Loading...</div>
    )
}

export default Loader;