import React, { useState } from 'react';
import OnboardingWizard from '../components/OnboardingWizard';
import FileUploader from '../components/FileUploader';

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Privacy-First IG Tracker</h1>
      
      {!metrics ? (
        <>
          <OnboardingWizard />
          <FileUploader onUploadSuccess={(data) => setMetrics(data)} />
        </>
      ) : (
        <div>
          <button onClick={() => setMetrics(null)} style={{ marginBottom: '20px' }}>➔ Upload Another Export</button>
          
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '6px', flex: 1 }}>
              <h3>Followers</h3>
              <h2>{metrics.followers_count}</h2>
            </div>
            <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '6px', flex: 1 }}>
              <h3>Following</h3>
              <h2>{metrics.following_count}</h2>
            </div>
          </div>

          <h3>❌ Not Following You Back ({metrics.not_following_back.length})</h3>
          <div style={{ maxHeight: '150px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px' }}>
            {metrics.not_following_back.map(user => <div key={user}>@{user}</div>)}
          </div>

          <h3>📉 Lost Followers Since Last Upload ({metrics.unfollowers.length})</h3>
          <div style={{ maxHeight: '150px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px', background: '#fff0f0' }}>
            {metrics.unfollowers.length === 0 ? "No changes detected yet. Upload an updated export later to see unfollowers." : 
             metrics.unfollowers.map(user => <div key={user}>@{user}</div>)}
          </div>
        </div>
      )}
    </div>
  );
}