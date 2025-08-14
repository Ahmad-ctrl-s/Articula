import { Routes, Route } from 'react-router-dom';
import './assets/css/App.css';
import LoginForm from './main-pages/login-form';
import SignupForm from './main-pages/signup-form';
import Home from './main-pages/home';
import Articles from './main-pages/articles';
import About from './main-pages/about';
import Contact from './main-pages/contact';
import UserAuthContext from './main-pages/application-context/auth-context';
import Vacancies from './main-pages/vacancies';
import FAQs from './main-pages/faqs';
import ErrorPage from './main-pages/error-page';
import CreateArticle from './main-pages/create-article/create-article';
import Article from './main-pages/article-page';
import MyArticles from './main-pages/my-articles';
import MyAccount from './main-pages/my-account';
import EditArticle from './main-pages/edit-article/edit-article';

function App() {
  return (
    <UserAuthContext>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<LoginForm />} />
        <Route path='signup' element={<SignupForm />} />
        <Route path='Articles' element={<Articles />} />
        <Route path='Article/:id' element={<Article />} />
        <Route path='About' element={<About />} />
        <Route path='Contact' element={<Contact />} />
        <Route path='Vacancies' element={<Vacancies />} />
        <Route path='FAQs' element={<FAQs />} />
        <Route path='Create_Article' element={<CreateArticle />} />
        <Route path='Profile' element={<MyAccount/>} />
        <Route path='My_Articles' element={<MyArticles/>} />
        <Route path='Edit_Article/:id' element={<EditArticle/>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </UserAuthContext>
  );
}

export default App;

