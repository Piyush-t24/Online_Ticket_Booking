import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { ContextMuseum } from '../../../context/context';
import Loading from '../../dashboard/components/Loading';
import { Link as ElementLink } from 'react-scroll';
import { useGetMuseumQuery } from '../museumApi';
import { selectMuseumId } from '../museumSlice';
import { useSelector } from 'react-redux';

const Description = () => {

    const museumId = useSelector(selectMuseumId);
    const { data: MuseumData, isLoading } = useGetMuseumQuery(museumId);


    return (
        <>
            {MuseumData && MuseumData.venue ?
                (
                    <section id="Hero" className="relative min-h-[calc(100vh-64px)] mt-[64px] bg-neutral-900 text-white">
                        <div className="absolute inset-0">
                            <img src={MuseumData.venue.imgLink} alt="Museum" className="h-full w-full  object-cover opacity-40" />
                        </div>

                        <div className="relative max-w-7xl mx-auto min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8 flex items-center">
                            <div>
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">{MuseumData.venue.name}</h1>
                                <p className="text-xl md:text-2xl mb-6">{MuseumData.venue.description.line}</p>
                                <p className="text-lg md:text-xl mb-8 max-w-2xl">{MuseumData.venue.description.elaborated}</p>

                                <div className="flex flex-wrap gap-4">
                                    <div className='flex gap-4  '>
                                        <ElementLink smooth={true} duration={500} to="booking" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 cursor-pointer">
                                            Book Now
                                        </ElementLink>
                                        <ElementLink smooth={true} duration={500} to="gallery" className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-neutral-900 text-white font-bold py-3 px-8 rounded-lg transition duration-300 cursor-pointer">
                                            Gallery
                                        </ElementLink>
                                    </div>
                                    <ElementLink to="visitinginfo" smooth={true} duration={500} className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-neutral-900 text-white font-bold py-3 px-8 rounded-lg transition duration-300 cursor-pointer">
                                        Visiting Information
                                    </ElementLink>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : <div className='flex justify-center items-center h-[100vh]'><Loading type="spinningBubbles" color="blue" /></div>}
        </>
    )
}

export default Description
