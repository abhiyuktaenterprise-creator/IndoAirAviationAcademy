import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const CookiePolicy = () => {
  useDocumentTitle({
    title: "Cookie Policy - Indo Air Aviation Academy | Website Cookie Usage",
    description: "Learn about how Indo Air Aviation Academy uses cookies on our website. Cookie types, preferences, and opt-out options for our aviation training portal.",
    keywords: "Indo Air Aviation cookie policy, website cookies, privacy preferences, tracking cookies, analytics cookies",
    canonical: "https://indoaviationacademy.com/cookie-policy"
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 md:pt-[240px] pt-[150px] md:pb-[80px] pb-[40px]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit our website. They help us make your experience better by remembering your preferences and providing insights into how our website is used.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <p className="mb-4">
                Indo Air Aviation uses cookies to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Improve website functionality and user experience</li>
                <li>Provide personalized content and recommendations</li>
                <li>Enable social media features and sharing</li>
                <li>Deliver targeted advertisements</li>
                <li>Ensure website security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">Essential Cookies</h3>
              <p className="mb-4">
                These cookies are necessary for our website to function properly. They enable basic functions like page navigation, access to secure areas, and form submissions. The website cannot function properly without these cookies.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-sm"><strong>Examples:</strong> Session management, security tokens, load balancing</p>
                <p className="text-sm"><strong>Duration:</strong> Session or up to 1 year</p>
                <p className="text-sm"><strong>Can be disabled:</strong> No</p>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Analytics Cookies</h3>
              <p className="mb-4">
                These cookies help us understand how visitors use our website by collecting and reporting information anonymously. This helps us improve our website and services.
              </p>
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <p className="text-sm"><strong>Examples:</strong> Google Analytics, page views, user interactions</p>
                <p className="text-sm"><strong>Duration:</strong> Up to 2 years</p>
                <p className="text-sm"><strong>Can be disabled:</strong> Yes</p>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Functional Cookies</h3>
              <p className="mb-4">
                These cookies enable enhanced functionality and personalization, such as remembering your preferences, language settings, and login information.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                <p className="text-sm"><strong>Examples:</strong> Language preferences, user settings, form data</p>
                <p className="text-sm"><strong>Duration:</strong> Up to 1 year</p>
                <p className="text-sm"><strong>Can be disabled:</strong> Yes</p>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Marketing Cookies</h3>
              <p className="mb-4">
                These cookies track your browsing habits to deliver advertisements that are relevant to you and your interests. They also limit the number of times you see an advertisement.
              </p>
              <div className="bg-red-50 p-4 rounded-lg mb-4">
                <p className="text-sm"><strong>Examples:</strong> Social media pixels, advertising networks, retargeting</p>
                <p className="text-sm"><strong>Duration:</strong> Up to 1 year</p>
                <p className="text-sm"><strong>Can be disabled:</strong> Yes</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
              <p className="mb-4">
                We may also use third-party cookies from trusted partners to enhance our services:
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold">Google Analytics</h4>
                  <p className="text-sm">Helps us analyze website traffic and user behavior</p>
                  <p className="text-xs text-gray-600">Privacy Policy: https://policies.google.com/privacy</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold">Google Ads</h4>
                  <p className="text-sm">Enables us to show relevant advertisements</p>
                  <p className="text-xs text-gray-600">Privacy Policy: https://policies.google.com/privacy</p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-semibold">Facebook Pixel</h4>
                  <p className="text-sm">Tracks conversions and enables targeted advertising</p>
                  <p className="text-xs text-gray-600">Privacy Policy: https://www.facebook.com/privacy/policy</p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold">YouTube</h4>
                  <p className="text-sm">Enables embedded video content</p>
                  <p className="text-xs text-gray-600">Privacy Policy: https://policies.google.com/privacy</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Your Cookie Preferences</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">Browser Settings</h3>
              <p className="mb-4">
                You can control cookies through your browser settings. Here's how to manage cookies in popular browsers:
              </p>
              
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Opt-Out Links</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
                <li>Google Ads: <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline">Google Ad Settings</a></li>
                <li>Facebook: <a href="https://www.facebook.com/settings?tab=ads" className="text-blue-600 hover:underline">Facebook Ad Preferences</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookie Consent</h2>
              <p className="mb-4">
                When you first visit our website, we will ask for your consent to use non-essential cookies. You can:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Accept all cookies</li>
                <li>Reject non-essential cookies</li>
                <li>Customize your preferences</li>
                <li>Change your preferences at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Impact of Disabling Cookies</h2>
              <p className="mb-4">
                Disabling certain cookies may affect your experience on our website:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Some features may not work properly</li>
                <li>You may need to re-enter information</li>
                <li>Personalized content may not be available</li>
                <li>Website performance may be affected</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookie Retention</h2>
              <p className="mb-4">
                Different cookies have different lifespans:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain until they expire or you delete them</li>
                <li><strong>Our Cookies:</strong> Typically expire within 1-2 years</li>
                <li><strong>Third-party Cookies:</strong> Follow their own retention policies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Updates to This Policy</h2>
              <p className="mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
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

export default CookiePolicy;