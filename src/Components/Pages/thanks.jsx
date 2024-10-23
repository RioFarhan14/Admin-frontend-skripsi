import { Link } from 'react-router-dom';

const ThanksPage = () => {
  return (
    <div style={styles.container}>
      <h1>Thank You!</h1>
      <p>We appreciate your action. Your submission was successful!</p>
      
      <Link to="/dashboard">
        <button style={styles.button}>Back to Home</button>
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default ThanksPage;
