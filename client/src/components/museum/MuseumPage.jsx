import React, { useState } from 'react'
import Navbar from './Navbar'
import Description from './Description'
import Collections from './Collections'
import VisitingInfo from './VisitingInfo'
import Booking from './Booking'
import Gallery from './Gallery'
import Footer from '../Footer'
import { ContextMuseum, ContextCheckLogin, ContextConfirmOrder } from '../context/context'
import { Element } from 'react-scroll'
import LogoutBooking from './LogoutBooking'

const MuseumPage = () => {
    const [resData, setResData] = useState(null)
    const [MuseumData, setMuseumData] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [confirmOrder, setConfirmOrder] = useState(false);
    document.title = MuseumData ? `${MuseumData.venue.name} | HeritageHub` : "HeritageHub";
    return (
        <>
            <ContextConfirmOrder.Provider value={{ confirmOrder, setConfirmOrder }}>
                    <ContextCheckLogin.Provider value={{ resData, setResData }}>
                        <ContextMuseum.Provider value={{ MuseumData, setMuseumData }}>
                            <main className='min-w-[320px]'>
                                <Navbar />

                                {/* <Header/> */}
                                <Description />
                                {MuseumData &&
                                    <>
                                        <Element name='visitinginfo'>
                                            <VisitingInfo />
                                        </Element>
                                        <Element name='booking'>
                                            {resData && resData.email ?
                                                <Booking />
                                                : <LogoutBooking />}
                                        </Element>
                                        <Element name='gallery'>
                                            <Gallery />
                                        </Element>
                                        <Collections />
                                        <Footer />
                                    </>
                                }
                            </main>
                        </ContextMuseum.Provider>
                    </ContextCheckLogin.Provider>
            </ContextConfirmOrder.Provider>
        </>
    )
}

export default MuseumPage
