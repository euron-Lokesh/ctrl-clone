"use client";

import { useState } from "react";
import FAQItem from "../ui/FAQItem";
import Button from "../ui/Button";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I claim the Midnight Glacier Airdrop $NIGHT token?",
      answer:
        "To claim your Midnight Glacier Airdrop $NIGHT tokens, visit the official claim page and follow the on-screen instructions to connect your wallet and verify eligibility. For step-by-step guidance, check out the full claim guide provided on the official Midnight Glacier platform.",
    },
    {
      question: "Do you have a mobile wallet application?",
      answer:
        "Yes, Ctrl offers a mobile wallet app for both Android and iOS, allowing you to securely access, manage, and transfer your assets directly from your smartphone.",
    },
    {
      question: "Can I migrate my MetaMask, Phantom or Keplr wallet to Ctrl?",
      answer:
        "Yes, you can import your existing wallets such as MetaMask, Phantom, or Keplr into Ctrl using your recovery phrase or private key. This keeps your assets and wallet addresses the same while benefiting from Ctrl’s features.",
    },
    {
      question: "How do I connect to a dapp if I don't see the Ctrl logo?",
      answer:
        "If the dapp doesn’t display the Ctrl logo, select the ‘WalletConnect’ option or a similar connection method. Ctrl supports WalletConnect, allowing you to link your wallet with most Web3 applications easily.",
    },
    {
      question: "What is a non-custodial wallet?",
      answer:
        "A non-custodial wallet means you have complete control of your private keys and funds. Unlike centralized wallets, Ctrl never holds your coins — you are the only one with access to your assets.",
    },
    {
      question:
        "XDEFI migrated to Ctrl. What does this mean for me as an XDEFI user?",
      answer:
        "The migration means all XDEFI Wallet users can seamlessly move to Ctrl. You’ll retain your wallet, assets, and networks while gaining access to Ctrl’s new features and improved performance.",
    },
    {
      question: "How do I migrate my $XDEFI to $CTRL?",
      answer:
        "To migrate your $XDEFI tokens to $CTRL, use the official migration portal provided by Ctrl. Connect your wallet, review your token balance, and follow the migration steps as instructed.",
    },
    {
      question: "Are my funds safe?",
      answer:
        "Yes, your funds remain safe as Ctrl is a non-custodial wallet — your private keys and assets are fully controlled by you. Always keep your recovery phrase secure and private.",
    },
    {
      question: "Does Ctrl have control of my coins?",
      answer:
        "No, Ctrl does not control your coins. It simply provides the interface to access and interact with your blockchain assets securely. You retain full ownership and authority over your funds.",
    },
    {
      question: "I have questions or concerns, where is the best place to ask?",
      answer:
        "You can reach out to the Ctrl community or support team via official social media channels, the Help Center, or Discord. For technical or wallet-related issues, the official support portal is the best option.",
    },
  ];

  return (
    <section className="w-full bg-[#F9FAF9] py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Top header section */}
        <div className="mb-16">
          <div className="flex justify-end">
            <span className="text-5xl mr-60 rounded-full">
              <span className="text-red-400">. </span>
              <span className="text-black">Any Questions ?</span>
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-semibold text-black">FAQ</h2>
        </div>

        {/* FAQ list */}
        <div className="flex flex-col gap-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              className="w-full"
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
          <div className="text-center mt-10">
            <Button variant="black" className="bg-transparent text-black!">Show all questions</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
