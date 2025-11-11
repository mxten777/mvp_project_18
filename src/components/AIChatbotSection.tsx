import React from 'react';
import Button from './common/Button';

const AIChatbotSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">AI Chatbot Section</h2>
          <Button variant="primary">Start Chat</Button>
        </div>
      </div>
    </section>
  );
};

export default AIChatbotSection;