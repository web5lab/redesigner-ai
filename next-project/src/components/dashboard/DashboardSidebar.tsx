@@ .. @@
+'use client';
+
 import React, { useState } from 'react';
 import { Link } from 'react-router-dom';
 import {
   CreditCard, History, Sparkles, LogOut, X,
   BookTemplate, Component, MessageSquare, Zap, Star,
   TrendingUp, Compass, Settings,
   Gift,
   InfoIcon,
   LucideInfo
 } from 'lucide-react';
 import logo from "../../assets/logo.webp";
+import Image from 'next/image';
 import toast from 'react-hot-toast';