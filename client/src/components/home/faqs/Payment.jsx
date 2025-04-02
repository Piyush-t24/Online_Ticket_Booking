import React from 'react'
import { Accordion, AccordionItem, AccordionItemPanel, AccordionItemButton, AccordionItemHeading } from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css';


const Payment = () => {
    const faqs = [
        {
            question: 'What payment methods do you accept?',
            answer:
                'We accept all major credit cards, PayPal, and UPI. All payments are processed securely through rajorpay payment gateway.',
        },
        {
            question: 'Can I pay in installments?',
            answer:
                'Currently, we do not offer installment payments. However, we are exploring options to introduce this feature in the future.',
        },
        {
            question: 'Do you provide invoices for my purchases?',
            answer:
                'Yes, invoices are automatically generated and sent to your registered email after a successful payment. You can also download them from your account dashboard.',
        },
        {
            question: 'Do you offer refunds for failed transactions?',
            answer:
                'Yes, if your payment fails but the amount is deducted, it will be automatically refunded within 5-7 business days. If you face any issues, please contact our support team.',
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

export default Payment
