const feedbackValidator = submission => {
  const errors = {
    firstName: false, lastName: false, email: false,
    classCode: false, tutor: false, length: false,
    topics: false, helped: false, tutorInterest: false,
    continueTopic: false, studyHours: false
  }
  const messages = {
    firstName: '', lastName: '', email: '',
    classCode: '', tutor: '', length: '',
    topics: '', helped: '', tutorInterest: '',
    continueTopic: '', studyHours: ''
  }
  
  if (submission.firstName === "") {
    errors.firstName = true
    messages.firstName = 'First name required'
  }

  if (submission.lastName === "") {
    errors.lastName = true
    messages.lastName = 'Last name required'
  }

  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
  if (submission.email === "") {
    errors.email = true
    messages.email = 'Email required'
  } else if (!emailRegex.test(submission.email)) {
    errors.email = true
    messages.email = 'Not a valid email'
  }

  if (submission.classCode === "") {
    errors.classCode = true
    messages.classCode = 'Class code required'
  }

  if (submission.tutor === "") {
    errors.tutor = true
    messages.tutor = 'Who tutored your session?'
  }


  if (submission.length === "") {
    errors.length = true
    messages.length = 'Length of session required'
  } else if (isNaN(submission.length)) {
    errors.length = true
    messages.length = 'Must be a number'
  }

  if (submission.topics === "") {
    errors.topics = true
    messages.topics = "Did you discuss/learn anything?"
  }

  if (submission.helped === "") {
    errors.helped = true
  }

  if (submission.tutorInterest === "") {
    errors.tutorInterest = true
  }

  if (submission.continueTopic === "") {
    errors.continueTopic = true
  }

  if (submission.studyHours === "") {
    errors.studyHours = true
  }

  if (submission.comments === "") {
    errors.comments = true
    messages.comments = "Did your session go well?"
  }

  return {
    errors,
    messages
  }
}

export default feedbackValidator;