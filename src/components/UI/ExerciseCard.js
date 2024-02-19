import './ExerciseCard.css';
import Button from '../UI/Button';

const ExerciseCard = ({ name, type, onClick }) => {
  return (
    <div className="exercise-card">
      <h1>{name}</h1>
      <p>
        Type: <span style={{ textTransform: 'capitalize' }}>{type}</span>
      </p>
      <Button
        classes={['standard-btn']}
        onClick={onClick}
        buttonText="Remove Exercise"
      />
    </div>
  );
};

export default ExerciseCard;
