import AboutFComponent from '../sub-components/about-components/first-section';
import SecondSection from '../sub-components/about-components/second-section';
import ThirdSection from '../sub-components/about-components/third-section';
import FourthSection from '../sub-components/about-components/fourth-section';
import FifthSection from '../sub-components/about-components/fifth-section';
import BreadCrumb from '../sub-components/bread-crumb';
import Companies from '../sub-components/companies';
import Navigation from "../sub-components/navbar";
import Footer from '../sub-components/foot';
import '../assets/css/about.css';



function About() {
    return (
        <>
            <div className="about-wrapper">
                <header className='header-wrapper'>
                    <Navigation />
                    <BreadCrumb />
                </header>
                <main>
                    <AboutFComponent />
                    <Companies />
                    <SecondSection />
                    <ThirdSection />
                    <FourthSection />
                    <FifthSection />
                </main>

                <footer>
                    <Footer />
                </footer>

            </div>
        </>
    )
}
export default About