import React from 'react'
import { Accordion, AccordionItem, AccordionItemPanel, AccordionItemButton, AccordionItemHeading } from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css';


const Booking = () => {
    const faqs = [
        {
            question: 'How do I receive my tickets after booking?',
            answer:
                'After your booking is confirmed, your e-tickets will be sent to your registered email address immediately. You can also access them anytime from your account dashboard.',
        },
        {
            question: "Can I get a refund if I can't attend?",
            answer:
                'Yes, refunds are available up to 48 hours before the event start time. Please check our refund policy for specific terms and conditions.',
        },
        {
            question: 'Can I modify my booking details after purchase?',
            answer:
                'We are currently offering only self-paced modifications. However, we are actively working on introducing guided booking modifications soon.',
        },
        {
            question: 'Is it safe to buy tickets online?',
            answer:
                'Yes, our platform uses industry-standard encryption to protect your personal and payment information. We also verify all events and sellers.',
        },
    ];


    return (
        faqs.map((items, index) => {
            return (
                <Accordion key={index} allowZeroExpanded className='bg-white rounded-xl overflow-hidden'>
                    <AccordionItem>
                        <AccordionItemHeading className="w-full px-6 text-left focus:outline-none">
                            <AccordionItemButton className="py-4 flex items-center justify-between transition ease-in-out">
                                <span className="font-semibold text-gray-900">{items.question}</span>
                                <i className="fas fa-chevron-down text-gray-500 transition-transform duration-300"></i>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="px-6 pb-4">
                                <p className="text-gray-600">{items.answer}</p>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            )
        })
    )
}

export default Booking
