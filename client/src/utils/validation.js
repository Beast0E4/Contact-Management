/**
 * Email validation
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Phone validation (supports multiple formats)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validatePhone = (phone) => {
  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if it has 10-15 digits (covers most international formats)
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return false;
  }

  // Common phone number patterns
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/;
  return phoneRegex.test(phone);
};

/**
 * Password strength validation
 * Requirements: Uppercase, Lowercase, Number, Special Character, and min length 8.
 * @param {string} password - Password to validate
 * @returns {object} - { isValid: boolean, message: string, strength: string }
 */
export const validatePassword = (password) => {
  const result = {
    isValid: false,
    message: '',
    strength: 'weak',
  };

  if (!password) {
    result.message = 'Password is required';
    return result;
  }

  // Check for individual requirements
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;

  if (!isLongEnough) {
    result.message = 'Password must be at least 8 characters';
    return result;
  }

  if (!hasUppercase) {
    result.message = 'Password must contain at least one uppercase letter';
    return result;
  }

  if (!hasLowercase) {
    result.message = 'Password must contain at least one lowercase letter';
    return result;
  }

  if (!hasNumber) {
    result.message = 'Password must contain at least one number';
    return result;
  }

  if (!hasSpecial) {
    result.message = 'Password must contain at least one special character';
    return result;
  }

  // If all checks pass
  result.isValid = true;
  result.message = 'Strong password';
  result.strength = 'strong';
  
  return result;
};

/**
 * Updated Login validation to reflect minimum length
 */
export const validateLoginForm = (data) => {
  const errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password is required';
  } 
  // We don't necessarily need the full complex validation on login, 
  // but we should check minimum length.
  else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Updated Register validation to use the new complex password logic
 */
export const validateRegisterForm = (data) => {
  const errors = {};

  if (isEmpty(data.name)) {
    errors.name = 'Name is required';
  } else if (!validateName(data.name)) {
    errors.name = 'Please enter a valid name';
  }

  if (isEmpty(data.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Complex Password validation
  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }

  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Name validation
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    return false;
  }
  
  // Allow letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(name.trim());
};

/**
 * Check if string is empty or whitespace
 * @param {string} str - String to check
 * @returns {boolean} - True if empty, false otherwise
 */
export const isEmpty = (str) => {
  return !str || str.trim().length === 0;
};

/**
 * Validate contact form data
 * @param {object} data - Contact form data
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateContactForm = (data) => {
  const errors = {};

  // Name validation
  if (isEmpty(data.name)) {
    errors.name = 'Name is required';
  } else if (!validateName(data.name)) {
    errors.name = 'Please enter a valid name';
  } else if (data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (data.name.length > 100) {
    errors.name = 'Name must not exceed 100 characters';
  }

  // Email validation (if provided)
  if (data.email && !isEmpty(data.email)) {
    if (!validateEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    } else if (data.email.length > 100) {
      errors.email = 'Email must not exceed 100 characters';
    }
  }

  // Phone validation (if provided)
  if (data.phone && !isEmpty(data.phone)) {
    if (!validatePhone(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
  }

  // At least email or phone must be provided
  if (isEmpty(data.email) && isEmpty(data.phone)) {
    errors.email = 'Please provide at least email or phone';
    errors.phone = 'Please provide at least email or phone';
  }

  // Notes validation (if provided)
  if (data.notes && data.notes.length > 500) {
    errors.notes = 'Notes must not exceed 500 characters';
  }

  // Tags validation (if provided)
  if (data.tags && Array.isArray(data.tags)) {
    if (data.tags.length > 10) {
      errors.tags = 'Maximum 10 tags allowed';
    }
    
    // Check individual tag length
    const invalidTags = data.tags.filter(tag => tag.length > 30);
    if (invalidTags.length > 0) {
      errors.tags = 'Each tag must not exceed 30 characters';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};