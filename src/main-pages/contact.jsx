import Navigation from "../sub-components/navbar";
import BreadCrumb from "../sub-components/bread-crumb";
import ContactFSection from "../sub-components/contact-components/contact-f-section";
import ContactSSection from '../sub-components/contact-components/contact-s-section';
import ContactTSection from '../sub-components/contact-components/contact-t-section';
import Footer from '../sub-components/foot';
import Map from '../sub-components/contact-components/map';

function Contact () {
    return (
        <>
            <header className='header-wrapper'>
                <Navigation/>
                <BreadCrumb/>
            </header>
            <main>
                <ContactFSection/>
                <ContactSSection/>
                <ContactTSection/>
                <Map/>    
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}
export default Contact