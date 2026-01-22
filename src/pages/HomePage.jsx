import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft, FiStar, FiCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './HomePage.css';

const HomePage = () => {
    const categoriesRef = useRef(null);
    const collectionsRef = useRef(null);
    const seasonalRef = useRef(null);

    // Scroll function for sliders
    const scroll = (ref, direction) => {
        if (ref.current) {
            const scrollAmount = 300;
            ref.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // All navbar categories - matching VistaPrint navigation
    const mainCategories = [
        { name: 'Business Cards', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop&q=80', slug: 'business-cards' },
        { name: 'Signs, Banners & Posters', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80', slug: 'signs-banners-posters' },
        { name: 'Postcards & Print Advertising', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop&q=80', slug: 'postcards-print' },
        { name: 'Stickers & Labels', image: 'https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=400&h=300&fit=crop&q=80', slug: 'stickers-labels' },
        { name: 'Clothing & Bags', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=300&fit=crop&q=80', slug: 'clothing-bags' },
        { name: 'Promotional Products', image: 'https://images.unsplash.com/photo-1572119865084-43c285814d63?w=400&h=300&fit=crop&q=80', slug: 'promotional-products' },
        { name: 'Packaging', image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=300&fit=crop&q=80', slug: 'packaging' },
        { name: 'Calendars & Gifts', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop&q=80', slug: 'calendars-gifts' },
        { name: 'Invitations & Stationery', image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=300&fit=crop&q=80', slug: 'invitations-stationery' },
        { name: 'Logo & Websites', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&q=80', slug: 'logo-websites' },
        { name: 'Design Services', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop&q=80', slug: 'design-services' },
        { name: '2-Day Delivery', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop&q=80', slug: '2-day-delivery', isSpecial: true }
    ];

    // Shop by collection
    const collections = [
        { name: 'Custom business cards', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop', slug: 'business-cards' },
        { name: 'Tote bags & more', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&h=300&fit=crop', slug: 'clothing-bags' },
        { name: 'Team uniforms', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=300&fit=crop', slug: 'clothing-bags' },
        { name: 'Custom coffee mugs', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&h=300&fit=crop', slug: 'promotional-products' },
        { name: 'Water bottles', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop', slug: 'promotional-products' },
        { name: 'Yard signs', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', slug: 'signs-banners-posters' },
        { name: 'Custom stickers', image: 'https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=300&h=300&fit=crop', slug: 'stickers-labels' },
        { name: 'Local marketing & signage', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=300&fit=crop', slug: 'signs-banners-posters' }
    ];

    // Seasonal favorites
    const seasonalFavorites = [
        { name: 'Pet Calendars', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop', slug: 'calendars-gifts' },
        { name: 'New Year\'s Cards', image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=300&h=300&fit=crop', slug: 'invitations-stationery' },
        { name: 'Business Cards', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop', slug: 'business-cards' },
        { name: 'Vinyl Banners', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', slug: 'signs-banners-posters' },
        { name: 'Photo Calendars', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=300&h=300&fit=crop', slug: 'calendars-gifts' },
        { name: 'Booklets', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop', slug: 'postcards-print' }
    ];

    // Business tools
    const businessTools = [
        { name: 'Create a free logo', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=200&h=200&fit=crop', link: '/category/logo-websites' },
        { name: 'Build your website', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop', link: '/category/logo-websites' },
        { name: 'Design it yourself', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop', link: '/category/design-services' },
        { name: 'Explore ready designs', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&h=200&fit=crop', link: '/category/design-services' },
        { name: 'Get design help', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop', link: '/category/design-services' },
        { name: 'Advanced services', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200&h=200&fit=crop', link: '/category/design-services' }
    ];

    // Ambassador products
    const ambassadorProducts = [
        { name: 'Ambassador Special', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop', slug: 'promotional-products' },
        { name: 'Paper Cups', image: 'https://images.unsplash.com/photo-1572119865084-43c285814d63?w=300&h=300&fit=crop', slug: 'packaging' },
        { name: 'Brand Packaging', image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=300&h=300&fit=crop', slug: 'packaging' },
        { name: 'Party Stickers', image: 'https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=300&h=300&fit=crop', slug: 'stickers-labels' }
    ];

    return (
        <div className="home-page">
            {/* Hero Section - VistaPrint Style */}
            {/* Hero Section - Premium Marketing Materials */}
            <section className="hero-section">
                <img
                    src="/assets/hero-bg.png"
                    alt="Premium Marketing Materials"
                    className="hero-bg"
                />
                <div className="hero-overlay">
                    <div className="hero-card">
                        <h1>If you need it, we print it.</h1>
                        <p>From custom-printed business products to beautiful photo gifts, we've got the product for you. Plus, with our easy-to-use design tools and services, you get exactly what you want.</p>
                        <span className="hero-subtext">Try our top products starting at just $10 each</span>
                        <div className="hero-buttons">
                            <Link to="/category/business-cards" className="hero-btn white">Try for $10</Link>
                            <Link to="/deals" className="hero-btn outline">Bestselling Products</Link>
                            <Link to="/category/design-services" className="hero-btn outline">Services</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Bar */}
            <section className="trust-bar">
                <div className="container">
                    <div className="trust-list">
                        <div className="trust-item">
                            <span className="trust-icon">📦</span>
                            <div><strong>Custom-printed products</strong><span>Print great products, at great prices, fast</span></div>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">✨</span>
                            <div><strong>Create with more confidence</strong><span>From easy design tools to expert help, we got you</span></div>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">💬</span>
                            <div><strong>Live support</strong><span>Chat with a real person as late as 3am ET</span></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore All Categories with Slider */}
            <section className="categories-section">
                <div className="container">
                    <h2>Explore all categories</h2>
                    <div className="slider-wrapper">
                        <button className="slider-btn prev" onClick={() => scroll(categoriesRef, 'left')}>
                            <FiChevronLeft />
                        </button>
                        <div className="categories-slider" ref={categoriesRef}>
                            {mainCategories.map((cat, index) => (
                                <Link
                                    key={index}
                                    to={cat.slug === '2-day-delivery' ? '/2-day-delivery' : `/category/${cat.slug}`}
                                    className={`category-item ${cat.isSpecial ? 'special' : ''}`}
                                >
                                    <div className="category-img">
                                        <img src={cat.image} alt={cat.name} />
                                    </div>
                                    <span>{cat.name}</span>
                                </Link>
                            ))}
                        </div>
                        <button className="slider-btn next" onClick={() => scroll(categoriesRef, 'right')}>
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            </section>

            {/* Shop by Collection with Slider */}
            <section className="collection-section">
                <div className="container">
                    <h2>Shop by collection</h2>
                    <div className="slider-wrapper">
                        <button className="slider-btn prev" onClick={() => scroll(collectionsRef, 'left')}>
                            <FiChevronLeft />
                        </button>
                        <div className="products-slider" ref={collectionsRef}>
                            {collections.map((item, index) => (
                                <Link key={index} to={`/category/${item.slug}`} className="product-card">
                                    <div className="product-img">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </div>
                        <button className="slider-btn next" onClick={() => scroll(collectionsRef, 'right')}>
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            </section>

            {/* Seasonal Favorites with Slider */}
            <section className="seasonal-section">
                <div className="container">
                    <h2>Explore our seasonal favorites</h2>
                    <div className="slider-wrapper">
                        <button className="slider-btn prev" onClick={() => scroll(seasonalRef, 'left')}>
                            <FiChevronLeft />
                        </button>
                        <div className="products-slider" ref={seasonalRef}>
                            {seasonalFavorites.map((item, index) => (
                                <Link key={index} to={`/category/${item.slug}`} className="product-card">
                                    <div className="product-img">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </div>
                        <button className="slider-btn next" onClick={() => scroll(seasonalRef, 'right')}>
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            </section>

            {/* Promo Banners */}
            <section className="promo-section">
                <div className="container">
                    <div className="promo-row">
                        <div className="promo-card dark">
                            <div className="promo-text">
                                <span className="promo-tag">Top picks for you</span>
                                <h3>Giveaways they'll love (and actually use!)</h3>
                                <p>Get your brand in more hands with 50+ styles of custom promotional products.</p>
                                <Link to="/category/promotional-products" className="promo-btn light">Shop now</Link>
                            </div>
                            <div className="promo-image">
                                <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=300&fit=crop" alt="Promotional" />
                            </div>
                        </div>
                        <div className="promo-card light">
                            <div className="promo-text">
                                <span className="promo-tag">Try it for free</span>
                                <h3>Create it for free. Print it for $10.</h3>
                                <p>Design your own business cards with our free online tools and print 50 for just $10.</p>
                                <Link to="/business-cards" className="promo-btn outline">Start designing</Link>
                            </div>
                            <div className="promo-image">
                                <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop" alt="Business cards" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ambassador Spotlight */}
            <section className="ambassador-section">
                <div className="container">
                    <div className="section-head">
                        <h2>Ambassador Spotlight: Cienfuegos Coffee</h2>
                        <Link to="/category/promotional-products" className="link-more">Read More <FiArrowRight /></Link>
                    </div>
                    <div className="ambassador-row">
                        {ambassadorProducts.map((item, index) => (
                            <Link key={index} to={`/category/${item.slug}`} className="product-card">
                                <div className="product-img">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools Section */}
            <section className="tools-section">
                <div className="container">
                    <h2>Tools to help build your business</h2>
                    <div className="tools-row">
                        {businessTools.map((tool, index) => (
                            <Link key={index} to={tool.link} className="tool-card">
                                <div className="tool-img">
                                    <img src={tool.image} alt={tool.name} />
                                </div>
                                <span>{tool.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Made By You */}
            <section className="ugc-section">
                <div className="container">
                    <h2>Made by you, #MadeWithNvysion</h2>
                    <p className="ugc-desc">We love to see what customers create. Post a pic on social media with #MadeWithNvysion for a chance to be featured here.</p>
                    <div className="ugc-row">
                        <div className="ugc-img"><img src="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=200&h=200&fit=crop" alt="" /></div>
                        <div className="ugc-img"><img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop" alt="" /></div>
                        <div className="ugc-img"><img src="https://images.unsplash.com/photo-1572119865084-43c285814d63?w=200&h=200&fit=crop" alt="" /></div>
                        <div className="ugc-img"><img src="https://images.unsplash.com/photo-1562157873-818bc0726f68?w=200&h=200&fit=crop" alt="" /></div>
                        <div className="ugc-img"><img src="https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=200&h=200&fit=crop" alt="" /></div>
                        <div className="ugc-img"><img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=200&h=200&fit=crop" alt="" /></div>
                        <div className="ugc-img"><img src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&h=200&fit=crop" alt="" /></div>
                        <div className="ugc-img"><img src="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200&h=200&fit=crop" alt="" /></div>
                    </div>
                </div>
            </section>

            {/* Trustpilot */}
            <section className="trustpilot-bar">
                <div className="container">
                    <div className="trustpilot-row">
                        <span className="tp-logo"><FiStar /> Trustpilot</span>
                        <div className="tp-stars">{[1, 2, 3, 4, 5].map(i => <FiStar key={i} className="filled" />)}</div>
                        <span className="tp-text">4.5 out of 5 based on 50,000+ reviews</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
