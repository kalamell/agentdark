export const handleKeyPress = (event, type='number') => {
  const charCode = event.charCode;
  // Only allow numbers (0-9) to be typed
  const allowedChars = /[0-9]/;
  const allowedRegexThai = /^[ก-ฮ0-9]+$/;
  const allowedCharsEmail = /^[a-zA-Z0-9@._-]$/;


  if (type == 'number') {

    if (!allowedChars.test(String.fromCharCode(charCode))) {
      return event.preventDefault();
    }
  }

  if (type == 'thai') {
    if (!allowedRegexThai.test(String.fromCharCode(charCode))) {
      return event.preventDefault();
    }
  }

  if (type == 'email') {
    if (!allowedCharsEmail.test(String.fromCharCode(charCode))) {
      return event.preventDefault();
    }
  }
};
