import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Description from './components/Description'
import Collections from './components/Collections'
import VisitingInfo from './components/VisitingInfo'
import Booking from './components/Booking'
import Gallery from './components/Gallery'
import Footer from '../Footer'
import { ContextConfirmOrder } from '../../context/context'
import { Element } from 'react-scroll'
import LogoutBooking from './components/LogoutBooking'
import { useParams, useSearchParams } from 'react-router-dom'
import { useGetMuseumQuery } from './museumApi'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMuseumId, setMuseumId } from './museumSlice'
import { useGetUserQuery } from '../auth/authApi'

export default function MuseumPage() {
    const { data: resData } = useGetUserQuery();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const MuseumId = useSelector(selectMuseumId);
    const { data: MuseumData } = useGetMuseumQuery(MuseumId);
    console.log(MuseumData);
    const [confirmOrder, setConfirmOrder] = useState(false);

    useEffect(() => {
        dispatch(setMuseumId(id));
    }, [id]);

    return (
        <>
            <ContextConfirmOrder.Provider value={{ confirmOrder, setConfirmOrder }}>
                <main className='min-w-[320px]'>
                    <Navbar />

                    <Description />
                    {MuseumData &&
                        <>
                            <Element name='visitinginfo'>
                                <VisitingInfo />
                            </Element>
                            <Element name='booking'>
                                <hr className="border-t border-gray-300 dark:border-gray-700" />
                                {resData && resData.email ?
                                    <Booking />
                                    : <LogoutBooking />}
                            </Element>
                            <Element name='gallery'>
                                <hr className="border-t border-gray-300 dark:border-gray-700" />
                                <Gallery />
                            </Element>
                            <hr className="border-t border-gray-300 dark:border-gray-700" />
                            <Collections />
                            <hr className="border-t border-gray-300 dark:border-gray-700" />
                            <Footer />
                        </>
                    }
                </main>
            </ContextConfirmOrder.Provider>
        </>
    )
}
