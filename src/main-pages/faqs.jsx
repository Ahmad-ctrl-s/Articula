import FAQsFComponent from "../sub-components/faqs-components/faqs-first-component";
import BreadCrumb from "../sub-components/bread-crumb";
import Navigation from "../sub-components/navbar";
import Footer from '../sub-components/foot';
function FAQs () {
    return (
        <>
            <header className='header-wrapper'>
                <Navigation/>
                <BreadCrumb/>
            </header>
            <main>
                <FAQsFComponent/>
            </main>

            <footer>
                <Footer/>
            </footer>
            
        </>
    )
}
export default FAQs