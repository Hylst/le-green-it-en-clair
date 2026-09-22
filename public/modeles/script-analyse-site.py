#!/usr/bin/env python3
"""
Script d'analyse Green IT pour site web
Analyse l'empreinte environnementale d'un site web :
poids HTML, complexité DOM, ressources, écoconception
et poids réel transféré (chaque image, JS et CSS est téléchargé et pesé).

Usage: python script-analyse-site.py <url>
Example: python script-analyse-site.py https://example.com

Auteur: Le Green IT en clair (hylst.fr/greenit)
License: MIT - Libre d'usage
"""

import sys
import json
import re
from urllib.parse import urlparse, urljoin
from datetime import datetime

# Console Windows (cp1252) : les emojis feraient planter l'affichage sans ça
try:
    if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

# Limites de la pesée réelle : on ne veut ni ralentir l'analyse ni saturer la mémoire
TIMEOUT_RESSOURCE = 8              # secondes max par ressource
TAILLE_MAX_RESSOURCE = 10 * 1024 * 1024  # on pèse au plus 10 Mo par fichier
MAX_RESSOURCES = 60                # au-delà, les suivantes sont ignorées

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Erreur : dépendances manquantes. Installez-les avec:")
    print("   pip install requests beautifulsoup4")
    sys.exit(1)


class WebsiteAnalyzer:
    """Analyseur d'empreinte environnementale de site web"""
    
    def __init__(self, url):
        self.url = url
        self.domain = urlparse(url).netloc
        self.results = {
            "url": url,
            "date_analyse": datetime.now().isoformat(),
            "poids": {},
            "ressources": {},
            "ecoconception": {},
            "score_global": 0
        }
    
    def analyze(self):
        """Lance l'analyse complète"""
        print(f"\nAnalyse Green IT de : {self.url}\n")
        
        try:
            # Session réutilisée (connexions persistantes) + UA navigateur :
            # sans lui, beaucoup de sites bloquent les robots
            self.session = requests.Session()
            self.session.headers.update({
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) GreenIT-Analyzer/1.0"
            })
            response = self.session.get(self.url, timeout=10)
            response.raise_for_status()

            html_content = response.text
            soup = BeautifulSoup(html_content, 'html.parser')

            # Analyses
            self._analyze_weight(html_content, response)
            self._analyze_dom(soup)
            self._analyze_resources(soup)
            self._analyze_transferts(soup)
            self._analyze_best_practices(soup, html_content)
            self._calculate_score()
            
            # Affichage du rapport
            self._display_report()
            
            # Sauvegarde
            self._save_results()
            
        except requests.exceptions.RequestException as e:
            print(f"Erreur lors de la récupération de la page : {e}")
            sys.exit(1)
    
    def _analyze_weight(self, html_content, response):
        """Analyse le poids de la page"""
        html_size = len(html_content.encode('utf-8'))
        total_size = html_size
        
        # Estimation taille headers
        headers_size = sum(len(k) + len(v) for k, v in response.headers.items())
        total_size += headers_size
        
        self.results["poids"] = {
            "html_ko": round(html_size / 1024, 2),
            "total_estime_ko": round(total_size / 1024, 2),
            "headers_ko": round(headers_size / 1024, 2)
        }
        
        print(f"Poids HTML : {self.results['poids']['html_ko']} Ko")
    
    def _analyze_dom(self, soup):
        """Analyse la complexité du DOM"""
        total_elements = len(soup.find_all())
        divs = len(soup.find_all('div'))
        depth = self._get_dom_depth(soup)
        
        self.results["dom"] = {
            "elements_total": total_elements,
            "divs": divs,
            "profondeur_max": depth
        }
        
        print(f"Éléments DOM : {total_elements}")
        print(f"   - Profondeur max : {depth}")

        # Recommandations
        if total_elements > 1500:
            print("   [!] DOM très complexe (>1500 éléments)")
        if depth > 15:
            print(f"   [!] Profondeur excessive (>{depth})")
    
    def _get_dom_depth(self, element, depth=0):
        """Calcule la profondeur max du DOM"""
        if not element.children:
            return depth
        return max([self._get_dom_depth(child, depth + 1) 
                   for child in element.children 
                   if child.name], default=depth)
    
    def _analyze_resources(self, soup):
        """Analyse les ressources externes"""
        images = soup.find_all('img')
        scripts = soup.find_all('script', src=True)
        links_css = soup.find_all('link', rel='stylesheet')
        
        # Analyse images (un alt vide est valide : image décorative)
        images_without_alt = [img for img in images if img.get('alt') is None]
        images_format_moderne = [img for img in images
                                 if '.webp' in (img.get('src', '') + img.get('srcset', ''))
                                 or '.avif' in (img.get('src', '') + img.get('srcset', ''))]
        
        self.results["ressources"] = {
            "images_total": len(images),
            "images_sans_alt": len(images_without_alt),
            "images_format_moderne": len(images_format_moderne),
            "scripts_externes": len(scripts),
            "css_externes": len(links_css)
        }
        
        print(f"\nRessources :")
        print(f"   - Images : {len(images)}")
        if images_without_alt:
            print(f"   [!] {len(images_without_alt)} images sans attribut alt")
        if len(images) > 0:
            ratio_moderne = len(images_format_moderne) / len(images) * 100
            print(f"   - Formats modernes (WebP/AVIF) : {ratio_moderne:.0f}%")
        print(f"   - Scripts JS : {len(scripts)}")
        print(f"   - CSS externes : {len(links_css)}")
    
    def _collect_resource_urls(self, soup):
        """Liste les URL de ressources à peser (images, JS, CSS, médias)"""
        urls = []

        for img in soup.find_all("img"):
            if img.get("src"):
                urls.append(img["src"])
            urls.extend(self._srcset_urls(img.get("srcset", "")))

        for balise in soup.find_all("script", src=True):
            urls.append(balise["src"])

        for balise in soup.find_all("link", href=True):
            rel = " ".join(balise.get("rel", [])).lower()
            if "stylesheet" in rel or "icon" in rel:
                urls.append(balise["href"])

        for balise in soup.find_all(["video", "audio", "source"]):
            if balise.get("src"):
                urls.append(balise["src"])
            urls.extend(self._srcset_urls(balise.get("srcset", "")))

        # URL absolues, dédupliquées, sans data: ni ancres ni page elle-même
        propres = []
        for u in dict.fromkeys(urls):
            if u.startswith(("data:", "blob:", "javascript:", "mailto:", "#")):
                continue
            absolue = urljoin(self.url, u).split("#")[0]
            if absolue and absolue != self.url and absolue not in propres:
                propres.append(absolue)
        return propres[:MAX_RESSOURCES]

    @staticmethod
    def _srcset_urls(srcset):
        """Extrait les URL d'un attribut srcset"""
        urls = []
        for candidat in srcset.split(","):
            morceau = candidat.strip().split()
            if morceau:
                urls.append(morceau[0])
        return urls

    def _analyze_transferts(self, soup):
        """Pèse réellement chaque ressource en la téléchargeant (plafonné)"""
        urls = self._collect_resource_urls(soup)
        details = []
        echecs = 0

        for u in urls:
            try:
                with self.session.get(u, timeout=TIMEOUT_RESSOURCE, stream=True) as r:
                    r.raise_for_status()
                    taille = 0
                    for morceau in r.iter_content(chunk_size=65536):
                        taille += len(morceau)
                        if taille > TAILLE_MAX_RESSOURCE:
                            break
                    details.append({"url": u, "octets": taille})
            except requests.exceptions.RequestException:
                echecs += 1

        details.sort(key=lambda d: d["octets"], reverse=True)
        total_ko = round(sum(d["octets"] for d in details) / 1024, 2)

        self.results["transfert_reel"] = {
            "ressources_comptees": len(details),
            "ressources_inaccessibles": echecs,
            "total_ko": total_ko,
            "plus_lourdes": [
                {"url": d["url"][-80:], "ko": round(d["octets"] / 1024, 2)}
                for d in details[:5]
            ],
        }

        print(f"\nTransfert réel : {total_ko} Ko ({len(details)} ressources pesées, {echecs} inaccessibles)")
        for lourde in self.results["transfert_reel"]["plus_lourdes"]:
            print(f"   - {lourde['ko']} Ko : {lourde['url']}")

    def _analyze_best_practices(self, soup, html_content):
        """Vérifie les bonnes pratiques écoconception"""
        checks = {}
        
        # Compression
        checks["html_minifie"] = not bool(re.search(r'\n\s{4,}', html_content))
        
        # Inline critiques
        inline_styles = bool(soup.find_all(style=True))
        checks["pas_inline_styles"] = not inline_styles
        
        # Meta viewport
        checks["meta_viewport"] = bool(soup.find('meta', attrs={'name': 'viewport'}))
        
        # Lazy loading
        lazy_images = soup.find_all('img', loading='lazy')
        checks["lazy_loading"] = len(lazy_images) > 0
        
        # Dark mode
        checks["dark_mode_support"] = bool(
            soup.find('meta', attrs={'name': 'color-scheme'}) or
            'prefers-color-scheme' in html_content
        )
        
        # Polices locales (aucune police externe = parfait, pas un échec)
        external_fonts = soup.find_all('link', href=re.compile(r'fonts\.(googleapis|gstatic)'))
        checks["polices_locales"] = len(external_fonts) == 0
        
        self.results["ecoconception"] = checks
        
        print(f"\nBonnes pratiques :")
        for check, passed in checks.items():
            icon = "[OK]" if passed else "[KO]"
            print(f"   {icon} {check.replace('_', ' ').title()}")
    
    def _calculate_score(self):
        """Calcule un score global sur 100"""
        score = 100
        
        # Pénalités poids
        if self.results["poids"]["html_ko"] > 100:
            score -= 10
        if self.results["poids"]["html_ko"] > 200:
            score -= 10
        
        # Pénalités DOM
        if self.results["dom"]["elements_total"] > 1500:
            score -= 10
        if self.results["dom"]["profondeur_max"] > 15:
            score -= 5
        
        # Pénalités ressources
        if self.results["ressources"]["scripts_externes"] > 10:
            score -= 10
        if self.results["ressources"]["images_sans_alt"] > 0:
            score -= 5
        
        # Pénalités transfert réel (repères indicatifs : au-delà de 1 Mo, puis de 2 Mo)
        if self.results["transfert_reel"]["total_ko"] > 1024:
            score -= 10
        if self.results["transfert_reel"]["total_ko"] > 2048:
            score -= 5

        # Bonus bonnes pratiques
        good_practices = sum(1 for v in self.results["ecoconception"].values() if v)
        score += good_practices * 3
        
        self.results["score_global"] = max(0, min(100, score))
    
    def _display_report(self):
        """Affiche le rapport final"""
        score = self.results["score_global"]
        
        print(f"\n{'='*50}")
        print(f"SCORE GLOBAL : {score}/100")

        if score >= 80:
            niveau = "Excellent"
        elif score >= 60:
            niveau = "Bon"
        elif score >= 40:
            niveau = "Moyen"
        else:
            niveau = "À améliorer"

        print(f"   Niveau : {niveau}")
        print(f"{'='*50}\n")

        # Recommandations (numérotées sans trou)
        print("Recommandations principales :")

        reco = []
        if self.results["transfert_reel"]["total_ko"] > 1024:
            reco.append("Réduire le poids total transféré (voir les ressources les plus lourdes ci-dessus)")

        if self.results["poids"]["html_ko"] > 100:
            reco.append("Réduire le poids HTML (minification, compression)")

        if self.results["ressources"]["images_sans_alt"] > 0:
            reco.append("Ajouter des attributs alt à toutes les images")

        if not self.results["ecoconception"].get("lazy_loading"):
            reco.append("Implémenter le lazy loading pour les images")

        if self.results["ressources"]["scripts_externes"] > 5:
            reco.append("Réduire le nombre de scripts externes")

        if not self.results["ecoconception"].get("dark_mode_support"):
            reco.append("Ajouter le support du mode sombre")

        for i, texte in enumerate(reco, 1):
            print(f"   {i}. {texte}")

        if not reco:
            print("   Rien à signaler, bravo !")

        print()
    
    def _save_results(self):
        """Sauvegarde les résultats en JSON"""
        # Domaine assaini (un port comme :8123 est interdit dans les noms de fichiers Windows)
        safe_domain = re.sub(r'[^A-Za-z0-9.-]+', '_', self.domain)
        filename = f"analyse_{safe_domain}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.results, f, indent=2, ensure_ascii=False)
        
        print(f"Rapport sauvegardé : {filename}\n")


def main():
    """Point d'entrée du script"""
    if len(sys.argv) < 2:
        print("Usage: python script-analyse-site.py <url>")
        print("Exemple: python script-analyse-site.py https://example.com")
        sys.exit(1)
    
    url = sys.argv[1]
    
    # Validation basique de l'URL
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url
    
    analyzer = WebsiteAnalyzer(url)
    analyzer.analyze()
    
    print("Analyse terminée !")
    print("Pour plus d'infos : https://hylst.fr/greenit\n")


if __name__ == "__main__":
    main()
