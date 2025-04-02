import React from 'react'
import Header from './header/Header'
import Contacts from './Contacts'
import Footer from '../Footer'
import { Element } from 'react-scroll'
import { SidebarData } from './header/sidebar/SidebarData'
import BookingProcess from './BookingProcess'
import Reviews from './Reviews'

const Home = () => {

  return (
    <main className='min-w-[320px]'>
      <Header />
      {SidebarData.map((items, index) => {
        return (
          <Element key={index} name={items.to}>
            {items.element}
          </Element>
        )
      })}
      <BookingProcess />
      <Reviews />
      <Contacts />
      <Footer />
    </main>
  )
}

export default Home
