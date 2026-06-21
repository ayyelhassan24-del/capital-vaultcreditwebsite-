"use client";

export default function CTA() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-vault-gold to-vault-gold/80">
      <div className="container-vault text-center scroll-reveal">
        <h2 className="heading-lg text-vault-black mb-6">
          Your Funding Starts Here
        </h2>
        <p className="text-lg md:text-xl text-vault-black/80 max-w-2xl mx-auto mb-8 leading-relaxed">
          Five to twenty-three days from application to funded. No equity lost.
          One hundred percent focused on closing your deal.
        </p>
        <button
          onClick={() =>
            document
              .getElementById("lead-form")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-vault-black text-vault-gold font-semibold px-10 py-4 rounded-full hover:bg-vault-black/90 transition-colors text-lg"
        >
          Apply Now
        </button>
      </div>
    </section>
  );
}
