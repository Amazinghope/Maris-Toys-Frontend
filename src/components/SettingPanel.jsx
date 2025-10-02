// src/components/SettingsPanel.jsx
import { useState } from "react";
import { Settings, X } from "lucide-react"; // Lucide icons

const SettingPanel = ({ onToggleShapes, onToggleTwinkle }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Gear / Close Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        aria-label="Toggle settings panel"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <Settings className="h-6 w-6 animate-spin-slow" />
        )}
      </button>

      {/* Expandable Panel */}
      {open && (
        <div className="absolute bottom-14 right-0 bg-white shadow-lg rounded-xl p-4 w-48">
          <h4 className="text-sm font-bold text-gray-800 mb-2">Settings</h4>
          <div className="flex flex-col gap-2">
            <button
              onClick={onToggleShapes}
              className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
            >
              Toggle Shapes
            </button>
            <button
              onClick={onToggleTwinkle}
              className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200"
            >
              Toggle Twinkle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingPanel;
