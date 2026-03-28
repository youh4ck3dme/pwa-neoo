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
            <h4 className="font-bold text-slate-900 mb-6">Navigácia</h4>
            <ul className="space-y-4 text-slate-500 font-medium text-sm">
              <li><a href="#domov" className="hover:text-primary-600 transition-colors">Domov</a></li>
              <li><a href="#o-nas" className="hover:text-primary-600 transition-colors">O spoločnosti</a></li>
              <li><a href="#portfolio" className="hover:text-primary-600 transition-colors">Portfólio</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Právne s.r.o. 2026</h4>
            <ul className="space-y-4 text-slate-500 font-medium text-sm">
              <li><a href="/privacy" className="hover:text-primary-600 transition-colors">Súkromie</a></li>
              <li><a href="/terms" className="hover:text-primary-600 transition-colors">Podmienky</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Firma</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              MA.GI.CA s.r.o.<br />
              Partizánska 101/45<br />
              96501 Žiar nad Hronom
            </p>
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
