import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Layout from './components/Layouts';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Layout>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </Layout>
    </ThemeProvider>
  );
}

export default App;

