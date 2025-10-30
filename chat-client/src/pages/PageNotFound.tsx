import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 opacity-90">
            404
          </div>
          <div className="absolute inset-0 text-9xl font-bold text-blue-400/20 blur-sm">
            404
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
          Page Not Found
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          Oops! The page you're looking for seems to have wandered off into the digital void.
        </p>

        {/* Decoration */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-10 blur-xl"></div>
          <div className="absolute inset-8 border-8 border-blue-200 rounded-full animate-pulse"></div>
          <div className="absolute inset-16 border-4 border-cyan-200 rounded-full animate-ping"></div>
          <svg 
            className="absolute inset-0 w-full h-full text-blue-400/40" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => navigate(-1)}
            className="rounded-xl px-8 py-3 shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </Button>
          
          <Button 
            onClick={() => navigate("/")}
            className="rounded-xl px-8 py-3 shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm max-w-md mx-auto">
          <p className="text-gray-600 text-sm">
            If you believe this is an error, please check the URL or contact support.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;