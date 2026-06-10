"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
        }
    };

    const navItems = [
        { name: "Início", path: "/" },
        { name: "Filmes", path: "/movies" },
        { name: "Séries", path: "/tv" },
        { name: "Gêneros", path: "/genres" },
        { name: "Minha Lista", path: "/my-list" },
    ];

    return (
        <>
            <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : styles.transparent}`}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <Link href="/" className={styles.logo}>
                            CineStream
                        </Link>

                        <ul className={styles.navLinks}>
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`${styles.link} ${pathname === item.path ? styles.activeLink : ""}`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.right}>
                        <form onSubmit={handleSearch} className={styles.searchForm}>
                            <button type="submit" className={styles.searchButton} aria-label="Pesquisar">
                                <Search size={16} />
                            </button>
                            <input
                                type="text"
                                placeholder="Buscar títulos..."
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Pesquisar"
                            />
                        </form>

                        <button
                            className={styles.menuButton}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Abrir menu"
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            {isMobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`${styles.mobileLink} ${pathname === item.path ? styles.mobileLinkActive : ""}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <form onSubmit={handleSearch} className={styles.searchForm} style={{ marginTop: "0.5rem" }}>
                        <button type="submit" className={styles.searchButton} aria-label="Pesquisar">
                            <Search size={16} />
                        </button>
                        <input
                            type="text"
                            placeholder="Buscar títulos..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: "100%" }}
                        />
                    </form>
                </div>
            )}
        </>
    );
}
