import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const PrivacyPolicy = () => {
  useDocumentTitle({
    title: "Privacy Policy - Indo Air Aviation Academy | Data Protection & Privacy Rights",
    description: "Read Indo Air Aviation Academy's comprehensive privacy policy. Learn how we collect, use, and protect your personal information for aviation training services.",
    keywords: "Indo Air Aviation privacy policy, data protection, personal information, aviation training privacy, student data security",
    canonical: "https://indoaviationacademy.com/privacy-policy"
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 md:pt-[240px] pt-[150px] md:pb-[80px] pb-[40px]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="mb-4">
                Indo Air Aviation ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our aviation training and consultancy services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Name, email address, phone number, and postal address</li>
                <li>Date of birth and government-issued identification for aviation training requirements</li>
                <li>Educational background and professional certifications</li>
                <li>Medical information required for aviation training compliance</li>
                <li>Payment information for course enrollment and services</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>IP address, browser type, and device information</li>
                <li>Website usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide aviation training courses and consultancy services</li>
                <li>Process course enrollments and payments</li>
                <li>Communicate about courses, schedules, and important updates</li>
                <li>Comply with aviation industry regulations and safety requirements</li>
                <li>Improve our website and services</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Maintain records required by aviation authorities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Aviation regulatory authorities as required by law</li>
                <li>Partner airlines and aviation companies for job placement</li>
                <li>Third-party service providers (payment processors, IT services)</li>
                <li>Medical professionals for training-related health assessments</li>
                <li>Legal authorities when required by law or court order</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and employee training</li>
                <li>Secure data centers and backup systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="mb-4">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Training records: As required by aviation authorities (typically 7-10 years)</li>
                <li>Financial records: As required by tax and accounting laws</li>
                <li>Marketing communications: Until you opt-out</li>
                <li>Website analytics: Up to 2 years</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="mb-4">Depending on your jurisdiction, you may have the following rights:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal information (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
                <li>Lodge a complaint with supervisory authorities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking</h2>
              <p className="mb-4">
                Our website uses cookies and similar technologies to enhance your experience. For detailed information about our cookie practices, please see our Cookie Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Links</h2>
              <p className="mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="mb-4">
                If you are located outside of our primary jurisdiction, your information may be transferred to and processed in countries with different privacy laws. We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">Indo Air Aviation Academy</p>
                <p>Email: Indoairaviation107@gmail.com</p>
                <p>Phone: +91-8233787629</p>
                <p>Address: 1st floor, Sayaji Plaza, in front of Bhandari Hospital near Sayaji Hotel, Indore, Madhya Pradesh 452001</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;