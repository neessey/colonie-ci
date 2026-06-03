/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'envoi (à remplacer par ton API)
    setTimeout(() => {
      console.log("Message envoyé:", formData);
      // Création du message WhatsApp
      const whatsappMessage = `Bonjour Colonie !%0A%0A📝 *Nouvelle demande de contact*%0A👤 Nom: ${formData.name}%0A📧 Email: ${formData.email}%0A📞 Téléphone: ${formData.phone || "Non renseigné"}%0A📌 Sujet: ${formData.subject}%0A%0A💬 Message:%0A${formData.message}%0A%0A---%0AMerci de me recontacter dès que possible.`;
      
      window.open(`https://wa.me/2250504272827?text=${whatsappMessage}`, "_blank");
      
      setIsSuccess(true);
      setIsLoading(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="bg-white-50/50 min-h-screen">
        {/* Hero Section - identique à la page produits */}
        <div
          ref={heroRef}
          className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-dark-200 to-dark-100 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="hexagon-pattern h-full" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div
              className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {/* Breadcrumb */}
              <div className="flex items-center justify-center gap-2 text-sm mb-6">
                <Link href="/" className="text-cream-200/60 hover:text-honey transition-colors">
                  Accueil
                </Link>
                <span className="text-cream-200/40">/</span>
                <span className="text-honey">Contact</span>
              </div>

              <p className="text-honey text-sm tracking-[0.3em] uppercase mb-4">
                Restons connectés
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-cream-100 leading-tight mb-6">
                Contactez-nous
                <br />
                <span className="text-gradient">pour toute question</span>
              </h1>
              <p className="text-lg md:text-xl text-cream-200/80 max-w-3xl mx-auto">
                Une question sur nos produits ? Une commande personnalisée ?
                Notre équipe vous répond dans les meilleurs délais.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Formulaire - style identique aux produits */}
              <div
                className={`bg-dark-100 rounded-2xl overflow-hidden border border-cream-100/10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-serif text-cream-100 mb-2">Envoyez-nous un message</h3>
                  <p className="text-cream-200/60 text-sm mb-6">
                    Remplissez le formulaire et nous vous répondrons sous 24h
                  </p>

                  {isSuccess && (
                    <div className="mb-6 p-4 bg-honey/10 border border-honey/30 rounded-xl">
                      <p className="text-honey text-sm flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Message envoyé ! Vous allez être redirigé vers WhatsApp.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-cream-200 text-sm mb-2">Nom complet *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-50 border border-cream-100/10 rounded-xl text-cream-100 placeholder-cream-200/40 focus:outline-none focus:border-honey transition-colors"
                        placeholder="Jean Kouamé"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-cream-200 text-sm mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-dark-50 border border-cream-100/10 rounded-xl text-cream-100 placeholder-cream-200/40 focus:outline-none focus:border-honey transition-colors"
                          placeholder="jean@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-cream-200 text-sm mb-2">Téléphone (WhatsApp)</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-dark-50 border border-cream-100/10 rounded-xl text-cream-100 placeholder-cream-200/40 focus:outline-none focus:border-honey transition-colors"
                          placeholder="+225 07 XX XX XX XX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-cream-200 text-sm mb-2">Sujet *</label>
                      <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-50 border border-cream-100/10 rounded-xl text-cream-100 focus:outline-none focus:border-honey transition-colors"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="Commande">Commande de produits</option>
                        <option value="Question produit">Question sur un produit</option>
                        <option value="Partenariat">Partenariat / Grossiste</option>
                        <option value="Réclamation">Réclamation</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-cream-200 text-sm mb-2">Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-50 border border-cream-100/10 rounded-xl text-cream-100 placeholder-cream-200/40 focus:outline-none focus:border-honey transition-colors resize-none"
                        placeholder="Votre message ici..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-honey text-dark font-medium rounded-xl hover:bg-honey-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Envoyer
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Infos contact - style carte produit */}
              <div
                className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                {/* WhatsApp Direct */}
                <div className="bg-dark-100 rounded-2xl overflow-hidden border border-cream-100/10 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.588 2.014.896 3.13.897h.003c3.18 0 5.767-2.587 5.768-5.766.001-3.18-2.585-5.768-5.766-5.768zm2.015 8.06c-.246.406-.735.812-1.189.823-.321.008-.706-.073-1.119-.233-.461-.178-.884-.417-1.247-.72-.853-.705-1.486-1.649-1.751-2.622-.161-.587-.179-1.151-.055-1.583.128-.44.423-.806.859-.979.295-.117.605-.099.813-.054.148.032.268.112.364.24.1.133.188.298.265.47.054.12.092.245.116.367.03.15.021.304-.027.439-.035.1-.084.187-.142.256-.068.082-.133.15-.19.208-.091.093-.176.178-.248.254-.06.063-.129.131-.185.208-.048.066-.106.148-.127.245-.022.101-.005.212.04.326.051.13.131.262.223.39.217.304.508.589.823.802.244.165.5.283.743.346.117.03.213.04.288.028.066-.01.124-.034.175-.07.057-.041.098-.09.127-.143.034-.061.051-.131.05-.204-.001-.075-.025-.145-.056-.2-.051-.093-.149-.204-.226-.292-.028-.032-.052-.06-.072-.084-.017-.021-.031-.039-.041-.054-.026-.04-.041-.076-.045-.111-.003-.025.003-.048.014-.07.022-.044.064-.088.106-.138.065-.077.138-.162.19-.261.053-.101.078-.215.059-.333-.016-.101-.063-.188-.125-.258-.06-.07-.135-.123-.222-.159-.339-.139-.713-.254-1.034-.261-.165-.003-.301.023-.411.075zM12.031 1.959c-5.143 0-9.312 4.168-9.313 9.311-.001 1.817.525 3.215 1.242 4.538L2.346 21.3c-.213.794.498 1.513 1.294 1.306l5.496-1.539c1.299.755 2.812 1.185 4.362 1.186h.004c5.143 0 9.313-4.169 9.313-9.311 0-5.142-4.169-9.311-9.311-9.311zm0 17.023c-1.516 0-2.979-.441-4.196-1.253l-.323-.195-3.207.898.855-3.124-.197-.334c-.869-1.393-1.339-2.967-1.339-4.586.001-4.522 3.679-8.2 8.201-8.2 4.522 0 8.2 3.678 8.2 8.2 0 4.523-3.678 8.2-8.2 8.2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-cream-100">WhatsApp direct</h3>
                      <p className="text-cream-200/60 text-sm">Réponse sous 24h</p>
                    </div>
                  </div>
                  <p className="text-cream-200/80 mb-4">
                    Posez toutes vos questions directement sur WhatsApp, nous sommes à votre écoute.
                  </p>
                  <a
                    href="https://wa.me/2250504272827?text=Bonjour%20Colonie%2C%20j%27ai%20une%20question%20sur%20vos%20produits"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.588 2.014.896 3.13.897h.003c3.18 0 5.767-2.587 5.768-5.766.001-3.18-2.585-5.768-5.766-5.768zm2.015 8.06c-.246.406-.735.812-1.189.823-.321.008-.706-.073-1.119-.233-.461-.178-.884-.417-1.247-.72-.853-.705-1.486-1.649-1.751-2.622-.161-.587-.179-1.151-.055-1.583.128-.44.423-.806.859-.979.295-.117.605-.099.813-.054.148.032.268.112.364.24.1.133.188.298.265.47.054.12.092.245.116.367.03.15.021.304-.027.439-.035.1-.084.187-.142.256-.068.082-.133.15-.19.208-.091.093-.176.178-.248.254-.06.063-.129.131-.185.208-.048.066-.106.148-.127.245-.022.101-.005.212.04.326.051.13.131.262.223.39.217.304.508.589.823.802.244.165.5.283.743.346.117.03.213.04.288.028.066-.01.124-.034.175-.07.057-.041.098-.09.127-.143.034-.061.051-.131.05-.204-.001-.075-.025-.145-.056-.2-.051-.093-.149-.204-.226-.292-.028-.032-.052-.06-.072-.084-.017-.021-.031-.039-.041-.054-.026-.04-.041-.076-.045-.111-.003-.025.003-.048.014-.07.022-.044.064-.088.106-.138.065-.077.138-.162.19-.261.053-.101.078-.215.059-.333-.016-.101-.063-.188-.125-.258-.06-.07-.135-.123-.222-.159-.339-.139-.713-.254-1.034-.261-.165-.003-.301-.023-.411-.075zM12.031 1.959c-5.143 0-9.312 4.168-9.313 9.311-.001 1.817.525 3.215 1.242 4.538L2.346 21.3c-.213.794.498 1.513 1.294 1.306l5.496-1.539c1.299.755 2.812 1.185 4.362 1.186h.004c5.143 0 9.313-4.169 9.313-9.311 0-5.142-4.169-9.311-9.311-9.311zm0 17.023c-1.516 0-2.979-.441-4.196-1.253l-.323-.195-3.207.898.855-3.124-.197-.334c-.869-1.393-1.339-2.967-1.339-4.586.001-4.522 3.679-8.2 8.201-8.2 4.522 0 8.2 3.678 8.2 8.2 0 4.523-3.678 8.2-8.2 8.2z" />
                    </svg>
                    Écrire sur WhatsApp
                  </a>
                </div>

                {/* Infos physiques */}
                <div className="bg-dark-100 rounded-2xl overflow-hidden border border-cream-100/10 p-6 md:p-8">
                  <h3 className="text-xl font-serif text-cream-100 mb-4">Nos coordonnées</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-honey mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="text-cream-200 font-medium">Adresse</p>
                        <p className="text-cream-200/60 text-sm">Abidjan, Cocody - Côte d&apos;Ivoire</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-honey mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-cream-200 font-medium">Email</p>
                        <a href="mailto:contact@colonie.ci" className="text-cream-200/60 text-sm hover:text-honey transition-colors">
                          contact@colonie.ci
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-honey mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="text-cream-200 font-medium">Téléphone</p>
                        <a href="tel:+2250700000000" className="text-cream-200/60 text-sm hover:text-honey transition-colors">
                          +225 07 00 00 00 00
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Horaires */}
                <div className="bg-dark-100 rounded-2xl overflow-hidden border border-cream-100/10 p-6 md:p-8">
                  <h3 className="text-xl font-serif text-cream-100 mb-4">Horaires d&apos;ouverture</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-cream-200/60">Lundi - Vendredi</span>
                      <span className="text-cream-200">8h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream-200/60">Samedi</span>
                      <span className="text-cream-200">9h00 - 13h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream-200/60">Dimanche</span>
                      <span className="text-cream-200">Fermé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - identique à la page produits */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-honey/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-honey" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-cream-100 font-semibold mb-2">Qualité garantie</h4>
                <p className="text-cream-200/60 text-sm">Miel 100% pur, sans additifs ni conservateurs</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-honey/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-honey" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001-1m-6 0h6" />
                  </svg>
                </div>
                <h4 className="text-cream-100 font-semibold mb-2">Producteur local</h4>
                <p className="text-cream-200/60 text-sm">Soutien à l&apos;apiculture ivoirienne</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-honey/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-honey" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-cream-100 font-semibold mb-2">Livraison rapide</h4>
                <p className="text-cream-200/60 text-sm">Expédition sous 24h à Abidjan</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}