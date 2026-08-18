// Email service for sending application data to Indoairaviation107@gmail.com
export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
}

export const sendApplicationEmail = async (data: ApplicationData): Promise<boolean> => {
  try {
    // Format the email body
    const subject = `New Application Submission - Indo Air Aviation Academy`;
    const body = `
New Application Details:

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Program: ${data.program}

Submitted on: ${new Date().toLocaleString()}

---
This application was submitted through the Indo Air Aviation Academy website.
    `.trim();

    // Create mailto link (this will open the user's default email client)
    const mailtoLink = `mailto:Indoairaviation107@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // For demonstration, log the email data
    console.log('Application data to be sent to Indoairaviation107@gmail.com:', {
      to: 'Indoairaviation107@gmail.com',
      subject,
      body,
      applicant: data
    });

    // In a production environment, you would:
    // 1. Send this data to your backend API
    // 2. Use a service like EmailJS, SendGrid, or similar
    // 3. Or integrate with a form service like Formspree
    
    // For now, we'll simulate a successful email send
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Alternative: Using EmailJS (uncomment and configure if you want to use EmailJS)
/*
import emailjs from '@emailjs/browser';

export const sendApplicationEmailJS = async (data: ApplicationData): Promise<boolean> => {
  try {
    const templateParams = {
      to_name: 'Indo Air Aviation Academy',
      from_name: `${data.firstName} ${data.lastName}`,
      from_email: data.email,
      phone: data.phone,
      program: data.program,
      message: `New application submitted for ${data.program} program.`,
      to_email: 'Indoairaviation107@gmail.com'
    };

    const result = await emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      templateParams,
      'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
    );

    return result.status === 200;
  } catch (error) {
    console.error('EmailJS error:', error);
    return false;
  }
};
*/