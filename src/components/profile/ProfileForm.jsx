import { useState, useEffect } from 'react';
import { getPredictions } from '../../services/predictionService';
import { updateUser } from '../../services/userService';
import './ProfileForm.css';

const OL_SUBJECTS = {
  Maths: 0,
  Science: 1,
  English: 2,
  Sinhala: 3,
  History: 4,
  Religion: 5,
};

const AL_STREAMS = {
  "Physical Science": 0,
  "Biological Science": 1,
  "Commerce": 2,
  "Arts": 3,
  "Technology": 4,
};

const AL_SUBJECTS = {
  Physics: 0,
  Chemistry: 1,
  Combined_Maths: 2,
  Biology: 3,
  Accounting: 4,
  Business_Studies: 5,
  Economics: 6,
  History: 7,
  Geography: 8,
  Politics: 9,
  Engineering_Tech: 10,
  Science_Tech: 11,
  ICT: 12,
};

const STREAM_SUBJECTS = {
  "Physical Science": ["Physics", "Chemistry", "Combined_Maths"],
  "Biological Science": ["Biology", "Chemistry", "Physics"],
  "Commerce": ["Accounting", "Business_Studies", "Economics"],
  "Arts": ["History", "Geography", "Politics"],
  "Technology": ["Engineering_Tech", "Science_Tech", "ICT"],
};

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    educationLevel: 0,
    olResults: Object.fromEntries(Object.keys(OL_SUBJECTS).map(subject => [subject, ''])),
    alStream: null,
    alResults: {},
    gpa: null,
    zScore: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [predictions, setPredictions] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    Object.entries(formData.olResults).forEach(([subject, grade]) => {
      if (!grade) {
        newErrors[`ol_${subject}`] = `${subject} grade is required`;
      }
    });

    if (formData.educationLevel >= 1) {
      if (!formData.alStream) {
        newErrors.alStream = 'A/L stream is required';
      } else {
        Object.entries(formData.alResults).forEach(([subject, grade]) => {
          if (!grade) {
            newErrors[`al_${subject}`] = `${subject} grade is required`;
          }
        });

        if (!formData.zScore) {
          newErrors.zScore = 'Z-Score is required';
        } else if (parseFloat(formData.zScore) < 0 || parseFloat(formData.zScore) > 4) {
          newErrors.zScore = 'Z-Score must be between 0 and 4';
        }
      }
    }

    if (formData.educationLevel === 2 && formData.gpa) {
      const gpa = parseFloat(formData.gpa);
      if (gpa < 2.0 || gpa > 4.0) {
        newErrors.gpa = 'GPA must be between 2.0 and 4.0';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResultsChange = (type, subject, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [subject]: value
      }
    }));
  };

  const handleStreamChange = (e) => {
    const stream = e.target.value;
    const streamSubjects = STREAM_SUBJECTS[stream] || [];
    setFormData(prev => ({
      ...prev,
      alStream: stream,
      alResults: Object.fromEntries(streamSubjects.map(subject => [subject, '']))
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const modelData = {
        education_level: formData.educationLevel,
        ol_results: Object.entries(formData.olResults).map(([subject, grade]) => ({
          subject: OL_SUBJECTS[subject],
          grade: gradeToNumber(grade)
        })),
        al_stream: AL_STREAMS[formData.alStream],
        al_results: Object.entries(formData.alResults).map(([subject, grade]) => ({
          subject: AL_SUBJECTS[subject],
          grade: gradeToNumber(grade)
        })),
        z_score: parseFloat(formData.zScore) || 0,
        gpa: parseFloat(formData.gpa) || 0
      };

      const predictions = await getPredictions(modelData);
      setPredictions(predictions);

      const userId = localStorage.getItem('userId');
      await updateUser(userId, { ...formData, predictions });
    } catch (error) {
      setApiError(error.message || 'An error occurred while processing your profile');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const gradeToNumber = (grade) => {
    const gradeMap = { 'A': 4, 'B': 3, 'C': 2, 'S': 1, 'F': 0 };
    return gradeMap[grade] || 0;
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {apiError && (
        <div className="error-message">
          {apiError}
        </div>
      )}
      
      <section className="form-section">
        <h2>Education Level</h2>
        <div className="form-group">
          <label htmlFor="educationLevel">Current Education Level</label>
          <select
            id="educationLevel"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            required
          >
            <option value={0}>O/L Completed</option>
            <option value={1}>A/L Completed</option>
            <option value={2}>University Student</option>
          </select>
        </div>
      </section>

      <section className="form-section">
        <h2>O/L Results</h2>
        {Object.keys(OL_SUBJECTS).map(subject => (
          <div key={subject} className="form-group">
            <label htmlFor={`ol-${subject}`}>{subject.replace('_', ' ')}</label>
            <select
              id={`ol-${subject}`}
              value={formData.olResults[subject]}
              onChange={(e) => handleResultsChange('olResults', subject, e.target.value)}
              required
            >
              <option value="">Select Grade</option>
              {['A', 'B', 'C', 'S', 'F'].map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
            {errors[`ol_${subject}`] && (
              <span className="error-text">{errors[`ol_${subject}`]}</span>
            )}
          </div>
        ))}
      </section>

      {formData.educationLevel >= 1 && (
        <section className="form-section">
          <h2>A/L Information</h2>
          <div className="form-group">
            <label htmlFor="alStream">Stream</label>
            <select
              id="alStream"
              name="alStream"
              value={formData.alStream}
              onChange={handleStreamChange}
              required
            >
              <option value="">Select Stream</option>
              {Object.keys(AL_STREAMS).map(stream => (
                <option key={stream} value={stream}>{stream}</option>
              ))}
            </select>
            {errors.alStream && (
              <span className="error-text">{errors.alStream}</span>
            )}
          </div>
          
          {formData.alStream && STREAM_SUBJECTS[formData.alStream].map(subject => (
            <div key={subject} className="form-group">
              <label htmlFor={`al-${subject}`}>{subject.replace('_', ' ')}</label>
              <select
                id={`al-${subject}`}
                value={formData.alResults[subject]}
                onChange={(e) => handleResultsChange('alResults', subject, e.target.value)}
                required
              >
                <option value="">Select Grade</option>
                {['A', 'B', 'C', 'S', 'F'].map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              {errors[`al_${subject}`] && (
                <span className="error-text">{errors[`al_${subject}`]}</span>
              )}
            </div>
          ))}

          <div className="form-group">
            <label htmlFor="zScore">Z-Score</label>
            <input
              type="number"
              id="zScore"
              name="zScore"
              value={formData.zScore}
              onChange={handleChange}
              step="0.0001"
              min="0"
              max="4"
              required
            />
            {errors.zScore && (
              <span className="error-text">{errors.zScore}</span>
            )}
          </div>
        </section>
      )}

      {formData.educationLevel === 2 && (
        <div className="form-group">
          <label htmlFor="gpa">University GPA</label>
          <input
            type="number"
            id="gpa"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            step="0.01"
            min="2.0"
            max="4.0"
            required
          />
          {errors.gpa && (
            <span className="error-text">{errors.gpa}</span>
          )}
        </div>
      )}

      {predictions && (
        <section className="form-section">
          <h2>Career Predictions</h2>
          <div className="predictions">
            {Object.entries(predictions).map(([career, probability]) => (
              <div key={career} className="prediction-item">
                <span className="career-name">{career}</span>
                <span className="probability">{probability.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </section>
      )}
      <button
        type="submit"
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Get Career Predictions'}
      </button>
    </form>
  );
};

export default ProfileForm;
