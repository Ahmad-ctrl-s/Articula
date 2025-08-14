import Navigation from "../sub-components/navbar";
import HeroSection from "../sub-components/hero-section";
import BrowseCategory from "../sub-components/categories";
import LatestArticles from "../sub-components/latest-articles";
import Job from "../sub-components/Job";
import Teaching from "../sub-components/teaching";
import Writers from "../sub-components/writers";
import Companies from "../sub-components/companies";
import World from "../sub-components/world";
import Footer from "../sub-components/foot";
import '../assets/css/home.css'

function Home () {
    return (
        <>
            <header className="header-wrapper">
                <Navigation/>
                <HeroSection/>
            </header>
            <main>
                <section>
                    <BrowseCategory/>
                </section>
                <section>
                    <LatestArticles/>
                </section>
                <section>
                    <Job/>
                </section>
                <section>
                    <Teaching/>
                </section>
                <section>
                    <Writers/>
                </section>
                <section>
                    <Companies/>
                </section>
                <section>
                    <World/>
                </section>

            </main>
            <footer>
                <Footer/>
            </footer>

        </>
    )
}
export default Home