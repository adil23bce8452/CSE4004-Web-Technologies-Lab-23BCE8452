import React, { useState, useEffect } from 'react';

function App() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.adviceslip.com/advice');
        
        if (!response.ok) throw new Error('Failed to fetch advice');

        const result = await response.json();
        setAdvice(result.slip.advice);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, []);

  if (loading) return <div style={styles.center}>Gathering some wisdom...</div>;
  if (error) return <div style={styles.error}>Oops! {error}</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Daily Wisdom</h1>
        <p style={styles.subtitle}>React API Fetching Exercise</p>
      </header>

      <main style={styles.card}>
        <span style={styles.quoteIcon}>“</span>
        <h2 style={styles.adviceText}>{advice}</h2>
        <button 
          style={styles.button} 
          onClick={() => window.location.reload()}
        >
          Get New Advice
        </button>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px'
  },
  header: { textAlign: 'center', marginBottom: '30px' },
  title: { color: '#1a73e8', margin: '0' },
  subtitle: { color: '#5f6368', fontSize: '14px' },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    textAlign: 'center',
    position: 'relative'
  },
  quoteIcon: {
    fontSize: '80px',
    color: '#e8eaed',
    position: 'absolute',
    top: '-10px',
    left: '20px',
    lineHeight: '1'
  },
  adviceText: {
    color: '#202124',
    fontSize: '24px',
    fontWeight: '500',
    marginBottom: '30px',
    position: 'relative',
    zIndex: '1'
  },
  button: {
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s'
  },
  center: { marginTop: '100px', textAlign: 'center', fontSize: '20px', color: '#666' },
  error: { color: '#d93025', fontWeight: 'bold', marginTop: '100px' }
};

export default App;