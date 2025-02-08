import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I register my product warranty?",
      answer: "You can register your product warranty by visiting our warranty registration page and filling out the form with your product details.",
    },
    {
      question: "What is the standard warranty period?",
      answer: "Our standard warranty period is 12 months from the date of purchase for most products.",
    },
    {
      question: "How can I find the nearest service center?",
      answer: "You can find the nearest service center by visiting our Service Center page and entering your location.",
    },
    {
      question: "How do I claim my warranty?",
      answer: "To claim your warranty, please visit our nearest service center with your product and warranty card.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 px-4 max-w-4xl mx-auto pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg p-2">
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;