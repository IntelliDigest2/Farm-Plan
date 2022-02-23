import React from "react";
import "./PageWrap.css";

import Button from "@mui/material/Button";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function TermsAndConsModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="terms-cons-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="terms-cons-modal">
          PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING THIS
          MARKETPLACE
        </Modal.Title>
      </Modal.Header>
      <Modal.Body contentClassName="modal">
        <h4>What’s in these terms?</h4>
        <p>
          <ol>
            <li>
              <b>Who we are and how to contact us</b>
            </li>
            <li>
              <b>By using our site you accept these terms</b>
            </li>
            <li>
              <b>There are other terms that may apply to you</b>
            </li>
            <li>
              <b>We may make changes to these terms</b>
            </li>
            <li>
              <b>We may make changes to our site</b>
            </li>
            <li>
              <b>We may suspend or withdraw our site</b>
            </li>
            <li>
              <b>We may transfer this agreement to someone else</b>
            </li>
            <li>
              <b>You must keep your account details safe</b>
            </li>
            <li>
              <b>How you may use material on our site</b>
            </li>
            <li>
              <b>Do not rely on information on our site</b>
            </li>
            <li>
              <b>We are not responsible for websites we link to</b>
            </li>
            <li>
              <b>User-generated content is not approved by us</b>
            </li>
            <li>
              <b>How to complain about content uploaded by other users</b>
            </li>
            <li>
              <b>Our responsibility for loss or damage suffered by you</b>
            </li>
            <li>
              <b>How we may use your personal information</b>
            </li>
            <li>
              <b>Uploading content to our site</b>
            </li>
            <li>
              <b>Rights you are giving us to use material you upload</b>
            </li>
            <li>
              <b>
                We are not responsible for viruses and you must not introduce
                them
              </b>
            </li>
            <li>
              <b>Rules about linking to our site</b>
            </li>
            <li>
              <b>Which country’s laws apply to any disputes?</b>
            </li>
            <li>
              <b>Our trademarks are registered</b>
            </li>
          </ol>
        </p>
        <h4>Who we are and how to contact us</h4>
        <p>
          <a href="//intellidigest.com/" style={{ color: "#AFBA15" }}>
            https://intellidigest.com/{" "}
          </a>
          <b>and any other website </b> operated by IntelliDigest Ltd (“We”). We
          are registered in Scotland under company number SC544884 and have our
          registered office at Edinburgh Business School Incubator, Heriot Watt
          University, Riccarton, Currie EH14 4AS. Our main trading address is
          Royal Academy of Engineering, Enterprise Hub, 4 Carlton House Terrace,
          London, SW1Y 5DG, United Kingdom.
        </p>
        <p>Our VAT number is 342981288.</p>
        <p>We are a limited company.</p>
        <p>
          To contact us, please email <b>Info@IntelliDigest.com</b> or telephone
          our customer service line on <b>0333 242 0822</b>.
        </p>
        <h4>By using our site you accept these terms</h4>
        <p>
          By using our site, you confirm that you accept these terms of use and
          that you agree to comply with them. If you do not agree to these
          terms, you must not use our site. We recommend that you print a copy
          of these terms for future reference.
        </p>
        <h4>There are other terms that may apply to you.</h4>
        <p>
          These terms of use refer to the following additional terms, which also
          apply to your use of our site:
        </p>
        <ul>
          <li>
            Our Privacy Policy{" "}
            <a
              href=" //intellidigest.com/privacy-policy/"
              style={{ color: "#AFBA15" }}
            >
              {" "}
              https://intellidigest.com/privacy-policy/
            </a>{" "}
            See further under <b>
              How we may use your personal information.
            </b>{" "}
          </li>
          <li>
            Our Cookie Policy which sets out information about the cookies on
            our site.
          </li>
          <li>
            Our Acceptable Use Policy which sets out the permitted uses and
            prohibited uses of our site. When using our site, you must comply
            with this Acceptable Use Policy.
          </li>
          <li>
            If you purchase goods from our site, our Terms and conditions of
            supply will apply to the sales.
          </li>
        </ul>
        <h4>We may make changes to these terms</h4>
        <p>
          We amend these terms from time to time. Every time you wish to use our
          site, please check these terms to ensure you understand the terms that
          apply at that time.
        </p>
        <h4>We may make changes to our site</h4>
        <p>
          We may update and change our site from time to time to reflect changes
          to our products, our users’ needs and our business priorities.
        </p>
        <h4>We may suspend or withdraw our site</h4>
        <p>
          Our site is made available free of charge. We do not guarantee that
          our site, or any content on it, will always be available or be
          uninterrupted. We may suspend or withdraw or restrict the availability
          of all or any part of our site for business and operational reasons.
          We will try to give you reasonable notice of any suspension or
          withdrawal.
        </p>
        <p>
          You are also responsible for ensuring that all persons who access our
          site through your internet connection are aware of these terms of use
          and other applicable terms and conditions, and that they comply with
          them.
        </p>
        <h4>We may transfer this agreement to someone else</h4>
        <p>
          We may transfer our rights and obligations under these terms to
          another organisation. We will always tell you in writing if this
          happens and we will ensure that the transfer will not affect your
          rights under the contract.
        </p>
        <h4>You must keep your account details safe</h4>
        <p>
          If you choose, or you are provided with, a user identification code,
          password or any other piece of information as part of our security
          procedures, you must treat such information as confidential. You must
          not disclose it to any third party.
        </p>
        <p>
          We have the right to disable any user identification code or password,
          whether chosen by you or allocated by us, at any time, if in our
          reasonable opinion you have failed to comply with any of the
          provisions of these terms of use.
        </p>
        <p>
          If you know or suspect that anyone other than you knows your user
          identification code or password, you must promptly notify us at{" "}
          <b>info@IntelliDigest.com</b>.
        </p>
        <h4>You must keep your account details safe</h4>
        <p>
          We are the owner or the licensee of all intellectual property rights
          in our site, and in the material published on it. Those works are
          protected by copyright laws and treaties around the world. All such
          rights are reserved.
        </p>
        <p>
          You may print off one copy, and may download extracts, of any page(s)
          from our site for your personal use and you may draw the attention of
          others within your organisation to content posted on our site.
        </p>
        <p>
          You must not modify the paper or digital copies of any materials you
          have printed off or downloaded in any way, and you must not use any
          illustrations, photographs, video or audio sequences or any graphics
          separately from any accompanying text.
        </p>
        <p>
          Our status (and that of any identified contributors) as the authors of
          content on our site must always be acknowledged.
        </p>
        <p>
          You must not use any part of the content on our site for commercial
          purposes without obtaining a licence to do so from us or our
          licensors.
        </p>
        <p>
          If you print off, copy or download any part of our site in breach of
          these terms of use, your right to use our site will cease immediately
          and you must, at our option, return or destroy any copies of the
          materials you have made.
        </p>
        <h4>Do not rely on information on this site</h4>
        <p>
          The content on our site is provided for general information only. It
          is not intended to amount to advice on which you should rely. You must
          obtain professional or specialist advice before taking, or refraining
          from, any action on the basis of the content on our site.
        </p>
        <p>
          Although we make reasonable efforts to update the information on our
          site, we make no representations, warranties or guarantees, whether
          express or implied, that the content on our site is accurate, complete
          or up to date.
        </p>
        <h4>We are not responsible for websites we link to</h4>
        <p>
          Where our site contains links to other sites and resources provided by
          third parties, these links are provided for your information only.
          Such links should not be interpreted as approval by us of those linked
          websites or information you may obtain from them. We have no control
          over the contents of those sites or resources.
        </p>
        <h4>User-generated content is not approved by us</h4>
        <p>
          This website may include information and materials uploaded by other
          users of the site, including to bulletin boards and chat rooms. This
          information and these materials have not been verified or approved by
          us. The views expressed by other users on our site do not represent
          our views or values.
        </p>
        <h4>How to complain about content uploaded by other users</h4>
        <p>
          If you wish to complain about content uploaded by other users, please
          contact us on{" "}
          <a href="//intellidigest.com/contact/" style={{ color: "#AFBA15" }}>
            https://intellidigest.com/contact/
          </a>
          .
        </p>
        <h4>Our responsibility for loss or damage suffered by you</h4>
        <p>
          <b>Whether you are a consumer or a business user:</b>
        </p>
        <ul>
          <li>
            We do not exclude or limit in any way our liability to you where it
            would be unlawful to do so. This includes liability for death or
            personal injury caused by our negligence or the negligence of our
            employees, agents or subcontractors and for fraud or fraudulent
            misrepresentation.
          </li>
          <li>
            Different limitations and exclusions of liability will apply to
            liability arising as a result of the supply of any products to you,
            which will be set out in our Terms and conditions of supply.
          </li>
        </ul>
        <p>
          <b>If you are a business user:</b>
        </p>
        <ul>
          <li>
            We exclude all implied conditions, warranties, representations or
            other terms that may apply to our site or any content on it.
          </li>
          <li>
            We will not be liable to you for any loss or damage, whether in
            contract, tort (including negligence), breach of statutory duty, or
            otherwise, even if foreseeable, arising under or in connection with:
            <ol>
              <li>use of, or inability to use, our site; or</li>
              <li>use of or reliance on any content displayed on our site.</li>
            </ol>
          </li>
          <li>
            In particular, we will not be liable for:
            <ol>
              <li>loss of profits, sales, business, or revenue;</li>
              <li>business interruption;</li>
              <li>loss of anticipated savings;</li>
              <li>loss of business opportunity, goodwill or reputation; or</li>
              <li>any indirect or consequential loss or damage.</li>
            </ol>
          </li>
        </ul>
        <p>
          <b>If you are a consumer user:</b>
        </p>
        <ul>
          <li>
            Please note that we only provide our site for domestic and private
            use. You agree not to use our site for any commercial or business
            purposes, and we have no liability to you for any loss of profit,
            loss of business, business interruption, or loss of business
            opportunity.
          </li>
          <li>
            If defective digital content that we have supplied, damages a device
            or digital content belonging to you and this is caused by our
            failure to use reasonable care and skill, we will either repair the
            damage or pay you compensation. However, we will not be liable for
            damage that you could have avoided by following our advice to apply
            an update offered to you free of charge or for damage that was
            caused by you failing to correctly follow installation instructions
            or to have in place the minimum system requirements advised by us.
          </li>
        </ul>
        <h4>How we may use your personal information</h4>
        <p>
          We will only use your personal information as set out in our{" "}
          <a
            href=" //intellidigest.com/privacy-policy/"
            style={{ color: "#AFBA15" }}
          >
            {" "}
            https://intellidigest.com/privacy-policy/
          </a>{" "}
        </p>
        <h4>Uploading content to our site</h4>
        <p>
          Whenever you make use of a feature that allows you to upload content
          to our site, or to make contact with other users of our site, you must
          comply with the content standards set out in our Acceptable Use
          Policy.
        </p>
        <p>
          You warrant that any such contribution does comply with those
          standards, and you will be liable to us and indemnify us for any
          breach of that warranty. This means you will be responsible for any
          loss or damage we suffer as a result of your breach of warranty.
        </p>
        <p>
          Any content you upload to our site will be considered non-proprietary.
          You retain all of your ownership rights in your content, but you are
          required to grant us and other users of our site a limited licence to
          use, store and copy that content and to distribute and make it
          available to third parties. The rights you license to us are described
          in <b>Rights you are giving us to use material you upload</b>.
        </p>
        <p>
          We also have the right to disclose your identity to any third party
          who is claiming that any content posted or uploaded by you to our site
          constitutes a violation of their intellectual property rights, or of
          their right to privacy.
        </p>
        <p>
          We have the right to remove any posting you make on our site if, in
          our opinion, your post does not comply with the content standards set
          out in our Acceptable Use Policy.
        </p>
        <p>
          You are solely responsible for securing and backing up your content.
        </p>
        <p>We do not store terrorist content.</p>
        <h4>Rights you are giving us to use material you upload</h4>
        <p>
          When you upload or post content to our site, you grant us the
          following rights to use that content:
        </p>
        <ul>
          <li>LICENCES GRANTED TO THE WEBSITE OWNER.</li>
          <li>
            LICENCES GRANTED TO OTHER USERS OF THE SITE OR TO THIRD PARTIES.
          </li>
        </ul>
        <h4>
          We are not responsible for viruses and you must not introduce them
        </h4>
        <p>
          We do not guarantee that our site will be secure or free from bugs or
          viruses. You are responsible for configuring your information
          technology, computer programmes and platform to access our site. You
          should use your own virus protection software.
        </p>
        <p>
          You must not misuse our site by knowingly introducing viruses,
          trojans, worms, logic bombs or other material that is malicious or
          technologically harmful. You must not attempt to gain unauthorised
          access to our site, the server on which our site is stored or any
          server, computer or database connected to our site. You must not
          attack our site via a denial-of-service attack or a distributed
          denial-of service attack. By breaching this provision, you would
          commit a criminal offence under the Computer Misuse Act 1990. We will
          report any such breach to the relevant law enforcement authorities and
          we will co-operate with those authorities by disclosing your identity
          to them. In the event of such a breach, your right to use our site
          will cease immediately.
        </p>
        <h4>Rules about linking to our site</h4>
        <p>
          You may link to our home page, provided you do so in a way that is
          fair and legal and does not damage our reputation or take advantage of
          it.
        </p>
        <p>
          You must not establish a link in such a way as to suggest any form of
          association, approval or endorsement on our part where none exists.
        </p>
        <p>
          You must not establish a link to our site in any website that is not
          owned by you.
        </p>
        <p>
          Our site must not be framed on any other site, nor may you create a
          link to any part of our site other than the home page.
        </p>
        <p>
          We reserve the right to withdraw linking permission without notice.
        </p>
        <p>
          The website in which you are linking must comply in all respects with
          the content standards set out in our Acceptable Use Policy.
        </p>
        <p>
          If you wish to link to or make any use of content on our site other
          than that set out above, please contact <b>info@IntelliDigest.com</b>.{" "}
        </p>
        <h4>Which country’s laws apply to any disputes?</h4>
        <p>
          If you are a consumer, please note that these terms of use, their
          subject matter and their formation, are governed by Scottish law. You
          and we both agree that the courts of Scotland will have exclusive
          jurisdiction except that if you are a resident of Northern Ireland you
          may also bring proceedings in Northern Ireland, and if you are
          resident of England or Wales, you may also bring proceedings in
          England or Wales.
        </p>
        <p>
          If you are a business, these terms of use, their subject matter and
          their formation (and any non-contractual disputes or claims) are
          governed by Scottish law. We both agree to the exclusive jurisdiction
          of the courts of Scotland.
        </p>
        <h4>Our trade marks are registered</h4>
        <p>
          IntelliDigest is an international registered trademark of
          IntelliDigest Ltd. You are not permitted to use them without our
          approval, unless they are part of material you are using as permitted
          under <b>How you may use material on our site.</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function TermsAndCons() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>TERMS AND CONDITIONS</Button>
      <TermsAndConsModal show={open} onHide={handleClose} />
    </div>
  );
}

export const TermsAndConditions = () => {};
