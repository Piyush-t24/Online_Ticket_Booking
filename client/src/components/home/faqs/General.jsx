import React from 'react'
import { Accordion, AccordionItem, AccordionItemPanel, AccordionItemButton, AccordionItemHeading } from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css';


const General = () => {

    const faqs = [
        {
            question: 'How do I receive my adventure passes?',
            answer:
                'Once your booking is confirmed, your digital adventure pass will be emailed to you instantly. You can also access it anytime from your account dashboard.',
        },
        {
            question: "What should I bring for my experience?",
            answer:
                'Each adventure is different! Generally, we recommend bringing comfortable clothing, proper footwear, and any essentials like water bottles or sunscreen. Check the experience details for specific requirements.',
        },
        {
            question: 'Are these experiences guided or self-paced?',
            answer:
                'We currently offer only self-paced experiences, allowing you to explore at your own pace. However, we are actively working on adding guided experiences soon!',
        },
        {
            question: 'Is there an age restriction for certain experiences?',
            answer:
                'Some experiences may have age restrictions for safety reasons, such as extreme sports or adventure trails. Check the experience details before booking.',
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

export default General
