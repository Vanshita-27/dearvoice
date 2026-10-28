import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, Check, ChevronDown, Heart, Menu, Play, QrCode,
  Search, ShieldCheck, Sparkles, X, MessageCircle,
  Gift, Volume2, Moon, Sun
} from 'lucide-react';
import { products, categories } from './data/products.js';

const photoFallback = 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1000&q=85';

function InstagramMark({ size = 20, strokeWidth = 1.8 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>;
}

function Logo({ light = false }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="#home" aria-label="DearVoice home">
    <span className="brand-mark"><Heart size={17} strokeWidth={1.7} /></span>
    <span>dearvoice<span className="brand-dot">.</span></span>
  </a>;
}

function ProductCard({ product, onOpen }) {
  return <article className={`product-card ${product.comingSoon ? 'product-coming' : ''}`}>
    <button className="product-image-button" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
      <img src={product.image || photoFallback} alt={product.name} loading="lazy" onError={(e) => { e.currentTarget.src = photoFallback; }} />
      <span className={`product-label ${product.comingSoon ? 'label-muted' : ''}`}>{product.label}</span>
      <span className="image-arrow"><ArrowDownRight size={19} /></span>
    </button>
    <div className="product-meta">
      <div><p className="product-category">{product.category}</p><h3>{product.name}</h3></div>
      <span className="product-price"><strong>₹{product.price}</strong><del>₹{product.mrp}</del><small>{product.discount}</small></span>
    </div>

<div className="product-card-actions">
  <button
    className="text-link product-details-link"
    onClick={() => onOpen(product)}
  >
    View details <ArrowRight size={15} />
  </button>

  <a
    className="product-buy-link"
    href={product.meeshoUrl}
    target="_blank"
    rel="noreferrer"
  >
    Buy on Meesho
  </a>

  <a
    className="product-buy-link whatsapp-order-link"
    href={`https://wa.me/918319898171?text=${encodeURIComponent(
      `Hi DearVoice! I'd like to order ${product.name} for ₹${product.price}. Please guide me with the ordering process.`
    )}`}
    target="_blank"
    rel="noreferrer"
  >
    Order on WhatsApp
  </a>
</div>

  </article>;
}

function ProductModal({ product, onClose }) {
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => { setActiveImage(0); }, [product?.id]);
  if (!product) return null;
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="product-modal" role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
      <button className="modal-close icon-button" onClick={onClose} aria-label="Close details"><X size={20} /></button>
      <div className="modal-gallery"><div className="modal-image"><img src={gallery[activeImage] || product.image || photoFallback} alt={`${product.name} product view ${activeImage + 1}`} onError={(e) => { e.currentTarget.src = photoFallback; }} /></div><div className="modal-thumbnails" aria-label="Product image gallery">{gallery.map((src, i) => <button key={src} className={activeImage === i ? 'active' : ''} onClick={() => setActiveImage(i)} aria-label={`Show product image ${i + 1}`}><img src={src} alt="" /></button>)}</div></div>
      <div className="modal-content">
        <p className="eyebrow">{product.category}</p>
        <h2>{product.name}</h2>
        <p className="modal-price"><strong>₹{product.price}</strong> <del>₹{product.mrp}</del> <span>{product.discount} · Price shown on listing</span></p>
        <p className="body-copy">{product.description}</p>
        <h4>Thoughtfully considered</h4>
        <ul className="includes-list">{product.includes.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
        <a className="button button-dark" href={product.meeshoUrl} target="_blank" rel="noreferrer">Buy on Meesho <ArrowRight size={17} /></a>
        <p className="fine-print"><ShieldCheck size={14} /> Checkout and payment will be completed on Meesho.</p>
      </div>
    </section>
  </div>;
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All gifts');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const demoVideoRef = React.useRef(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    try { return window.localStorage.getItem('dearvoice-theme') === 'dark'; } catch { return false; }
  });
  useEffect(() => {
    try { window.localStorage.setItem('dearvoice-theme', darkMode ? 'dark' : 'light'); } catch { /* storage may be unavailable */ }
  }, [darkMode]);
  const visibleProducts = useMemo(() => products.filter((p) => {
    const categoryMatch = activeCategory === 'All gifts' || p.category === activeCategory;
    const searchMatch = `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  }), [activeCategory, searchTerm]);

  const faqs = [
    { q: 'How does a DearVoice memory gift work?', a: 'The gift connects a physical keepsake with a digital memory experience. Scan the QR code on the delivered product with your phone camera or Google Lens to open the linked sample-specific voice or video page.' },
    { q: 'Do I need to install an app?', a: 'No special app is intended to be required. A compatible phone camera or QR scanner and an internet connection are generally enough to open a QR-linked page.' },
    { q: 'Where do I place my order?', a: 'Choose a product and use its Buy on Meesho button. Meesho will handle the checkout and payment for that listing.' },
    { q: 'Can I see a demo before buying?', a: 'Yes. Play the DearVoice demonstration video in the How It Works section to see how the QR memory gift works.' }
  ];

  const scrollToShop = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  return <div className={`site-shell ${darkMode ? 'dark-mode' : ''}`} data-theme={darkMode ? 'dark' : 'light'}>
    <div className="announcement"><Sparkles size={13} /> A hidden moment. <span className="announcement-separator">✦</span> Memories made personal.</div>
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className={`main-nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <a href="#shop" onClick={() => setMobileMenuOpen(false)}>Shop gifts</a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)}>The experience</a>
          <a href="#story" onClick={() => setMobileMenuOpen(false)}>Our story</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQs</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button theme-toggle" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} onClick={() => setDarkMode((current) => !current)}>{darkMode ? <Sun size={19} /> : <Moon size={19} />}</button>
          <button className="icon-button search-toggle" aria-label="Jump to product search" onClick={() => { scrollToShop(); setTimeout(() => document.getElementById('product-search')?.focus(), 350); }}><Search size={19} /></button>
          <button className="button button-dark header-cta" onClick={scrollToShop}>Find your gift <ArrowRight size={16} /></button>
          <button className="icon-button mobile-menu-toggle" aria-label="Toggle menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line"></span> A hidden moment.</p>
          <h1>Some moments<br />deserve to <em>stay.</em></h1>
          <p className="hero-description">Personalized photo cards and QR wallet cards that connect your favourite pictures with a voice message or video memory. A small keepsake for the people who mean everything.</p>
          <div className="hero-actions">
            <button className="button button-dark" onClick={scrollToShop}>Explore the gifts <ArrowRight size={17} /></button>
            <a className="text-link" href="#experience"><span className="play-outline"><Play size={12} fill="currentColor" /></span> See how it works</a>
          </div>
          <div className="hero-proof"><span className="proof-icon"><Heart size={15} /></span><span>Created for the people who mean the most.</span></div>
        </div>
        <div className="hero-art">
          <div className="hero-image-main"><img src="/images/product-4-main.jpeg" alt="DearVoice personalized photo cards with wooden stands and QR memory codes" /></div>
          <div className="hero-note"><span className="note-sparkle">✳</span><span>Keep the feeling.<br /><em>Keep the memory.</em></span></div>
          <div className="floating-card floating-card-top"><Heart size={16} /><span>Made with meaning</span></div>
          <div className="floating-card floating-card-bottom"><span className="tiny-dot"></span><span>Little things, lasting feelings</span></div>
          <div className="hero-ring"></div>
        </div>
        <div className="hero-side-note">GIFTS THAT SAY WHAT WORDS CAN'T</div>
      </section>

      <section className="values-strip" aria-label="DearVoice values">
        <div><Heart size={18} /><span>Personal by nature</span></div><span className="values-star">✳</span>
        <div><QrCode size={18} /><span>Memories beyond a photo</span></div><span className="values-star">✳</span>
        <div><Gift size={18} /><span>Made for meaningful moments</span></div>
      </section>

      <section className="shop-section section-pad" id="shop">
        <div className="section-heading">
          <div><p className="eyebrow">The DearVoice collection</p><h2>A gift for <em>your kind</em><br className="desktop-break" /> of love.</h2></div>
          <p className="section-intro">For the person who makes you laugh, the one you miss, or the moment you want to keep close. Find something that feels like them.</p>
        </div>
        <div className="shop-tools">
          <div className="category-list" role="group" aria-label="Filter products by category">
            {categories.map((category) => <button key={category} className={`category-chip ${activeCategory === category ? 'active' : ''}`} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          <label className="search-box"><Search size={17} /><input id="product-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Find a thoughtful gift" aria-label="Search gifts" /><span className="search-shortcut">↵</span></label>
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} onOpen={setSelectedProduct} />)}
        </div>
        {visibleProducts.length === 0 && <div className="empty-state"><Search size={24} /><p>No gifts match that search yet.</p><button className="text-link" onClick={() => { setSearchTerm(''); setActiveCategory('All gifts'); }}>Clear filters <ArrowRight size={15} /></button></div>}
        <div className="shop-note"><span><ShieldCheck size={16} /> Secure checkout on Meesho</span><span>More little ways to say “I thought of you” are on the way.</span></div>
      </section>

      <section className="experience-section" id="experience">
        <div className="experience-art experience-video-art">
          <div className="memory-photo memory-video-frame">
            <video ref={demoVideoRef} className="experience-main-video" controls playsInline preload="metadata" aria-label="DearVoice product demonstration video">
              <source src="/videos/dearvoice-how-it-works.mp4" type="video/mp4" />
              Your browser does not support embedded video. Please use a modern browser to watch the DearVoice demo.
            </video>
          </div>
          <div className="experience-video-caption"><Play size={14} fill="currentColor" /> See the real DearVoice process</div>
        </div>
        <div className="experience-copy">
          <p className="eyebrow"><span className="eyebrow-line"></span> More than what meets the eye</p>
          <h2>A photo holds<br />a moment. <em>A memory<br />brings it back.</em></h2>
          <p className="body-copy">Some memories deserve more than a place in your camera roll. DearVoice brings a physical keepsake and a digital memory together, so a favourite photo can lead back to a voice, a laugh, or a little message.</p>
          <div className="steps-list">
            <div className="step-item"><span className="step-number">01</span><div><h3>Choose a meaningful gift</h3><p>Find a keepsake for someone special.</p></div></div>
            <div className="step-item"><span className="step-number">02</span><div><h3>Scan to revisit the moment</h3><p>Use your phone to open the linked memory experience.</p></div></div>
            <div className="step-item"><span className="step-number">03</span><div><h3>Feel a little closer</h3><p>Because some moments deserve to be kept close.</p></div></div>
          </div>
          <button className="button button-dark watch-demo-button" onClick={() => { const video = demoVideoRef.current; if (!video) return; video.scrollIntoView({ behavior: 'smooth', block: 'center' }); video.play().catch(() => {}); }}><Play size={15} fill="currentColor" /> Watch the demo video</button>
          <p className="fine-print"><ShieldCheck size={14} /> Watch how a QR scan opens a linked voice or video memory. The video is a product demonstration.</p>
        </div>
      </section>

      <section className="occasion-section section-pad">
        <div className="occasion-heading"><p className="eyebrow">For every kind of connection</p><h2>Whatever the occasion,<br /><em>make it mean something.</em></h2></div>
        <div className="occasion-grid">
          <a href="#shop" onClick={() => setActiveCategory('All gifts')} className="occasion-card occasion-birthday"><img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85" alt="Celebration balloons" /><div><span>01 / CELEBRATE</span><h3>Birthdays & milestones</h3><ArrowRight size={18} /></div></a>
          <a href="#shop" onClick={() => setActiveCategory('All gifts')} className="occasion-card occasion-love"><img src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=85" alt="A couple sharing a meaningful moment" /><div><span>02 / SHOW YOUR LOVE</span><h3>Anniversaries & love</h3><ArrowRight size={18} /></div></a>
          <a href="#shop" onClick={() => setActiveCategory('All gifts')} className="occasion-card occasion-friend"><img src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=85" alt="Friends celebrating together" /><div><span>03 / JUST BECAUSE</span><h3>Friends & little surprises</h3><ArrowRight size={18} /></div></a>
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="story-decoration">“</div>
        <p className="eyebrow">A note from DearVoice</p>
        <h2>Not just a gift.<br /><em>A feeling you can keep.</em></h2>
        <p className="story-copy">We believe the best gifts aren't always the biggest. Sometimes they're the small reminders of a person, a place, a laugh, or a moment that means everything. DearVoice is made for those moments.</p>
        <button className="text-link" onClick={scrollToShop}>Find a memory worth keeping <ArrowRight size={16} /></button>
      </section>

      <section className="reviews-section section-pad" id="reviews">
        <div className="reviews-heading"><p className="eyebrow">Real stories, from real people</p><h2>Your memory could be<br /><em>the next story.</em></h2><p>We're just getting started. Once customers share their experiences, we'll feature their honest feedback here.</p><a className="button button-dark" href="https://wa.me/918319898171?text=Hi%20DearVoice%2C%20I%27d%20like%20to%20share%20feedback%20about%20my%20order." target="_blank" rel="noreferrer">Share your feedback <MessageCircle size={16} /></a></div>
        <div className="review-note"><span className="review-heart"><Heart size={23} /></span><p>Every keepsake starts with a moment that matters.</p><span>Customer reviews coming soon</span></div>
      </section>

      <section className="faq-section section-pad" id="faq">
        <div className="faq-intro"><p className="eyebrow">A few helpful things</p><h2>Good to <em>know.</em></h2><p>Have a question before choosing a gift? Start here.</p><a className="text-link" href="https://www.instagram.com/dearvoice/" target="_blank" rel="noreferrer">Find us on Instagram <ArrowRight size={15} /></a></div>
        <div className="faq-list">{faqs.map((faq, index) => <div className={`faq-item ${openFaq === index ? 'faq-open' : ''}`} key={faq.q}><button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{faq.q}</span><ChevronDown size={18} /></button>{openFaq === index && <p className="faq-answer">{faq.a}</p>}</div>)}</div>
      </section>


      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <p className="eyebrow"><span className="eyebrow-line"></span> A little closer</p>
          <h2>Let's stay <em>connected.</em></h2>
          <p className="contact-intro">Follow DearVoice for thoughtful gifting ideas, personalized memories and little moments worth keeping.</p>
          <a className="instagram-feature" href="https://www.instagram.com/dearvoice/" target="_blank" rel="noreferrer" aria-label="Follow DearVoice on Instagram">
            <span className="instagram-icon-wrap"><InstagramMark size={43} strokeWidth={1.7} /></span>
            <span className="instagram-feature-copy"><small>FOLLOW OUR JOURNEY</small><strong>@dearvoice</strong><span>Follow us on Instagram <ArrowRight size={16} /></span></span>
            <ArrowDownRight className="instagram-feature-arrow" size={24} />
          </a>
          <div className="contact-secondary">
            <a href="https://wa.me/918319898171" target="_blank" rel="noreferrer"><MessageCircle size={18} /><span><small>CHAT WITH US</small><strong>WhatsApp</strong></span><ArrowRight size={15} /></a>
            <a href="mailto:dearvoice27@gmail.com"><span className="contact-mail-icon">@</span><span><small>WRITE TO US</small><strong>dearvoice27@gmail.com</strong></span><ArrowRight size={15} /></a>
          </div>
        </div>
      </section>

      <section className="closing-cta">
        <div className="closing-ornament">✳</div><p className="eyebrow">Make it personal</p><h2>Give them something<br /><em>they'll feel.</em></h2><button className="button button-cream" onClick={scrollToShop}>Explore DearVoice <ArrowRight size={17} /></button>
      </section>
    </main>

    <footer className="site-footer">
      <div className="footer-main"><div className="footer-brand"><Logo light /><p>A hidden moment. Little keepsakes for the people who mean everything.</p><div className="social-links"><a href="https://www.instagram.com/dearvoice/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramMark size={17} /></a><a href="https://wa.me/918319898171" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a></div><a className="footer-email" href="mailto:dearvoice27@gmail.com">dearvoice27@gmail.com</a></div>
        <div className="footer-column"><h4>Explore</h4><a href="#shop">Shop gifts</a><a href="#experience">How it works</a><a href="#story">Our story</a><a href="#reviews">Customer feedback</a><a href="#faq">FAQs</a><a href="#contact">Contact</a></div>
        <div className="footer-column"><h4>Need a hand?</h4><a href="https://www.instagram.com/dearvoice/" target="_blank" rel="noreferrer">Instagram</a><a href="https://wa.me/918319898171" target="_blank" rel="noreferrer">WhatsApp contact</a><a href="#faq">Product questions</a></div>
        <div className="footer-note"><span className="footer-heart"><Heart size={17} /></span><p>Made for the people<br />who make life meaningful.</p></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} DearVoice. Made with meaning.</span><span>Thoughtfully made, always.</span></div>
    </footer>
    <a className="whatsapp-float" href="https://wa.me/918319898171" target="_blank" rel="noreferrer" aria-label="Chat with DearVoice on WhatsApp"><MessageCircle size={21} /><span>Chat with us</span></a>
    <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
  </div>;
}

export default App;