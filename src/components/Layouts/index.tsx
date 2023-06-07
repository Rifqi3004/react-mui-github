import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

type LayoutTypes = {
    children: ReactNode,
};

const Container = styled(Paper)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'none',
    padding: 0,
    '& .wrapper': {
        maxWidth: 580,
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        boxShadow: '0 0 48px 0 rgb(0 0 0/20%)',
    }
}) as typeof Paper;

function Layout(props: LayoutTypes) {
    const { children } = props;
    return (
        <Container>
            <div className='wrapper'>
                {children}
            </div>
        </Container>
    );
};

export default Layout;
