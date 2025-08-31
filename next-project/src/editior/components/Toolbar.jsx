import React from 'react';
import { useEditor } from '../context/EditorContext'; // Assuming this path is correct
import { Download, Undo, Redo, Upload, AlertCircle, ExternalLink, Save, Link as LinkIcon, Monitor, Tablet, Smartphone } from 'lucide-react'; // Renamed Link to LinkIcon to avoid conflict with HTML a tag
import JSZip from 'jszip';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp'

const Toolbar = ({viewport, setViewport}) => {
  const { html, undo, redo, canUndo, canRedo, autoSave, setAutoSave, loadFromUrl } = useEditor();
  const [isDeploying, setIsDeploying] = React.useState(false);
  const [showConnectModal, setShowConnectModal] = React.useState(false);
  const [deploymentStatus, setDeploymentStatus] = React.useState(null);
  const [isNetlifyConnected, setIsNetlifyConnected] = React.useState(false); // You might want to persist this or check via API

  const handleNetlifyConnect = () => {
    // This flow is basic; a real OAuth flow would be more involved
    // For now, we assume connection after opening the link
    window.open('https://app.netlify.com/start/deploy?repository=https://github.com/netlify/netlify-template-gatsby-blog', '_blank'); // Example, replace with your actual connection logic/URL
    setShowConnectModal(false);
    setIsNetlifyConnected(true); // Simplistic, in reality, you'd confirm connection
  };

  const handleDeploy = async () => {
    if (!isNetlifyConnected && !import.meta.env.VITE_NETLIFY_AUTH_TOKEN) {
      setShowConnectModal(true);
      return;
    }
    if (!import.meta.env.VITE_NETLIFY_AUTH_TOKEN) {
      setDeploymentStatus({
        success: false,
        message: "Netlify Auth Token not configured.",
      });
      setIsDeploying(false);
      return;
    }


    setIsDeploying(true);
    setDeploymentStatus(null);

    try {
      const siteName = 'visual-editor-site-' + Date.now();
      // Check if site with this name already exists (optional, Netlify handles duplicates by appending)
      // For this example, we'll proceed assuming unique names or Netlify's handling.

      // Create a zip file with the HTML content
      const zip = new JSZip();
      zip.file('index.html', html);
      const content = await zip.generateAsync({ type: 'blob' });

      // Deploy the files (this directly deploys to a new site or updates an existing one if site_id is known)
      // The Netlify API for direct zip deploy without creating site first (if you don't have a site_id)
      // would typically involve creating a site first, then deploying.
      // For simplicity, we're assuming a token with rights to create sites or a pre-existing site_id.

      // Step 1: Create a site (if you don't have a site_id)
      // This part is simplified. A real app might let user pick an existing site or always create new.
      const createSiteResponse = await fetch('https://api.netlify.com/api/v1/sites', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_NETLIFY_AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: siteName }),
      });

      if (!createSiteResponse.ok) {
        const errorData = await createSiteResponse.json();
        throw new Error(`Failed to create Netlify site: ${errorData.message || createSiteResponse.statusText}`);
      }
      const siteData = await createSiteResponse.json();

      // Step 2: Deploy to the newly created site
      const deployResponse = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}/deploys`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_NETLIFY_AUTH_TOKEN}`,
          'Content-Type': 'application/zip', // Important: Set Content-Type to application/zip
        },
        body: content, // Send the blob directly
      });

      if (!deployResponse.ok) {
        const errorData = await deployResponse.json();
        throw new Error(`Failed to deploy site: ${errorData.message || deployResponse.statusText}`);
      }

      const deployData = await deployResponse.json();

      setDeploymentStatus({
        success: true,
        message: 'Deployment successful!',
        url: siteData.ssl_url || siteData.url, // Use siteData for the main URL
        claim_url: `https://app.netlify.com/sites/${siteData.name}/overview` // Or general settings
      });

      if (siteData.ssl_url || siteData.url) {
        window.open(siteData.ssl_url || siteData.url, '_blank');
      }
    } catch (error) {
      console.error('Deployment error:', error);
      setDeploymentStatus({
        success: false,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    } finally {
      setIsDeploying(false);
    }
  };

 

  // Icon styles
  const iconStyle = "w-5 h-5 mr-1.5"; // Consistent icon style
  const disabledButtonStyle = "opacity-50 cursor-not-allowed text-slate-500";
  const utilityButtonBase = "p-2 rounded-md flex items-center transition-colors duration-150";
  const utilityButtonActive = "hover:bg-slate-700 text-slate-300";

  return (
    <div className="bg-slate-800 border-b border-slate-700 py-2 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/dashboard" className="flex items-center gap-2 text-indigo-400 font-bold text-xl">
          <img src={logo} className="h-10 w-10" />
          <span>redesignr<span className="text-purple-400">.ai</span></span>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
      <div className=" bg-slate-800 p-1.5 rounded-lg shadow-lg z-20 flex space-x-1 border border-slate-700">
        <button
          onClick={() => setViewport('mobile')}
          className={`p-2 rounded ${
            viewport === 'mobile'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          }`}
          title="Mobile view (375x667)"
        >
          <Smartphone className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewport('tablet')}
          className={`p-2 rounded ${
            viewport === 'tablet'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          }`}
          title="Tablet view (768x1024)"
        >
          <Tablet className="w-5 h-5" />
        </button>
        <button
          // onClick={() => setViewport('desktop')}
          className={`p-2 rounded ${
            viewport === 'desktop'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          }`}
          title="Desktop view (100%)"
        >
          <Monitor className="w-5 h-5" />
        </button>
      </div>

        <button
          onClick={undo}
          disabled={!canUndo}
          className={`${utilityButtonBase} ${canUndo ? utilityButtonActive : disabledButtonStyle
            }`}
          title="Undo"
        >
          <Undo className={iconStyle} />
          <span className="hidden sm:inline">Undo</span>
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className={`${utilityButtonBase} ${canRedo ? utilityButtonActive : disabledButtonStyle
            }`}
          title="Redo"
        >
          <Redo className={iconStyle} />
          <span className="hidden sm:inline">Redo</span>
        </button>
        {/* <button
          onClick={() => setAutoSave(!autoSave)}
          className={`${utilityButtonBase} ${autoSave ? 'bg-green-500/20 text-green-300' : utilityButtonActive
            }`}
          title={autoSave ? 'Auto-save: ON' : 'Auto-save: OFF'}
        >
          <Save className={iconStyle} />
          <span className="hidden sm:inline">Auto-save</span>
        </button> */}
        {/* Deployment Status Message */}
        {deploymentStatus && (
          <div className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${deploymentStatus.success
            ? 'bg-green-500/20 border border-green-500/30 text-green-300'
            : 'bg-red-500/20 border border-red-500/30 text-red-300'
            }`}>
            {deploymentStatus.success ? (<>
              <span>Deployed!</span>
              {deploymentStatus.url && (
                <a
                  href={deploymentStatus.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline ml-1.5"
                  title="View deployed site"
                >
                  View Site
                </a>
              )}
              {deploymentStatus.claim_url && (
                <a
                  href={deploymentStatus.claim_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline ml-1.5"
                  title="Manage site on Netlify"
                >
                  Manage
                </a>
              )}
            </>) : (
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="truncate max-w-xs" title={deploymentStatus.message}>{deploymentStatus.message}</span>
              </div>
            )}
          </div>
        )}

        {/* <button
          onClick={handleExport}
          className="px-4 py-2 rounded-md flex items-center bg-slate-600 text-slate-100 hover:bg-slate-500 transition-colors duration-150"
          title="Download HTML file"
        >
          <Download className={iconStyle} />
          <span className="hidden md:inline">Export HTML</span>
          <span className="md:hidden">Export</span>
        </button> */}
        <button
          onClick={handleDeploy}
          disabled={isDeploying}
          className={`px-4 py-2 rounded-md flex items-center font-medium text-white
                      bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600
                      transition-all duration-150 ${isDeploying ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          title="Deploy to Netlify"
        >
          <Upload className={iconStyle} />
          <span>{isDeploying ? 'Deploying...' : 'Save'}</span>
        </button>
      </div>

      {/* Connect to Netlify Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-slate-100 mb-4">Connect to Netlify</h3>
            <p className="text-slate-400 mb-6">
              To deploy your site with a click, you need to authorize this app with Netlify.
              Alternatively, set up a VITE_NETLIFY_AUTH_TOKEN in your environment for direct deploys.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConnectModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 border border-slate-600 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleNetlifyConnect}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-md flex items-center transition-all"
              >
                Connect Netlify
                <ExternalLink className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbar;