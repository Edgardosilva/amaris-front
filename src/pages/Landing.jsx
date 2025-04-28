import React from 'react';
import Navbar from '../components/Navbar';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import GalleryImg from '../components/GalleryImg';


const Landing = () => {

    const navigate = useNavigate();
    const goToLogin = () => {
        navigate('/login');
    }

    const theme = createTheme({
        palette: {
          primary: {
            main: '#a6d230', 
          },
        },
      });

    return (
        <main className=' font-gabarito' >
            <section>
                <section className='w-full'>
                    <div className="w-full bg-gradient-to-r from-teal-200 via-green-100 to-teal-200  text-5xl text-center flex flex-col items-center justify-center">
                        <Navbar />
                        <section className='flex flex-col md:flex-row items-center max-w-[1200px]'>
                            <section className='hidden md:flex flex-col  justify-center lg:justify-between md:gap-10 h-[320px] p-3 items-start text-left'>
                                <div className='text-[15px] md:text-[20px]'>
                                    Centro de kinesiología estética AMARIS
                                </div>
                                <div className='text-[35px] lg:text-5xl max-w-[800px]'>
                                    Conectamos tu belleza con tu salud para que te sientas bien contigo mismo
                                </div>
                                <div className='hidden text-lg  w-[500px] h-[50px] md:flex justify-between gap-5'>
                                    <ThemeProvider theme={theme}>
                                        <Button onClick={goToLogin} variant="contained" size="large" color="primary" fullWidth>
                                            Reserva tu hora
                                        </Button>
                                    </ThemeProvider>
                                    <Button variant="contained" size="large" color='#' fullWidth>
                                        Nosotros
                                    </Button>
                                </div>
                            </section>
                            <section className='m-3 p-10'>
                                <img src="/img/amarisLogo.png" alt="logo" className='w-72' />
                            </section>
                            <div className='md:hidden text-lg md:w-[500px] h-[50px] flex justify-between gap-5'>
                                <ThemeProvider theme={theme}>
                                    <Button onClick={goToLogin} variant="contained" size="small" color="primary" fullWidth >
                                        Reserva tu hora
                                    </Button>
                                </ThemeProvider>
                                <Button variant="contained" size="small" color='#' fullWidth>
                                    Nosotros
                                </Button>
                            </div>  
                        </section>
                    </div>
                    <div className="bg-gradient-to-r from-teal-200 via-green-100 to-teal-200 pb-20 md:pb-0  ">
                        <svg className="hidden md:flex h-24 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                            <path className="text-white fill-current" fillOpacity="0.99"
                                d="M0,288L60,245.3C120,203,240,117,360,112C480,107,600,181,720,229.3C840,277,960,299,1080,256C1200,213,1320,107,1380,53.3L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                        </svg>
                    </div>
                </section>
                <section className='w-full'>
                    <GalleryImg />
                </section>
            </section>
        </main>
    );
};

export default Landing;
