import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AskNova from './components/AskNova';
import DuringCall from './components/DuringCall';

// Placeholder components for missing routes
const PreCall = () => <div>Pre-call Component</div>;
const PostCall = () => <div>Post-call Component</div>;
const FollowUp = () => <div>Follow-up Component</div>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/ask-nova" element={<AskNova />} />
          <Route path="/pre-call" element={<PreCall />} />
          <Route path="/during-call" element={<DuringCall candidatePhoneNumber="" />} />
          <Route path="/post-call" element={<PostCall />} />
          <Route path="/follow-up" element={<FollowUp />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;