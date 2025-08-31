'use client';

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import BlogList from './pages/BlogList';
import BlogPost from './components/BlogPost';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { createDocApi, GetUserData, GetWebsite, imageToDesign, redesignWebsite } from './store/global.Action';
import { UserSelector } from './store/global.Selctor';
import toast from 'react-hot-toast';
import { setWebsiteQueqe } from './store/global.Slice';

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

  }, [location, navigate, dispatch]);
  return null;
}

function App() {
  const [extensionConnected, setExtensionConnected] = useState(false);
  const [extensionId, setExtensionId] = useState(null);

  useEffect(() => {
    // Initialize extension integration
    const initExtension = async () => {
      try {
        const extensionId = process.env.NEXT_PUBLIC_EXTENSION_ID; // Replace with actual ID

        // Test connection to extension
        if (typeof chrome !== 'undefined' && chrome.runtime) {
          chrome.runtime.sendMessage(extensionId, { type: 'PING' }, (response: any) => {
            if (chrome.runtime.lastError) {
              console.log('Extension not detected');
              setExtensionConnected(false);
            } else {
              console.log('Extension detected');
              setExtensionId(extensionId);
              setExtensionConnected(true);
              sendJWTToExtension(localStorage.getItem('authToken'),extensionId);
            }
          });
        }
      } catch (error) {
        console.log('Extension detection failed:', error);
        setExtensionConnected(false);
      }
    };

    initExtension();
  }, []);

  const sendJWTToExtension = async (token: string | null, extension: string) => {
    if (!extension) return false;

    try {
      chrome.runtime.sendMessage(extension, {
        type: 'JWT_TOKEN',
        token: token
      });
      console.log('JWT sent to extension:', token);
      return true;
    } catch (error) {
      console.error('Failed to send JWT to extension:', error);
      return false;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/auth-success" element={<AuthHandler />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;