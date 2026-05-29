import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  // Styles utility matching the dark mode reference image
  const styles = {
    container: { backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', padding: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' },
    header: { fontSize: '28px', fontWeight: 'bold', margin: '10px 0 20px 0' },
    sectionTitle: { color: '#8e8e93', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '25px', marginBottom: '8px' },
    card: { backgroundColor: '#1c1c1e', borderRadius: '12px', padding: '16px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' },
    leftSide: { display: 'flex', flexDirection: 'column' },
    title: { fontSize: '16px', fontWeight: '500', marginBottom: '4px' },
    subtitle: { color: '#8e8e93', fontSize: '13px' },
    badgeContainer: { display: 'flex', alignItems: 'center', gap: '4px' },
    purpleBar: { width: '6px', height: '36px', backgroundColor: '#a855f7', borderRadius: '3px' },
    greenBar: { width: '6px', height: '36px', backgroundColor: '#22c55e', borderRadius: '3px' },
    redBar: { width: '6px', height: '36px', backgroundColor: '#ef4444', borderRadius: '3px' },
    orangeBar: { width: '6px', height: '36px', backgroundColor: '#f97316', borderRadius: '3px' },
    listContainer: { backgroundColor: '#1c1c1e', borderRadius: '12px', padding: '16px', marginTop: '10px', maxHeight: '200px', overflowY: 'auto' },
    usernameRow: { padding: '8px 0', borderBottom: '1px solid #2c2c2e', fontSize: '14px', color: '#e5e5ea' }
  };

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={styles.header}>Categories</h1>
        {metrics && <button onClick={() => setMetrics(null)} style={{ background: '#1c1c1e', color: '#ffffff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>Reset</button>}
      </div>

      {!metrics ? (
        <FileUploader onUploadSuccess={(data) => setMetrics(data)} />
      ) : (
        <div>
          {/* CATEGORY 1: TRAJECTORY */}
          <div style={styles.sectionTitle}>Account Trajectory</div>
          
          <div style={styles.card}>
            <div style={styles.leftSide}>
              <span style={styles.title}>New Followers</span>
              <span style={styles.subtitle}>+{metrics.new_followers.length} since last session</span>
            </div>
            <div style={styles.badgeContainer}>
              {metrics.new_followers.length > 0 && <div style={styles.purpleBar} />}
              <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px' }}>{metrics.followers_count}</span>
            </div>
          </div>
          {metrics.new_followers.length > 0 && (
            <div style={styles.listContainer}>
              {metrics.new_followers.map(user => <div key={user} style={styles.usernameRow}>@{user}</div>)}
            </div>
          )}

          <div style={styles.card}>
            <div style={styles.leftSide}>
              <span style={styles.title}>Recently Followed by You</span>
              <span style={styles.subtitle}>{metrics.recently_followed.length} additions</span>
            </div>
            <div style={styles.badgeContainer}>
              {metrics.recently_followed.length > 0 && <div style={styles.greenBar} />}
              <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px' }}>{metrics.following_count}</span>
            </div>
          </div>
          {metrics.recently_followed.length > 0 && (
            <div style={styles.listContainer}>
              {metrics.recently_followed.map(user => <div key={user} style={styles.usernameRow}>@{user}</div>)}
            </div>
          )}

          {/* CATEGORY 2: LOST CONNECTIONS */}
          <div style={styles.sectionTitle}>Lost Connections</div>

          <div style={styles.card}>
            <div style={styles.leftSide}>
              <span style={styles.title}>Unfollowers</span>
              <span style={styles.subtitle}>{metrics.unfollowers.length} accounts dropped you</span>
            </div>
            <div style={styles.badgeContainer}>
              <div style={styles.redBar} />
              <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px', color: '#ef4444' }}>-{metrics.unfollowers.length}</span>
            </div>
          </div>
          <div style={styles.listContainer}>
            {metrics.unfollowers.length === 0 ? (
              <div style={{ color: '#8e8e93', fontSize: '14px' }}>No unfollowers detected in this window.</div>
            ) : (
              metrics.unfollowers.map(user => <div key={user} style={styles.usernameRow}>@{user}</div>)
            )}
          </div>

          {/* CATEGORY 3: CLEAN-UP */}
          <div style={styles.sectionTitle}>Clean-up Metrics</div>

          <div style={styles.card}>
            <div style={styles.leftSide}>
              <span style={styles.title}>You Unfollowed</span>
              <span style={styles.subtitle}>{metrics.you_unfollowed.length} accounts removed by you</span>
            </div>
            <div style={styles.badgeContainer}>
              <div style={styles.orangeBar} />
              <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px', color: '#f97316' }}>{metrics.you_unfollowed.length}</span>
            </div>
          </div>
          {metrics.you_unfollowed.length > 0 && (
            <div style={styles.listContainer}>
              {metrics.you_unfollowed.map(user => <div key={user} style={styles.usernameRow}>@{user}</div>)}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
