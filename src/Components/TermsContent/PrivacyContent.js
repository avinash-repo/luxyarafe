import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const TermsContentSection = styled.div`
    padding: 20px 0;
    h2{
        font-size: 24px;
        color: #4d4d4d;
        margin: 0;
        padding-bottom: 0;
        font-weight: 500;
    }
    h3{
        font-size: 20px;
        color: #4d4d4d;
        margin: 0;
        /* padding-bottom: 10px; */
    }
    p{
        font-size: 16px;
        line-height: 24px;
        color: #4d4d4d;
        padding-bottom: 20px;
        text-align: justify;
    }
`;

const PrivacyContent = () => {
  return (
    <>
      <Container className="mb-30 mt-30">
        {/* <TermsContentSection>
                <p>Welcome to Vuezen! Protecting your privacy is important to us. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information. By accessing or using our website, you agree to the terms of this policy.</p>
            </TermsContentSection> */}

        <TermsContentSection>
          <h2>SECURITY AND PRIVACY</h2>
          <p style={{ marginBottom: "5px" }}>
            Luxelace Luxury Private Limited is a company duly incorporated under
            the provisions of the Companies Act, 2013 (hereinafter referred to
            as ‘Company’), Company knows that You (a visitor or a registered
            user) care how information about You is used and shared, and we
            appreciate Your trust that we will do so carefully and sensibly. We
            let You retain as much control as possible over Your personal
            information. However, You may not visit and use our site at any time
            without telling us who You are or revealing the required information
            about Yourself. To the Company, our most important asset is our
            relationship with You. We are committed to maintaining the
            confidentiality, integrity and security of any personal information
            about our users of our site. We are proud of our privacy practices
            and the strength of our site security and want you to know how we
            protect Your information and use it to provide to You the services.
            This notice describes our privacy policy. By visiting this Website,
            You are accepting the practices described in this Privacy Policy.
            You further agree and consent to our collection, use, processing,
            disclosure and transfer of your personal data according to the
            provisions of this Privacy Policy
          </p>
          <h3>Information You Give Us</h3>
          <p style={{ marginBottom: "5px" }}>
            We receive any information You enter on our Website or give us in
            any other way, which is stored on the Company’s secure servers. To
            clarify, personal information means and includes name, email,
            website user account log in ID and password, mobile and landline
            phone numbers, gender, DOB, address, gift message and eye
            prescription, but excludes any Credit Card, Debit Card or
            Net-Banking Details, all of which are stored on the Company’s secure
            servers and/or in cookies on your computer. You can choose not to
            provide certain information, but then You might not be able to take
            advantage of many of our features. We use the information that You
            provide for such purposes as responding to your requests,
            customizing future commercial transactions, and communicating with
            You and utilising/disclosing, without prejudice to any of Your other
            rights, the same for any other, whether commercial or non-commercial
            purpose which the Company in its sole discretion considers necessary
            for its business purposes or otherwise. You can review, add or
            update certain information by writing to us at support@Vuezen.com.
            When You update information, we usually keep a copy of the prior
            version for our records.
          </p>
          <h3>Automatic Information:</h3>
          <p style={{ marginBottom: "5px" }}>
            We receive and store certain types of information whenever You
            interact with us including operating system version, hardware
            models, unique device identifiers, advertising identifiers, serial
            numbers, mobile network information and installed applications. Our
            server logs Your activities for various diagnostic and analytical
            purposes. However, other than the IP address of Your machine from
            where You are accessing the Service, there are no other personal
            information maintained by the Company in the log.
          </p>
          <h3>Retention of Information:</h3>
          <p style={{ marginBottom: "5px" }}>
            We will retain your personal data for a period of 5 years or as long
            as it is necessary to fulfill the purposes outlined in this Privacy
            Policy.
          </p>
          <h3>E-mail Communications:</h3>
          <p style={{ marginBottom: "5px" }}>
            To help us make e-mails more useful and interesting, we may request
            to receive a confirmation when You open e-mail from Your end if Your
            computer supports such capabilities.
          </p>
          <h3>Sharing of Information Received by the Company:</h3>
          <p style={{ marginBottom: "5px" }}>
            For the purposes of providing you with our services, we may share
            your information with third parties such as affiliates of the
            company, service providers etc. When we disclose your personal data
            to such third parties. we make appropriate arrangements as required
            under applicable law to restrict further disclosure. When we
            transfer your personal data to such third parties, we enter into
            appropriate contractual arrangements to ensure that they maintain
            similar levels of data protection as we would. You may be notified
            when another business is involved along with us in processing Your
            transactions, and we share, use or, disclose customer information
            related to processing of those transactions with that business as
            needed to fulfill your order. Your personal data may be transferred,
            stored and processed outside India. By using our services, you
            consent to such storage and processing.
          </p>
          <h3>Photos, Scans, and Images:</h3>
          <p style={{ marginBottom: "0" }}>
            When you submit (or grant us permission to take) a photo, facial
            scan, or other image of you, we don’t share those photos, scans, or
            images, or any facial data captured in the facial scans, with any
            third parties. We may use them as described below:
            <p style={{ paddingBottom: "0px" }}>
              - to measure your pupillary distance and face width, and to gather
              other optical information
            </p>
            <p style={{ paddingBottom: "0px" }}>
              - to map and measure your facial features
            </p>
            <p style={{ paddingBottom: "0px" }}>
              - to address certain problems or concerns you may have with your
              glasses
            </p>
            <p style={{ paddingBottom: "0px" }}>
              - to help better understand how our frames fit our customers and
              provide frame recommendations
            </p>
            <p style={{ paddingBottom: "0px" }}>
              - to provide, personalize, and improve our products and our
              Service We store the pupillary distance and face width
              measurements of the users submitted through the iPhone X True
              Depth camera.
            </p>
          </p>
          <h3>Business Transfers:</h3>
          <p style={{ marginBottom: "5px" }}>
            As we continue to develop our business, we might be acquired
            completely or merge with any other company. In such transactions,
            customer information generally is one of the transferred business
            assets. In such a case, we will ensure the protection of Your
            information as per these policies and guidelines. You hereby
            specifically consent and grant permission to the disclosure, and
            transferring, of information to such third parties.
          </p>
          <h3>Protection of the Company and Others:</h3>
          <p style={{ marginBottom: "5px" }}>
            We release account and other personal information when we believe
            release is appropriate to comply with law; to enforce or apply our
            Terms and Conditions and other agreements; or protect the rights,
            property, or safety of Company, our users, or others. This includes
            exchanging information with other companies and organizations for
            fraud protection and other similar matters. You hereby specifically
            consent and grant permission to disclosure and transferring of
            information to such third parties, as maybe required.
          </p>

          <h2>SECURITY OF INFORMATION</h2>
          <p style={{ marginBottom: "5px" }}>
            We work to protect the security of your information during
            transmission by using Secure Sockets Layer (SSL) software during the
            part where you enter your credit card or net banking details, which
            encrypts information You input. We constantly re-evaluate our
            privacy and security policies and adapt them as necessary to deal
            with new challenges. We do not and will not sell or rent Your
            personal information to anyone, for any reason, at any time, unless
            it is in (i) in response to a valid legal request by a law
            enforcement officer or government agency or (ii) where You have
            given Your consent, or (iii) utilize the same for some statistical
            or other representation without disclosing personal data. The
            information collected from You will be stored on the Company’s
            secured server and systems. The Company maintains secure and
            reasonable security practices and procedures which are proprietary
            and unique to the Company (“Security Practice”). Such Security
            Practice involves measures such as but not limited to password
            protection, limitation of access to specified personnel on a need to
            know basis, and security measures including encryption if required
            and other physical security measures to guard against unauthorized
            access to the server and systems and information residing on such
            server and systems. The Company’s Security Practice protects against
            unauthorized access to, or unauthorized alteration, disclosure or
            destruction of the information. The Company’s Security Practice
            contains managerial, technical, operational and physical security
            control measures which are commensurate with the information assets
            being protected and with the nature of business. You acknowledge and
            agree that the Security Practice and procedures as mentioned above
            are reasonable and are designed to protect the information provided
            by You. We only reveal those numbers of Your account as required to
            enable us to access and provide You the required services relating
            to Your accounts. We make every effort to allow You to retain the
            anonymity of Your personal identity and You are free to choose a
            Login ID email address and password that keeps Your personal
            identity anonymous. Access to Your Registration Information and Your
            personal financial data is strictly restricted to those of our
            Company employees and contractors, strictly on a need to know basis,
            in order to operate, develop or improve the Service. These employees
            or contractors may be subject to discipline, including termination
            and criminal prosecution, if they fail to meet these obligations.
            With the exception of a Login ID in the form of an email address,
            which may be provided on an anonymous basis, and Your Third Party
            Account Information, which is required for providing the services,
            the Company does not require any information from You that might
            constitute personally identifiable information. It is important for
            You to protect against unauthorized access to Your password and to
            Your computer. Be sure to sign off when finished using a shared
            computer. As described in this Agreement and with Your consent, the
            Company will from time to time connect electronically to Your online
            bank, credit card and other online financial accounts to process
            Your Order. Company will also use other third parties like courier
            companies to deliver products that you order on our website, to your
            delivery address.
          </p>

          <h2>CONDITIONS OF USE, NOTICES, AND REVISIONS</h2>
          <p style={{ marginBottom: "5px" }}>
            Please do read the detailed terms and conditions of the Company’s
            Website situated athttps://www.Vuezen.com/terms-conditions. If You
            choose to visit this Website, Your visit and any dispute over
            privacy is subject to this Agreement, including limitations on
            damages, arbitration of disputes, and application of the law of the
            Republic of India. If You have any concern about privacy at this
            Website, please send us a thorough description to support@Vuezen.com
            and we will try to resolve it. Our business changes constantly. This
            Notice and the Terms and Conditions of Website Use may also change,
            and use of information that we gather now is subject to the Privacy
            Policy in effect at the time of use. We may e-mail periodic
            reminders of our notices and conditions, unless You have instructed
            us not to, but You should check our Website frequently to see recent
            changes.
          </p>

          <h2>GRIEVANCE OFFICER</h2>
          <p style={{ marginBottom: "5px" }}>
            The Company would be glad to provide assistance to You in case You
            have any queries or have any issues pertaining to this Security and
            Privacy policy. Kindly contact support@Vuezen.com
          </p>

          <h2>COOKIE POLICY</h2>
          <p style={{ marginBottom: "5px" }}>
            A cookie is a small text file that we place on your mobile device to
            enable various features of Vuezen.com. "Cookies" are used to store
            user preferences and to track user trends, so as to enhance Your
            interactive experience and generally improve our services to You.
            You can change Your cookie settings to accept or not accept cookies
            in Your browser settings. If You do accept a "cookie", You thereby
            agree to our use of any personal information collected by us using
            that cookie. If You do accept a "cookie", You thereby agree to our
            use of any personal information collected by us using that cookie.
            Whenever we uses a third party to host and serve content, we may
            arrange for a common identifier to be shared between the third party
            and us in order to enable accurate measurement of traffic and usage.
            This includes but is not limited to the use of AMP Client IDs in
            Google Analytics for Accelerated Mobile Pages served by Google on
            our behalf.
          </p>
          <h2>NDNC POLICY</h2>
          <p style={{ marginBottom: "5px" }}>
            By using the website and/or registering yourself at Vuezen.com you
            authorize us to contact you via email or phone call or sms and offer
            you our services, imparting product knowledge, offer promotional
            offers running on website & offers offered by the associated third
            parties, for which reasons, personally identifiable information may
            be collected. And Irrespective of the fact if also you have
            registered yourself under DND or DNC or NCPR service, you still
            authorize us to give you a call from Vuezen for the above mentioned
            purposes till 365 days of your registration with us. This Privacy
            Policy covers Vuezen’s treatment of personally identifiable
            information that Vuezen collects when you are on the Vuezen site,
            and when you use Vuezen’s services. This policy also covers Vuezen’s
            treatment of any personally identifiable information that Vuezen’s
            business partners share with Vuezen. This policy does not apply to
            the practices of companies that Vuezen does not own or control or to
            people that Vuezen does not employ or manage. Vuezen collects
            personally identifiable information when you register for a Vuezen
            account, when you use certain Vuezen products or services, when you
            visit Vuezen pages, and when you enter promotions. Vuezen may also
            receive personally identifiable information from our business
            partners. When you register with Vuezen, we ask for your first name,
            last name, contact no, email, Date of birth and gender. Once you
            register with Vuezen and sign in to our services, you are not
            anonymous to us. Also during registration, you may be requested to
            register your mobile phone and email id, pager, or other device to
            receive text messages, notifications, and other services to your
            wireless device. By registration you authorize us to send sms/email
            alerts to you for your login details and any other service
            requirements or some advertising messages/emails from us.
          </p>
        </TermsContentSection>
      </Container>
    </>
  );
};

export default PrivacyContent;
