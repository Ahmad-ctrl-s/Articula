import Navigation from "../sub-components/navbar";
import BreadCrumb from '../sub-components/bread-crumb';
import '../assets/css/vacancies.css';
import VacanciesFSection from "../sub-components/vacancies-components/vacancies-f-section";
import VacanciesSSection from "../sub-components/vacancies-components/vacancies-s-section";
import VacanciesTSection from "../sub-components/vacancies-components/vacancies-t-section";
import VacanciesFoSection from "../sub-components/vacancies-components/vacancies-fo-section";
import Footer from '../sub-components/foot';
// import Job from "../Sub-Components/Job";


function Vacancies () {
    return (
        <>
            <header className='header-wrapper'>
                <Navigation/>
                <BreadCrumb/>
            </header>
            <main>
                <VacanciesFSection/>
                <VacanciesSSection/>
                <VacanciesTSection/>
                <VacanciesFoSection/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}
export default Vacancies;