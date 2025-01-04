const emailTemplate = (name, url) => {
    return `
      <h1>Dear ${name},</h1>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${url}">Verify your Email</a>
    `;
  };

  
export default emailTemplate;