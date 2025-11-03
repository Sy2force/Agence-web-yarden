import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Web Yarden</h3>
            <p className="text-gray-400 text-sm">
              L'agence digitale des francophones en Israël. Création de sites, marketing digital, automatisations.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Création de sites
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Marketing digital
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Référencement local
                </Link>
              </li>
              <li>
                <Link href="/simulateur" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Simulateur de devis
                </Link>
              </li>
            </ul>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/packs" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Nos packs
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="h-4 w-4" />
                +972 50 123 4567
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4" />
                contact@webyarden.com
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4" />
                Tel Aviv, Israël
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Web Yarden. Tous droits réservés.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Agence digitale pour les francophones en Israël
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
