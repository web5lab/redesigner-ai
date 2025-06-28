import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import BlogList from './pages/BlogList';
import BlogPost from './components/BlogPost';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserData, GetWebsite, redesignWebsite } from './store/global.Action';
import { UserSelector } from './store/global.Selctor';
import { EditorProvider } from './editior/context/EditorContext';
import EditorLayout from './editior/components/EditorLayout';
import ApiDocs from './components/ApiDocs';
import toast from 'react-hot-toast';
import { setWebsiteQueqe } from './store/global.Slice';
import TemplateGallery from './components/Template';
import Navbar from './components/Navbar';

function AuthHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('authToken', token);
      dispatch(GetUserData(token));
      dispatch(GetWebsite(token));
      navigate('/dashboard');
    }

  }, [location, navigate]);
  return null;
}


const ProtectedRoute = ({ children }) => {
  const user = useSelector(UserSelector);
  const dispatch = useDispatch();
  const website = useSelector((state) => state?.global?.websiteQueqe);
  const handleNewWebsite = async () => {
    try {
      let websiteData = website
      dispatch(setWebsiteQueqe(null));
      if(user.AiCredits < 4){
        toast.error('You have no Ai credits left, please purchase more to create a new website.');
        return;
      }
      await redesignWebsite({ data: websiteData });
      const token = localStorage.getItem('authToken');
      toast.success("you can access your website redesign in my website tab")
      dispatch(GetWebsite(token));
      dispatch(GetUserData(token));
    } catch (error) {
      console.log("Error creating new website:", error);
      toast.error('Error creating new website:', error);
    }
  };
  const navigate = useNavigate();
  const location = useLocation();

    useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const interval = setInterval(() => {
        dispatch(GetUserData(token));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('payment_id');
    const token = localStorage.getItem('authToken');
    if (paymentId) {
      dispatch(GetUserData(token));
      dispatch(GetWebsite(token));
      navigate('/dashboard');
    }
  }, [location, navigate]);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  } else if (user && website) {
    handleNewWebsite();
  }

  return (
    <>
      {children}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/auth-success" element={<AuthHandler />} />
        <Route path="/api" element={<ApiDocs />} />
        <Route path="/login" element={
          <Login />
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/editior" element={
          <ProtectedRoute>
            <EditorProvider>
              <div className="min-h-screen bg-gray-50">
                <EditorLayout />
              </div>
            </EditorProvider>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;