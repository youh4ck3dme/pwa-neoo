import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6 block">
              MA.GI.CA <span className="text-primary-600">ENTERPRISE</span>
            </a>
            <div className="flex space-x-5">
              <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all"><i className="fab fa-twitter text-sm"></i></a>
              <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all"><i className="fab fa-linkedin-in text-sm"></i></a>
              <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all"><i className="fab fa-github text-sm"></i></a>
            </div>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-900 mb-6 uppercase tracking-widest text-xs">Rýchle odkazy</h4>
            <ul className="space-y-4 text-slate-500 font-medium text-sm">
              <li><a href="#domov" className="hover:text-primary-600 transition-colors">Domov</a></li>
              <li><a href="#sluzby" className="hover:text-primary-600 transition-colors">Enterprise Služby</a></li>
              <li><a href="#portfolio" className="hover:text-primary-600 transition-colors">Portfólio & Laboratórium</a></li>
              <li><a href="#kontakt" className="hover:text-primary-600 transition-colors">Kontaktujte nás</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-900 mb-6 uppercase tracking-widest text-xs">Právne informácie</h4>
            <ul className="space-y-4 text-slate-500 font-medium text-sm">
              <li><a href="/privacy" className="hover:text-primary-600 transition-colors">Ochrana osobných údajov</a></li>
              <li><a href="/terms" className="hover:text-primary-600 transition-colors">Obchodné podmienky</a></li>
              <li><a href="/cookies" className="hover:text-primary-600 transition-colors">Nastavenie Cookies</a></li>
              <li><a href="/gdpr" className="hover:text-primary-600 transition-colors">GDPR & Zabezpečenie</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-900 mb-6 uppercase tracking-widest text-xs">Informácie o firme</h4>
            <div className="text-sm text-slate-500 leading-relaxed space-y-2">
              <p className="font-bold text-slate-900">MA.GI.CA., s.r.o.</p>
              <p>Partizánska 101/45<br />965 01 Žiar nad Hronom</p>
              <div className="pt-2 border-t border-slate-50 space-y-1">
                <p><span className="font-semibold text-slate-400 mr-2">IČO:</span> 31 677 517</p>
                <p><span className="font-semibold text-slate-400 mr-2">DIČ:</span> 2020491550</p>
              </div>
              <div className="pt-2 border-t border-slate-50 space-y-1">
                <p><span className="font-semibold text-slate-400 mr-2">Email:</span> <a href="mailto:magicasro@hotmail.com" className="hover:text-primary-600 transition-colors">magicasro@hotmail.com</a></p>
                <p><span className="font-semibold text-slate-400 mr-2">Mobil:</span> <a href="tel:+421917488903" className="hover:text-primary-600 transition-colors">+421 917 488 903</a></p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm font-medium">&copy; 2026 MA.GI.CA s.r.o. Všetky práva vyhradené.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
