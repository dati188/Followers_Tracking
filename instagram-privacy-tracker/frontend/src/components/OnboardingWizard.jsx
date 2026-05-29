import React from 'react';

export default function OnboardingWizard() {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>📋 Instructions: Get Your Data From Instagram</h2>
      <ol style={{ lineHeight: '1.6' }}>
        <li>Go to your Instagram Settings / Meta Accounts Center.</li>
        <li>Select <strong>Your Information and Permissions</strong> ➔ <strong>Download Your Information</strong>.</li>
        <li>Request a download; pick <strong>"Some of your information"</strong> and check <strong>Followers and Following</strong>.</li>
        <li><strong>Crucial Step:</strong> Set format to <strong>JSON</strong> (do NOT use HTML) and media quality to Low (makes file smaller/faster).</li>
        <li>Once Meta emails you the link, download the ZIP archive and bring it here.</li>
      </ol>
    </div>
  );
}