import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const TermsOfService = () => {
  useDocumentTitle({
    title: "Terms of Service - Indo Air Aviation Academy | Training Terms & Conditions",
    description: "Read the terms and conditions for Indo Air Aviation Academy's aviation training programs. Enrollment requirements, refund policy, and student responsibilities.",
    keywords: "Indo Air Aviation terms of service, aviation training terms, enrollment policy, refund policy, student agreement",
    canonical: "https://indoaviationacademy.com/terms-of-service"
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 md:pt-[240px] pt-[150px] md:pb-[80px] pb-[40px]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="mb-4">
                By accessing and using the Indo Air Aviation website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Services Description</h2>
              <p className="mb-4">
                Indo Air Aviation provides comprehensive aviation training and consultancy services including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Pilot training programs and certifications</li>
                <li>Cabin crew training and certification</li>
                <li>Ground services training</li>
                <li>Aviation management consultancy</li>
                <li>Customer service training for aviation industry</li>
                <li>Aviation security training</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Eligibility and Enrollment</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">Eligibility Requirements</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Must be at least 18 years of age for most programs</li>
                <li>Meet minimum educational requirements as specified for each program</li>
                <li>Pass medical examinations as required by aviation authorities</li>
                <li>Provide accurate and complete information during enrollment</li>
                <li>Meet English language proficiency requirements</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Enrollment Process</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Complete application form with accurate information</li>
                <li>Submit required documentation and certifications</li>
                <li>Pay applicable fees and deposits</li>
                <li>Attend mandatory orientation sessions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Fees and Payment</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All fees must be paid according to the payment schedule provided</li>
                <li>Fees are subject to change with 30 days' notice</li>
                <li>Late payment may result in suspension from courses</li>
                <li>Refunds are subject to our refund policy outlined below</li>
                <li>Additional fees may apply for retesting or extended training</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Refund Policy</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">Cancellation Before Course Start</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>More than 30 days: 90% refund</li>
                <li>15-30 days: 75% refund</li>
                <li>7-14 days: 50% refund</li>
                <li>Less than 7 days: 25% refund</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Cancellation After Course Start</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Within first week: Pro-rated refund minus 20% administration fee</li>
                <li>After first week: No refund except in exceptional circumstances</li>
                <li>Medical emergencies: Case-by-case evaluation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Student Responsibilities</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Attend all scheduled classes and training sessions</li>
                <li>Maintain required academic and practical standards</li>
                <li>Follow all safety protocols and procedures</li>
                <li>Respect instructors, staff, and fellow students</li>
                <li>Maintain confidentiality of proprietary training materials</li>
                <li>Report any safety concerns immediately</li>
                <li>Comply with aviation industry regulations and standards</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Academic Standards and Discipline</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">Academic Requirements</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Maintain minimum passing grades as specified for each program</li>
                <li>Complete all required assignments and examinations</li>
                <li>Demonstrate competency in practical skills assessments</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Disciplinary Actions</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Warning for minor infractions</li>
                <li>Suspension for serious violations</li>
                <li>Dismissal for major safety violations or academic dishonesty</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All training materials remain property of Indo Air Aviation</li>
                <li>Students may not reproduce or distribute training materials</li>
                <li>Confidential information must not be shared with third parties</li>
                <li>Students retain rights to their personal work and assignments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="mb-4">
                Indo Air Aviation shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount of fees paid by the student.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Safety and Insurance</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Students must maintain valid medical certificates as required</li>
                <li>Personal accident insurance is recommended</li>
                <li>Students participate in training activities at their own risk</li>
                <li>Safety protocols must be followed at all times</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Force Majeure</h2>
              <p className="mb-4">
                Indo Air Aviation shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to acts of God, war, terrorism, pandemic, government regulations, or natural disasters.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Privacy and Data Protection</h2>
              <p className="mb-4">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Modifications to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Governing Law</h2>
              <p className="mb-4">
                These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Dispute Resolution</h2>
              <p className="mb-4">
                Any disputes arising from these terms or our services shall be resolved through binding arbitration in accordance with the rules of [Arbitration Body].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">Indo Air Aviation Academy</p>
                <p>Email: Indoairaviation107@gmail.com</p>
                <p>Phone: +91 88584 53069</p>
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

export default TermsOfService;