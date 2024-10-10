"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateBgColor,
  updateCurrentPageValue,
  updateDropdrownStatus,
  updateNavbarLogo,
  updateNavbarTextColor,
  updateNotificationIconColor,
} from "../redux/features/navbarSlice";

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-white",
        hoverTextColor: "text-white",
      })
    );
    dispatch(updateNavbarLogo("/logo-bbh.png"));
    dispatch(updateNotificationIconColor("text-white"));
    dispatch(
      updateCurrentPageValue({
        tag: "Privacy",
        bgColor: "bg-white",
        textColor: "text-[#116A7B]",
      })
    );
    dispatch(updateBgColor("bg-[#116A7B]"));
  }, []);
  return (
    <div
      className="bg-[#CDC2AE] bg-opacity-5 py-32"
      onClick={() => dispatch(updateDropdrownStatus({ field: "close all" }))}
    >
      {/* <div className="px-14 pt-14">
        <h1 className="text-4xl text-start uppercase font-semibold text-[#116A7B] ">
          our privacy policy
        </h1>
        <p className="text-2xl mt-6">
          Lorem Ipsum has been the industry&apos;s standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, Lorem
          Ipsum has been the industry&apos;s standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, Lorem Ipsum has been
          the industry&apos;s standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the
          leap into electronic typesetting, Lorem Ipsum has been the
          industry&apos;s standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the
          leap into electronic typesetting, Lorem Ipsum has been the
          industry&apos;s standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the
          leap into electronic typesetting, Lorem Ipsum has been the
          industry&apos;s standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the
          leap into electronic typesetting,
        </p>
      </div> */}

      <div className="px-14 pt-14">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n  [data-custom-class='body'], [data-custom-class='body'] * {\n          background: transparent !important;\n        }\n[data-custom-class='title'], [data-custom-class='title'] * {\n          font-family: Arial !important;\nfont-size: 26px !important;\ncolor: #000000 !important;\n        }\n[data-custom-class='subtitle'], [data-custom-class='subtitle'] * {\n          font-family: Arial !important;\ncolor: #595959 !important;\nfont-size: 14px !important;\n        }\n[data-custom-class='heading_1'], [data-custom-class='heading_1'] * {\n          font-family: Arial !important;\nfont-size: 19px !important;\ncolor: #000000 !important;\n        }\n[data-custom-class='heading_2'], [data-custom-class='heading_2'] * {\n          font-family: Arial !important;\nfont-size: 17px !important;\ncolor: #000000 !important;\n        }\n[data-custom-class='body_text'], [data-custom-class='body_text'] * {\n          color: #595959 !important;\nfont-size: 14px !important;\nfont-family: Arial !important;\n        }\n[data-custom-class='link'], [data-custom-class='link'] * {\n          color: #3030F1 !important;\nfont-size: 14px !important;\nfont-family: Arial !important;\nword-break: break-word !important;\n        }\n",
          }}
        />
        <span
          style={{
            display: "block",
            margin: "0 auto 3.125rem",
            width: "11.125rem",
            height: "2.375rem",
            background: "url(data:image/svg+xml",
          }}
        />
        <div data-custom-class="body">
          <div>
            <strong>
              <span style={{ fontSize: 26 }}>
                <span data-custom-class="title">
                  <bdt className="block-component" />
                  <bdt className="question">PRIVACY POLICY</bdt>
                  <bdt className="statement-end-if-in-editor" />
                </span>
              </span>
            </strong>
          </div>
          <div>
            <br />
          </div>
          <div>
            <span style={{ color: "rgb(127, 127, 127)" }}>
              <strong>
                <span style={{ fontSize: 15 }}>
                  <span data-custom-class="subtitle">
                    Last updated{" "}
                    <bdt className="question">October 15, 2024</bdt>
                  </span>
                </span>
              </strong>
            </span>
          </div>
          <div>
            <br />
          </div>
          <div>
            <br />
          </div>
          <div>
            <br />
          </div>
          <div style={{ lineHeight: "1.5" }}>
            <span style={{ color: "rgb(127, 127, 127)" }}>
              <span style={{ color: "rgb(89, 89, 89)", fontSize: 15 }}>
                <span data-custom-class="body_text">
                  This Privacy Notice for{" "}
                  <bdt className="question">
                    BeachBunnyHouse
                    <bdt className="block-component" />
                  </bdt>{" "}
                  (<bdt className="block-component" />'<strong>we</strong>', '
                  <strong>us</strong>', or '<strong>our</strong>'
                  <bdt className="else-block" />
                </span>
                <span data-custom-class="body_text">
                  ), describes how and why we might access, collect, store, use,
                  and/or share (<bdt className="block-component" />'
                  <strong>process</strong>'<bdt className="else-block" />) your
                  personal information when you use our services (
                  <bdt className="block-component" />'<strong>Services</strong>'
                  <bdt className="else-block" />
                  ), including when you:
                </span>
              </span>
            </span>
            <span style={{ fontSize: 15 }}>
              <span style={{ color: "rgb(127, 127, 127)" }}>
                <span data-custom-class="body_text">
                  <span style={{ color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <bdt className="block-component" />
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </div>
          <ul>
            <li data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    Visit our website
                    <bdt className="block-component" /> at{" "}
                    <span style={{ color: "rgb(0, 58, 250)" }}>
                      <bdt className="question">
                        <a
                          href="https://beachbunnyhouse.com/"
                          target="_blank"
                          data-custom-class="link"
                        >
                          https://beachbunnyhouse.com/
                        </a>
                      </bdt>
                    </span>
                    <span style={{ fontSize: 15 }}>
                      <span style={{ color: "rgb(89, 89, 89)" }}>
                        <span data-custom-class="body_text">
                          <span style={{ fontSize: 15 }}>
                            <span style={{ color: "rgb(89, 89, 89)" }}>
                              <bdt className="statement-end-if-in-editor">
                                , or any website of ours that links to this
                                Privacy Notice
                              </bdt>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </li>
          </ul>
          <div>
            <bdt className="block-component">
              <span style={{ fontSize: 15 }}>
                <span style={{ fontSize: 15 }}>
                  <span style={{ color: "rgb(127, 127, 127)" }}>
                    <span data-custom-class="body_text">
                      <span style={{ color: "rgb(89, 89, 89)" }}>
                        <span data-custom-class="body_text">
                          <bdt className="block-component" />
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </bdt>
            <div style={{ lineHeight: "1.5" }}>
              <bdt className="block-component">
                <span style={{ fontSize: 15 }} />
              </bdt>
            </div>
            <ul>
              <li data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
                <span style={{ fontSize: 15 }}>
                  Use <bdt className="question">BeachBunnyHouse</bdt>.{" "}
                  <bdt className="question">
                    A platform designed to buy, rent, or swap shares in a
                    property.
                  </bdt>
                </span>
                <bdt className="statement-end-if-in-editor">
                  <span style={{ fontSize: 15 }} />
                </bdt>
              </li>
            </ul>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span style={{ color: "rgb(127, 127, 127)" }}>
                  <span data-custom-class="body_text">
                    <span style={{ color: "rgb(89, 89, 89)" }}>
                      <span data-custom-class="body_text">
                        <bdt className="block-component" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <ul>
              <li data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      Engage with us in other related ways, including any sales,
                      marketing, or events
                      <span style={{ fontSize: 15 }}>
                        <span style={{ color: "rgb(89, 89, 89)" }}>
                          <span data-custom-class="body_text">
                            <span style={{ fontSize: 15 }}>
                              <span style={{ color: "rgb(89, 89, 89)" }}>
                                <bdt className="statement-end-if-in-editor" />
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </li>
            </ul>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span style={{ color: "rgb(127, 127, 127)" }}>
                  <span data-custom-class="body_text">
                    <strong>Questions or concerns?&nbsp;</strong>Reading this
                    Privacy Notice will help you understand your privacy rights
                    and choices. We are responsible for making decisions about
                    how your personal information is processed. If you do not
                    agree with our policies and practices, please do not use our
                    Services.
                    <bdt className="block-component" /> If you still have any
                    questions or concerns, please contact us at{" "}
                    <bdt className="question">beachbunny@al-kaidy.de</bdt>.
                  </span>
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <strong>
                <span style={{ fontSize: 15 }}>
                  <span data-custom-class="heading_1">
                    SUMMARY OF KEY POINTS
                  </span>
                </span>
              </strong>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  <strong>
                    <em>
                      This summary provides key points from our Privacy Notice,
                      but you can find out more details about any of these
                      topics by clicking the link following each key point or by
                      using our&nbsp;
                    </em>
                  </strong>
                </span>
              </span>
              <a data-custom-class="link" href="#toc">
                <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                  <span data-custom-class="body_text">
                    <strong>
                      <em>table of contents</em>
                    </strong>
                  </span>
                </span>
              </a>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  <strong>
                    <em>
                      &nbsp;below to find the section you are looking for.
                    </em>
                  </strong>
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  <strong>What personal information do we process?</strong> When
                  you visit, use, or navigate our Services, we may process
                  personal information depending on how you interact with us and
                  the Services, the choices you make, and the products and
                  features you use. Learn more about&nbsp;
                </span>
              </span>
              <a data-custom-class="link" href="#personalinfo">
                <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                  <span data-custom-class="body_text">
                    personal information you disclose to us
                  </span>
                </span>
              </a>
              <span data-custom-class="body_text">.</span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  <strong>
                    Do we process any sensitive personal information?&nbsp;
                  </strong>
                  Some of the information may be considered{" "}
                  <bdt className="block-component" />
                  'special' or 'sensitive'
                  <bdt className="else-block" /> in certain jurisdictions, for
                  example your racial or ethnic origins, sexual orientation, and
                  religious beliefs. <bdt className="block-component" />
                  We do not process sensitive personal information.
                  <bdt className="else-block" />
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  <strong>
                    Do we collect any information from third parties?
                  </strong>{" "}
                  <bdt className="block-component" />
                  We do not collect any information from third parties.
                  <bdt className="else-block" />
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  <strong>How do we process your information?</strong> We
                  process your information to provide, improve, and administer
                  our Services, communicate with you, for security and fraud
                  prevention, and to comply with law. We may also process your
                  information for other purposes with your consent. We process
                  your information only when we have a valid legal reason to do
                  so. Learn more about&nbsp;
                </span>
              </span>
              <a data-custom-class="link" href="#infouse">
                <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                  <span data-custom-class="body_text">
                    how we process your information
                  </span>
                </span>
              </a>
              <span data-custom-class="body_text">.</span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  <strong>
                    In what situations and with which{" "}
                    <bdt className="block-component" />
                    parties do we share personal information?
                  </strong>{" "}
                  We may share information in specific situations and with
                  specific <bdt className="block-component" />
                  third parties. Learn more about&nbsp;
                </span>
              </span>
              <a data-custom-class="link" href="#whoshare">
                <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                  <span data-custom-class="body_text">
                    when and with whom we share your personal information
                  </span>
                </span>
              </a>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  .<bdt className="block-component" />
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  <strong>How do we keep your information safe?</strong> We have
                  adequate <bdt className="block-component" />
                  organisational
                  <bdt className="else-block" /> and technical processes and
                  procedures in place to protect your personal information.
                  However, no electronic transmission over the internet or
                  information storage technology can be guaranteed to be 100%
                  secure, so we cannot promise or guarantee that hackers,
                  cybercriminals, or other <bdt className="block-component" />
                  unauthorised
                  <bdt className="else-block" /> third parties will not be able
                  to defeat our security and improperly collect, access, steal,
                  or modify your information. Learn more about&nbsp;
                </span>
              </span>
              <a data-custom-class="link" href="#infosafe">
                <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                  <span data-custom-class="body_text">
                    how we keep your information safe
                  </span>
                </span>
              </a>
              <span data-custom-class="body_text">.</span>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  <bdt className="statement-end-if-in-editor" />
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  <strong>What are your rights?</strong> Depending on where you
                  are located geographically, the applicable privacy law may
                  mean you have certain rights regarding your personal
                  information. Learn more about&nbsp;
                </span>
              </span>
              <a data-custom-class="link" href="#privacyrights">
                <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                  <span data-custom-class="body_text">your privacy rights</span>
                </span>
              </a>
              <span data-custom-class="body_text">.</span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  <strong>How do you exercise your rights?</strong> The easiest
                  way to exercise your rights is by{" "}
                  <bdt className="block-component">submitting a&nbsp;</bdt>
                </span>
              </span>
              <a
                data-custom-class="link"
                href="https://app.termly.io/notify/98f5250a-7669-463e-aaa8-010e6e6b0ddb"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                  <span data-custom-class="body_text">
                    data subject access request
                  </span>
                </span>
              </a>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  <bdt className="block-component" />, or by contacting us. We
                  will consider and act upon any request in accordance with
                  applicable data protection laws.
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  Want to learn more about what we do with any information we
                  collect?&nbsp;
                </span>
              </span>
              <a data-custom-class="link" href="#toc">
                <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                  <span data-custom-class="body_text">
                    Review the Privacy Notice in full
                  </span>
                </span>
              </a>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">.</span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div id="toc" style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span style={{ color: "rgb(127, 127, 127)" }}>
                  <span style={{ color: "rgb(0, 0, 0)" }}>
                    <strong>
                      <span data-custom-class="heading_1">
                        TABLE OF CONTENTS
                      </span>
                    </strong>
                  </span>
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <a data-custom-class="link" href="#infocollect">
                  <span style={{ color: "rgb(0, 58, 250)" }}>
                    1. WHAT INFORMATION DO WE COLLECT?
                  </span>
                </a>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <a data-custom-class="link" href="#infouse">
                  <span style={{ color: "rgb(0, 58, 250)" }}>
                    2. HOW DO WE PROCESS YOUR INFORMATION?
                    <bdt className="block-component" />
                  </span>
                </a>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <a data-custom-class="link" href="#legalbases">
                  <span style={{ color: "rgb(0, 58, 250)" }}>
                    3.{" "}
                    <span style={{ fontSize: 15 }}>
                      <span style={{ color: "rgb(0, 58, 250)" }}>
                        WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL
                        INFORMATION?
                      </span>
                    </span>
                    <bdt className="statement-end-if-in-editor" />
                  </span>
                </a>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span style={{ color: "rgb(0, 58, 250)" }}>
                  <a data-custom-class="link" href="#whoshare">
                    4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                  </a>
                </span>
                <span data-custom-class="body_text">
                  <bdt className="block-component" />
                  <span style={{ color: "rgb(127, 127, 127)" }}>
                    <span style={{ color: "rgb(89, 89, 89)" }}>
                      <span data-custom-class="body_text">
                        <span style={{ color: "rgb(89, 89, 89)" }}>
                          <bdt className="block-component" />
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <a data-custom-class="link" href="#cookies">
                  <span style={{ color: "rgb(0, 58, 250)" }}>
                    5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                  </span>
                </a>
                <span style={{ color: "rgb(127, 127, 127)" }}>
                  <span style={{ color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <span style={{ color: "rgb(89, 89, 89)" }}>
                        <bdt className="statement-end-if-in-editor" />
                      </span>
                    </span>
                  </span>
                </span>
                <bdt className="block-component" />
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span style={{ color: "rgb(127, 127, 127)" }}>
                  <span style={{ color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <span style={{ color: "rgb(89, 89, 89)" }}>
                        <span style={{ color: "rgb(89, 89, 89)" }}>
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <bdt className="block-component" />
                          </span>
                        </span>
                        <bdt className="block-component" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <a data-custom-class="link" href="#inforetain">
                  <span style={{ color: "rgb(0, 58, 250)" }}>
                    6. HOW LONG DO WE KEEP YOUR INFORMATION?
                  </span>
                </a>
                <span style={{ color: "rgb(127, 127, 127)" }}>
                  <span style={{ color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <span style={{ color: "rgb(89, 89, 89)" }}>
                        <span style={{ color: "rgb(89, 89, 89)" }}>
                          <bdt className="block-component" />
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <a data-custom-class="link" href="#infosafe">
                  <span style={{ color: "rgb(0, 58, 250)" }}>
                    7. HOW DO WE KEEP YOUR INFORMATION SAFE?
                  </span>
                </a>
                <span style={{ color: "rgb(127, 127, 127)" }}>
                  <span style={{ color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <span style={{ color: "rgb(89, 89, 89)" }}>
                        <bdt className="statement-end-if-in-editor" />
                        <bdt className="block-component" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <a data-custom-class="link" href="#infominors">
                  <span style={{ color: "rgb(0, 58, 250)" }}>
                    8. DO WE COLLECT INFORMATION FROM MINORS?
                  </span>
                </a>
                <span style={{ color: "rgb(127, 127, 127)" }}>
                  <span style={{ color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <span style={{ color: "rgb(89, 89, 89)" }}>
                        <bdt className="statement-end-if-in-editor" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span style={{ color: "rgb(0, 58, 250)" }}>
                  <a data-custom-class="link" href="#privacyrights">
                    9. WHAT ARE YOUR PRIVACY RIGHTS?
                  </a>
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <a data-custom-class="link" href="#DNT">
                  <span style={{ color: "rgb(0, 58, 250)" }}>
                    10. CONTROLS FOR DO-NOT-TRACK FEATURES
                    <bdt className="block-component" />
                  </span>
                </a>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <a data-custom-class="link" href="#uslaws">
                  <span style={{ color: "rgb(0, 58, 250)" }}>
                    11. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                  </span>
                </a>
              </span>
              <bdt className="block-component">
                <span style={{ fontSize: 15 }}>
                  <span data-custom-class="body_text" />
                </span>
              </bdt>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <a data-custom-class="link" href="#otherlaws">
                <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                  12. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?
                </span>
              </a>
              <span style={{ fontSize: 15 }}>
                <bdt className="statement-end-if-in-editor">
                  <span data-custom-class="body_text" />
                </bdt>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <bdt className="block-component">
                <span style={{ fontSize: 15 }} />
              </bdt>
              <bdt className="block-component" />
              <bdt className="block-component" />
              <bdt className="block-component" />
              <bdt className="block-component" />
              <bdt className="block-component" />
              <bdt className="block-component" />
              <bdt className="block-component" />
              <bdt className="block-component" />
              <bdt className="block-component" />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <a data-custom-class="link" href="#policyupdates">
                  <span style={{ color: "rgb(0, 58, 250)" }}>
                    13. DO WE MAKE UPDATES TO THIS NOTICE?
                  </span>
                </a>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <a data-custom-class="link" href="#contact">
                <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                  14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </span>
              </a>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <a data-custom-class="link" href="#request">
                <span style={{ color: "rgb(0, 58, 250)" }}>
                  15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                  FROM YOU?
                </span>
              </a>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div id="infocollect" style={{ lineHeight: "1.5" }}>
              <span style={{ color: "rgb(0, 0, 0)" }}>
                <span style={{ color: "rgb(0, 0, 0)", fontSize: 15 }}>
                  <span style={{ fontSize: 15, color: "rgb(0, 0, 0)" }}>
                    <span style={{ fontSize: 15, color: "rgb(0, 0, 0)" }}>
                      <span id="control" style={{ color: "rgb(0, 0, 0)" }}>
                        <strong>
                          <span data-custom-class="heading_1">
                            1. WHAT INFORMATION DO WE COLLECT?
                          </span>
                        </strong>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div id="personalinfo" style={{ lineHeight: "1.5" }}>
              <span
                data-custom-class="heading_2"
                style={{ color: "rgb(0, 0, 0)" }}
              >
                <span style={{ fontSize: 15 }}>
                  <strong>Personal information you disclose to us</strong>
                </span>
              </span>
            </div>
            <div>
              <div>
                <br />
              </div>
              <div style={{ lineHeight: "1.5" }}>
                <span style={{ color: "rgb(127, 127, 127)" }}>
                  <span style={{ color: "rgb(89, 89, 89)", fontSize: 15 }}>
                    <span data-custom-class="body_text">
                      <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                        <span
                          style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}
                        >
                          <span data-custom-class="body_text">
                            <strong>
                              <em>In Short:</em>
                            </strong>
                          </span>
                        </span>
                      </span>
                    </span>
                    <span data-custom-class="body_text">
                      <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                        <span
                          style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}
                        >
                          <span data-custom-class="body_text">
                            <strong>
                              <em>&nbsp;</em>
                            </strong>
                            <em>
                              We collect personal information that you provide
                              to us.
                            </em>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    We collect personal information that you voluntarily provide
                    to us when you{" "}
                    <span style={{ fontSize: 15 }}>
                      <bdt className="block-component" />
                    </span>
                    register on the Services,&nbsp;
                  </span>
                  <span style={{ fontSize: 15 }}>
                    <span data-custom-class="body_text">
                      <span style={{ fontSize: 15 }}>
                        <bdt className="statement-end-if-in-editor" />
                      </span>
                    </span>
                    <span data-custom-class="body_text">
                      express an interest in obtaining information about us or
                      our products and Services, when you participate in
                      activities on the Services, or otherwise when you contact
                      us.
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <span style={{ fontSize: 15 }}>
                      <bdt className="block-component" />
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <strong>Personal Information Provided by You.</strong> The
                    personal information that we collect depends on the context
                    of your interactions with us and the Services, the choices
                    you make, and the products and features you use. The
                    personal information we collect may include the following:
                    <span style={{ fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <bdt className="forloop-component" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <ul>
              <li data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <span style={{ fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <bdt className="question">names</bdt>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </li>
            </ul>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <span style={{ fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <bdt className="forloop-component" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <ul>
              <li data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <span style={{ fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <bdt className="question">phone numbers</bdt>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </li>
            </ul>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <span style={{ fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <bdt className="forloop-component" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <ul>
              <li data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <span style={{ fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <bdt className="question">email addresses</bdt>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </li>
            </ul>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <span style={{ fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <bdt className="forloop-component" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <ul>
              <li data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <span style={{ fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <bdt className="question">mailing addresses</bdt>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </li>
            </ul>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <span style={{ fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <bdt className="forloop-component" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <ul>
              <li data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <span style={{ fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <bdt className="question">usernames</bdt>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </li>
            </ul>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <span style={{ fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <bdt className="forloop-component" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <ul>
              <li data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <span style={{ fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <bdt className="question">passwords</bdt>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </li>
            </ul>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <span style={{ fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <bdt className="forloop-component" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <ul>
              <li data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <span style={{ fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <bdt className="question">contact preferences</bdt>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </li>
            </ul>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <span style={{ fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <bdt className="forloop-component" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <ul>
              <li data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <span style={{ fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <bdt className="question">billing addresses</bdt>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </li>
            </ul>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <span style={{ fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <bdt className="forloop-component" />
                      </span>
                      <span data-custom-class="body_text">
                        <bdt className="statement-end-if-in-editor" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div id="sensitiveinfo" style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  <strong>Sensitive Information.</strong>{" "}
                  <bdt className="block-component" />
                  We do not process sensitive information.
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  <bdt className="else-block" />
                </span>
              </span>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <span style={{ fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <bdt className="block-component" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <strong>Payment Data.</strong> We may collect data necessary
                    to process your payment if you choose to make purchases,
                    such as your payment instrument number, and the security
                    code associated with your payment instrument. All payment
                    data is handled and stored by
                    <bdt className="forloop-component" />
                    <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                      <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                        <span data-custom-class="body_text">
                          <span style={{ fontSize: 15 }}>
                            <span data-custom-class="body_text">
                              <bdt className="block-component" />
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>{" "}
                    <bdt className="question">Paypal</bdt>
                    <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                      <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                        <span data-custom-class="body_text">
                          <span
                            style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}
                          >
                            <span
                              style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}
                            >
                              <span data-custom-class="body_text">
                                <span style={{ fontSize: 15 }}>
                                  <span data-custom-class="body_text">
                                    <bdt className="block-component" />
                                  </span>
                                </span>
                              </span>
                              <span data-custom-class="body_text">
                                <span style={{ fontSize: 15 }}>
                                  <span style={{ color: "rgb(89, 89, 89)" }}>
                                    <span data-custom-class="body_text">
                                      <span style={{ fontSize: 15 }}>
                                        <span
                                          style={{ color: "rgb(89, 89, 89)" }}
                                        >
                                          <span data-custom-class="body_text">
                                            <span
                                              style={{
                                                color: "rgb(89, 89, 89)",
                                              }}
                                            >
                                              <span style={{ fontSize: 15 }}>
                                                <span data-custom-class="body_text">
                                                  <bdt className="forloop-component" />
                                                </span>
                                              </span>
                                            </span>
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </span>
                          . You may find their privacy notice link(s) here:
                          <span
                            style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}
                          >
                            <span
                              style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}
                            >
                              <span data-custom-class="body_text">
                                <bdt className="forloop-component" />
                                <span
                                  style={{
                                    fontSize: 15,
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: 15,
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span data-custom-class="body_text">
                                      <span style={{ fontSize: 15 }}>
                                        <span data-custom-class="body_text">
                                          <bdt className="block-component" />
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </span>{" "}
                          <span style={{ color: "rgb(0, 58, 250)" }}>
                            <bdt className="question">
                              <a
                                href="https://www.paypal.com/us/legalhub/privacy-full"
                                target="_blank"
                                data-custom-class="link"
                              >
                                https://www.paypal.com/us/legalhub/privacy-full
                              </a>
                            </bdt>
                          </span>
                          <span
                            style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}
                          >
                            <span
                              style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}
                            >
                              <span data-custom-class="body_text">
                                <span
                                  style={{
                                    fontSize: 15,
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: 15,
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span data-custom-class="body_text">
                                      <span
                                        style={{
                                          fontSize: 15,
                                          color: "rgb(89, 89, 89)",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontSize: 15,
                                            color: "rgb(89, 89, 89)",
                                          }}
                                        >
                                          <span data-custom-class="body_text">
                                            <span style={{ fontSize: 15 }}>
                                              <span data-custom-class="body_text">
                                                <bdt className="block-component" />
                                              </span>
                                            </span>
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                                <bdt className="forloop-component" />
                                <span style={{ fontSize: 15 }}>
                                  <span data-custom-class="body_text">
                                    .<bdt className="block-component" />
                                  </span>
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <span style={{ fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <bdt className="statement-end-if-in-editor">
                          <bdt className="block-component" />
                        </bdt>
                      </span>
                    </span>
                  </span>
                </span>
                <bdt className="block-component" />
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    All personal information that you provide to us must be
                    true, complete, and accurate, and you must notify us of any
                    changes to such personal information.
                  </span>
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <bdt className="block-component" />
                  </span>
                </span>
              </span>
              <bdt className="block-component">
                <span style={{ fontSize: 15 }} />
              </bdt>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <span style={{ color: "rgb(89, 89, 89)", fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <span
                          style={{ color: "rgb(89, 89, 89)", fontSize: 15 }}
                        >
                          <span data-custom-class="body_text">
                            <bdt className="statement-end-if-in-editor">
                              <bdt className="block-component" />
                            </bdt>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
              <span style={{ fontSize: 15 }}>
                <span data-custom-class="body_text">
                  <bdt className="block-component" />
                </span>
              </span>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div id="infouse" style={{ lineHeight: "1.5" }}>
              <span style={{ color: "rgb(127, 127, 127)" }}>
                <span style={{ color: "rgb(89, 89, 89)", fontSize: 15 }}>
                  <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                    <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                      <span id="control" style={{ color: "rgb(0, 0, 0)" }}>
                        <strong>
                          <span data-custom-class="heading_1">
                            2. HOW DO WE PROCESS YOUR INFORMATION?
                          </span>
                        </strong>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div>
              <div style={{ lineHeight: "1.5" }}>
                <br />
              </div>
              <div style={{ lineHeight: "1.5" }}>
                <span style={{ color: "rgb(127, 127, 127)" }}>
                  <span style={{ color: "rgb(89, 89, 89)", fontSize: 15 }}>
                    <span data-custom-class="body_text">
                      <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                        <span
                          style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}
                        >
                          <span data-custom-class="body_text">
                            <strong>
                              <em>In Short:&nbsp;</em>
                            </strong>
                            <em>
                              We process your information to provide, improve,
                              and administer our Services, communicate with you,
                              for security and fraud prevention, and to comply
                              with law. We may also process your information for
                              other purposes with your consent.
                            </em>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <br />
            </div>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <strong>
                      We process your personal information for a variety of
                      reasons, depending on how you interact with our Services,
                      including:
                    </strong>
                    <bdt className="block-component" />
                  </span>
                </span>
              </span>
            </div>
            <ul>
              <li data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <strong>
                        To facilitate account creation and authentication and
                        otherwise manage user accounts.&nbsp;
                      </strong>
                      We may process your information so you can create and log
                      in to your account, as well as keep your account in
                      working order.
                      <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                        <span
                          style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}
                        >
                          <span data-custom-class="body_text">
                            <span style={{ fontSize: 15 }}>
                              <span style={{ color: "rgb(89, 89, 89)" }}>
                                <span data-custom-class="body_text">
                                  <span style={{ fontSize: 15 }}>
                                    <span style={{ color: "rgb(89, 89, 89)" }}>
                                      <span data-custom-class="body_text">
                                        <bdt className="statement-end-if-in-editor" />
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </li>
            </ul>
            <div style={{ lineHeight: "1.5" }}>
              <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span data-custom-class="body_text">
                    <bdt className="block-component" />
                  </span>
                </span>
              </span>
              <div style={{ lineHeight: "1.5" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <bdt className="block-component" />
                    </span>
                  </span>
                </span>
              </div>
              <ul>
                <li data-custom-class="body_text" style={{ lineHeight: "1.5" }}>
                  <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                    <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                      <span data-custom-class="body_text">
                        <strong>
                          To deliver and facilitate delivery of services to the
                          user.&nbsp;
                        </strong>
                        We may process your information to provide you with the
                        requested service.
                        <span style={{ fontSize: 15 }}>
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <span data-custom-class="body_text">
                              <span
                                style={{
                                  fontSize: 15,
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 15,
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span data-custom-class="body_text">
                                    <span
                                      style={{
                                        fontSize: 15,
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: 15,
                                          color: "rgb(89, 89, 89)",
                                        }}
                                      >
                                        <span data-custom-class="body_text">
                                          <span
                                            style={{
                                              fontSize: 15,
                                              color: "rgb(89, 89, 89)",
                                            }}
                                          >
                                            <span
                                              style={{
                                                fontSize: 15,
                                                color: "rgb(89, 89, 89)",
                                              }}
                                            >
                                              <span data-custom-class="body_text">
                                                <span style={{ fontSize: 15 }}>
                                                  <span
                                                    style={{
                                                      color: "rgb(89, 89, 89)",
                                                    }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        <span
                                                          style={{
                                                            color:
                                                              "rgb(89, 89, 89)",
                                                          }}
                                                        >
                                                          <span data-custom-class="body_text">
                                                            <bdt className="statement-end-if-in-editor" />
                                                          </span>
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </span>
                                                </span>
                                              </span>
                                            </span>
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
              </ul>
              <div style={{ lineHeight: "1.5" }}>
                <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                  <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                    <span data-custom-class="body_text">
                      <bdt className="block-component" />
                    </span>
                  </span>
                </span>
                <div style={{ lineHeight: "1.5" }}>
                  <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                    <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                      <span data-custom-class="body_text">
                        <bdt className="block-component" />
                      </span>
                    </span>
                  </span>
                </div>
                <ul>
                  <li
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                      <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                        <span data-custom-class="body_text">
                          <strong>
                            To respond to user inquiries/offer support to
                            users.&nbsp;
                          </strong>
                          We may process your information to respond to your
                          inquiries and solve any potential issues you might
                          have with the requested service.
                          <bdt className="statement-end-if-in-editor" />
                        </span>
                      </span>
                    </span>
                  </li>
                </ul>
                <div style={{ lineHeight: "1.5" }}>
                  <bdt className="block-component">
                    <span style={{ fontSize: 15 }} />
                  </bdt>
                  <div style={{ lineHeight: "1.5" }}>
                    <bdt className="block-component">
                      <span style={{ fontSize: 15 }} />
                    </bdt>
                  </div>
                  <ul>
                    <li
                      data-custom-class="body_text"
                      style={{ lineHeight: "1.5" }}
                    >
                      <span style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}>
                        <span
                          style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}
                        >
                          <span data-custom-class="body_text">
                            <strong>
                              To send administrative information to you.&nbsp;
                            </strong>
                            We may process your information to send you details
                            about our products and services, changes to our
                            terms and policies, and other similar information.
                            <span
                              style={{ fontSize: 15, color: "rgb(89, 89, 89)" }}
                            >
                              <span
                                style={{
                                  fontSize: 15,
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span data-custom-class="body_text">
                                  <span
                                    style={{
                                      fontSize: 15,
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: 15,
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      <span data-custom-class="body_text">
                                        <bdt className="statement-end-if-in-editor" />
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </li>
                  </ul>
                  <div style={{ lineHeight: "1.5" }}>
                    <bdt className="block-component">
                      <span style={{ fontSize: 15 }} />
                    </bdt>
                    <div style={{ lineHeight: "1.5" }}>
                      <bdt className="block-component">
                        <span style={{ fontSize: 15 }}>
                          <span data-custom-class="body_text" />
                        </span>
                      </bdt>
                    </div>
                    <ul>
                      <li
                        data-custom-class="body_text"
                        style={{ lineHeight: "1.5" }}
                      >
                        <span data-custom-class="body_text">
                          <span style={{ fontSize: 15 }}>
                            <strong>
                              To <bdt className="block-component" />
                              fulfil
                              <bdt className="else-block" /> and manage your
                              orders.
                            </strong>{" "}
                            We may process your information to{" "}
                            <bdt className="block-component" />
                            fulfil
                            <bdt className="else-block" /> and manage your
                            orders, payments, returns, and exchanges made
                            through the Services.
                          </span>
                        </span>
                        <bdt className="statement-end-if-in-editor">
                          <span style={{ fontSize: 15 }}>
                            <span data-custom-class="body_text" />
                          </span>
                        </bdt>
                      </li>
                    </ul>
                    <p style={{ fontSize: 15, lineHeight: "1.5" }}>
                      <bdt className="block-component">
                        <span style={{ fontSize: 15 }} />
                      </bdt>
                    </p>
                    <p style={{ fontSize: 15, lineHeight: "1.5" }}>
                      <bdt className="block-component">
                        <span style={{ fontSize: 15 }} />
                      </bdt>
                    </p>
                    <ul>
                      <li
                        data-custom-class="body_text"
                        style={{ lineHeight: "1.5" }}
                      >
                        <span style={{ fontSize: 15 }}>
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <span style={{ color: "rgb(89, 89, 89)" }}>
                              <span data-custom-class="body_text">
                                <strong>
                                  To enable user-to-user communications.&nbsp;
                                </strong>
                                We may process your information if you choose to
                                use any of our offerings that allow for
                                communication with another user.
                                <span style={{ color: "rgb(89, 89, 89)" }}>
                                  <span style={{ color: "rgb(89, 89, 89)" }}>
                                    <span data-custom-class="body_text">
                                      <span
                                        style={{ color: "rgb(89, 89, 89)" }}
                                      >
                                        <span data-custom-class="body_text">
                                          <span
                                            style={{ color: "rgb(89, 89, 89)" }}
                                          >
                                            <span data-custom-class="body_text">
                                              <bdt className="statement-end-if-in-editor" />
                                            </span>
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                    </ul>
                    <p style={{ fontSize: 15, lineHeight: "1.5" }}>
                      <bdt className="block-component" />
                    </p>
                    <p style={{ fontSize: 15, lineHeight: "1.5" }}>
                      <bdt className="block-component" />
                    </p>
                    <div style={{ lineHeight: "1.5" }}>
                      <bdt className="block-component">
                        <span style={{ fontSize: 15 }}>
                          <span data-custom-class="body_text" />
                        </span>
                      </bdt>
                      <div style={{ lineHeight: "1.5" }}>
                        <bdt className="block-component">
                          <span style={{ fontSize: 15 }} />
                        </bdt>
                        <div style={{ lineHeight: "1.5" }}>
                          <bdt className="block-component">
                            <span style={{ fontSize: 15 }} />
                          </bdt>
                          <div style={{ lineHeight: "1.5" }}>
                            <span style={{ fontSize: 15 }}>
                              <bdt className="block-component">
                                <span data-custom-class="body_text" />
                              </bdt>
                            </span>
                            <div style={{ lineHeight: "1.5" }}>
                              <bdt className="block-component">
                                <span style={{ fontSize: 15 }}>
                                  <span data-custom-class="body_text" />
                                </span>
                              </bdt>
                              <div style={{ lineHeight: "1.5" }}>
                                <bdt className="block-component">
                                  <span style={{ fontSize: 15 }}>
                                    <span data-custom-class="body_text" />
                                  </span>
                                </bdt>
                                <div style={{ lineHeight: "1.5" }}>
                                  <bdt className="block-component">
                                    <span style={{ fontSize: 15 }}>
                                      <span data-custom-class="body_text" />
                                    </span>
                                  </bdt>
                                  <div style={{ lineHeight: "1.5" }}>
                                    <bdt className="block-component">
                                      <span style={{ fontSize: 15 }}>
                                        <span data-custom-class="body_text" />
                                      </span>
                                    </bdt>
                                    <div style={{ lineHeight: "1.5" }}>
                                      <bdt className="block-component">
                                        <span style={{ fontSize: 15 }}>
                                          <span data-custom-class="body_text" />
                                        </span>
                                      </bdt>
                                      <div style={{ lineHeight: "1.5" }}>
                                        <bdt className="block-component">
                                          <span style={{ fontSize: 15 }}>
                                            <span data-custom-class="body_text" />
                                          </span>
                                        </bdt>
                                        <div style={{ lineHeight: "1.5" }}>
                                          <bdt className="block-component">
                                            <span style={{ fontSize: 15 }}>
                                              <span data-custom-class="body_text" />
                                            </span>
                                          </bdt>
                                          <div style={{ lineHeight: "1.5" }}>
                                            <bdt className="block-component">
                                              <span style={{ fontSize: 15 }}>
                                                <span data-custom-class="body_text" />
                                              </span>
                                            </bdt>
                                            <div style={{ lineHeight: "1.5" }}>
                                              <bdt className="block-component">
                                                <span style={{ fontSize: 15 }}>
                                                  <span data-custom-class="body_text" />
                                                </span>
                                              </bdt>
                                              <div
                                                style={{ lineHeight: "1.5" }}
                                              >
                                                <bdt className="block-component">
                                                  <span
                                                    style={{ fontSize: 15 }}
                                                  >
                                                    <span data-custom-class="body_text" />
                                                  </span>
                                                </bdt>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <bdt className="block-component">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        <strong>
                                                          To save or protect an
                                                          individual's vital
                                                          interest.
                                                        </strong>{" "}
                                                        We may process your
                                                        information when
                                                        necessary to save or
                                                        protect an individual’s
                                                        vital interest, such as
                                                        to prevent harm.
                                                      </span>
                                                    </span>
                                                    <bdt className="statement-end-if-in-editor">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        <span data-custom-class="body_text" />
                                                      </span>
                                                    </bdt>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <bdt className="block-component">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                  <bdt className="block-component">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                  <bdt className="block-component">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                  <bdt className="block-component">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <br />
                                                </div>
                                                <div
                                                  id="legalbases"
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <strong>
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="heading_1">
                                                        3. WHAT LEGAL BASES DO
                                                        WE RELY ON TO PROCESS
                                                        YOUR INFORMATION?
                                                      </span>
                                                    </span>
                                                  </strong>
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <br />
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <em>
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text">
                                                        <strong>
                                                          In Short:&nbsp;
                                                        </strong>
                                                        We only process your
                                                        personal information
                                                        when we believe it is
                                                        necessary and we have a
                                                        valid legal reason (i.e.
                                                        <bdt className="block-component" />{" "}
                                                        legal basis) to do so
                                                        under applicable law,
                                                        like with your consent,
                                                        to comply with laws, to
                                                        provide you with
                                                        services to enter into
                                                        or{" "}
                                                        <bdt className="block-component" />
                                                        fulfil
                                                        <bdt className="else-block" />{" "}
                                                        our contractual
                                                        obligations, to protect
                                                        your rights, or to{" "}
                                                        <bdt className="block-component" />
                                                        fulfil
                                                        <bdt className="else-block" />{" "}
                                                        our legitimate business
                                                        interests.
                                                      </span>
                                                    </span>
                                                  </em>
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <br />
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span
                                                    style={{ fontSize: 15 }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <bdt className="block-component" />
                                                    </span>
                                                    <span data-custom-class="body_text">
                                                      <bdt className="block-component" />
                                                    </span>
                                                  </span>
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <em>
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text">
                                                        <strong>
                                                          <u>
                                                            If you are located
                                                            in the EU or UK,
                                                            this section applies
                                                            to you.
                                                          </u>
                                                        </strong>
                                                      </span>
                                                    </span>
                                                  </em>
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <br />
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span
                                                    style={{ fontSize: 15 }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <bdt className="statement-end-if-in-editor" />
                                                    </span>
                                                  </span>
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span
                                                    style={{ fontSize: 15 }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      The General Data
                                                      Protection Regulation
                                                      (GDPR) and UK GDPR require
                                                      us to explain the valid
                                                      legal bases we rely on in
                                                      order to process your
                                                      personal information. As
                                                      such, we may rely on the
                                                      following legal bases to
                                                      process your personal
                                                      information:
                                                    </span>
                                                  </span>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text">
                                                        <strong>
                                                          Consent.&nbsp;
                                                        </strong>
                                                        We may process your
                                                        information if you have
                                                        given us permission
                                                        (i.e.
                                                        <bdt className="block-component" />{" "}
                                                        consent) to use your
                                                        personal information for
                                                        a specific purpose. You
                                                        can withdraw your
                                                        consent at any time.
                                                        Learn more about&nbsp;
                                                      </span>
                                                    </span>
                                                    <a
                                                      data-custom-class="link"
                                                      href="#withdrawconsent"
                                                    >
                                                      <span
                                                        style={{
                                                          color:
                                                            "rgb(0, 58, 250)",
                                                          fontSize: 15,
                                                        }}
                                                      >
                                                        <span data-custom-class="body_text">
                                                          withdrawing your
                                                          consent
                                                        </span>
                                                      </span>
                                                    </a>
                                                    <span data-custom-class="body_text">
                                                      .
                                                    </span>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <bdt className="block-component">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        <strong>
                                                          Performance of a
                                                          Contract.
                                                        </strong>{" "}
                                                        We may process your
                                                        personal information
                                                        when we believe it is
                                                        necessary to{" "}
                                                        <bdt className="block-component" />
                                                        fulfil
                                                        <bdt className="else-block" />{" "}
                                                        our contractual
                                                        obligations to you,
                                                        including providing our
                                                        Services or at your
                                                        request prior to
                                                        entering into a contract
                                                        with you.
                                                      </span>
                                                    </span>
                                                    <bdt className="statement-end-if-in-editor">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        <span data-custom-class="body_text" />
                                                      </span>
                                                    </bdt>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <bdt className="block-component">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                  <bdt className="block-component">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        <strong>
                                                          Legal Obligations.
                                                        </strong>{" "}
                                                        We may process your
                                                        information where we
                                                        believe it is necessary
                                                        for compliance with our
                                                        legal obligations, such
                                                        as to cooperate with a
                                                        law enforcement body or
                                                        regulatory agency,
                                                        exercise or defend our
                                                        legal rights, or
                                                        disclose your
                                                        information as evidence
                                                        in litigation in which
                                                        we are involved.
                                                        <bdt className="statement-end-if-in-editor" />
                                                        <br />
                                                      </span>
                                                    </span>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <bdt className="block-component">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        <strong>
                                                          Vital Interests.
                                                        </strong>{" "}
                                                        We may process your
                                                        information where we
                                                        believe it is necessary
                                                        to protect your vital
                                                        interests or the vital
                                                        interests of a third
                                                        party, such as
                                                        situations involving
                                                        potential threats to the
                                                        safety of any person.
                                                      </span>
                                                    </span>
                                                    <bdt className="statement-end-if-in-editor">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        <span data-custom-class="body_text" />
                                                      </span>
                                                    </bdt>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <bdt className="block-component">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                  <span data-custom-class="body_text">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      In legal terms, we are
                                                      generally the{" "}
                                                      <bdt className="block-component" />
                                                      'data controller'
                                                      <bdt className="else-block" />{" "}
                                                      under European data
                                                      protection laws of the
                                                      personal information
                                                      described in this Privacy
                                                      Notice, since we determine
                                                      the means and/or purposes
                                                      of the data processing we
                                                      perform. This Privacy
                                                      Notice does not apply to
                                                      the personal information
                                                      we process as a{" "}
                                                      <bdt className="block-component" />
                                                      'data processor'
                                                      <bdt className="else-block" />{" "}
                                                      on behalf of our
                                                      customers. In those
                                                      situations, the customer
                                                      that we provide services
                                                      to and with whom we have
                                                      entered into a data
                                                      processing agreement is
                                                      the{" "}
                                                      <bdt className="block-component" />
                                                      'data controller'
                                                      <bdt className="else-block" />{" "}
                                                      responsible for your
                                                      personal information, and
                                                      we merely process your
                                                      information on their
                                                      behalf in accordance with
                                                      your instructions. If you
                                                      want to know more about
                                                      our customers' privacy
                                                      practices, you should read
                                                      their privacy policies and
                                                      direct any questions you
                                                      have to them.
                                                    </span>
                                                  </span>
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <br />
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <bdt className="statement-end-if-in-editor">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                  <span data-custom-class="body_text">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <bdt className="block-component">
                                                        <bdt className="block-component" />
                                                      </bdt>
                                                    </span>
                                                  </span>
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span data-custom-class="body_text">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <strong>
                                                        <u>
                                                          <em>
                                                            If you are located
                                                            in Canada, this
                                                            section applies to
                                                            you.
                                                          </em>
                                                        </u>
                                                      </strong>
                                                    </span>
                                                  </span>
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <br />
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span data-custom-class="body_text">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <bdt className="statement-end-if-in-editor" />
                                                    </span>
                                                  </span>
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span data-custom-class="body_text">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      We may process your
                                                      information if you have
                                                      given us specific
                                                      permission (i.e.
                                                      <bdt className="block-component" />{" "}
                                                      express consent) to use
                                                      your personal information
                                                      for a specific purpose, or
                                                      in situations where your
                                                      permission can be inferred
                                                      (i.e.
                                                      <bdt className="block-component" />{" "}
                                                      implied consent). You
                                                      can&nbsp;
                                                    </span>
                                                  </span>
                                                  <a
                                                    data-custom-class="link"
                                                    href="#withdrawconsent"
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <span
                                                        style={{
                                                          color:
                                                            "rgb(0, 58, 250)",
                                                          fontSize: 15,
                                                        }}
                                                      >
                                                        withdraw your consent
                                                      </span>
                                                    </span>
                                                  </a>
                                                  <span data-custom-class="body_text">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      &nbsp;at any time.
                                                    </span>
                                                  </span>
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <br />
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span data-custom-class="body_text">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      In some exceptional cases,
                                                      we may be legally
                                                      permitted under applicable
                                                      law to process your
                                                      information without your
                                                      consent, including, for
                                                      example:
                                                    </span>
                                                  </span>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        If collection is clearly
                                                        in the interests of an
                                                        individual and consent
                                                        cannot be obtained in a
                                                        timely way
                                                      </span>
                                                    </span>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span data-custom-class="body_text">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <bdt className="block-component" />
                                                    </span>
                                                  </span>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        For investigations and
                                                        fraud detection and
                                                        prevention
                                                        <bdt className="statement-end-if-in-editor" />
                                                      </span>
                                                    </span>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <bdt className="block-component">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        For business
                                                        transactions provided
                                                        certain conditions are
                                                        met
                                                      </span>
                                                    </span>
                                                    <bdt className="statement-end-if-in-editor">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        <span data-custom-class="body_text" />
                                                      </span>
                                                    </bdt>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <bdt className="block-component">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        If it is contained in a
                                                        witness statement and
                                                        the collection is
                                                        necessary to assess,
                                                        process, or settle an
                                                        insurance claim
                                                      </span>
                                                    </span>
                                                    <bdt className="statement-end-if-in-editor">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        <span data-custom-class="body_text" />
                                                      </span>
                                                    </bdt>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <bdt className="block-component">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        For identifying injured,
                                                        ill, or deceased persons
                                                        and communicating with
                                                        next of kin
                                                      </span>
                                                    </span>
                                                    <bdt className="statement-end-if-in-editor">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        <span data-custom-class="body_text" />
                                                      </span>
                                                    </bdt>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span data-custom-class="body_text">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <bdt className="block-component" />
                                                    </span>
                                                  </span>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        If we have reasonable
                                                        grounds to believe an
                                                        individual has been, is,
                                                        or may be victim of
                                                        financial abuse
                                                        <bdt className="statement-end-if-in-editor" />
                                                      </span>
                                                    </span>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span data-custom-class="body_text">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <bdt className="block-component" />
                                                    </span>
                                                  </span>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        If it is reasonable to
                                                        expect collection and
                                                        use with consent would
                                                        compromise the
                                                        availability or the
                                                        accuracy of the
                                                        information and the
                                                        collection is reasonable
                                                        for purposes related to
                                                        investigating a breach
                                                        of an agreement or a
                                                        contravention of the
                                                        laws of Canada or a
                                                        province
                                                        <bdt className="statement-end-if-in-editor" />
                                                      </span>
                                                    </span>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span data-custom-class="body_text">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <bdt className="block-component" />
                                                    </span>
                                                  </span>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <span
                                                        style={{ fontSize: 15 }}
                                                      >
                                                        If disclosure is
                                                        required to comply with
                                                        a subpoena, warrant,
                                                        court order, or rules of
                                                        the court relating to
                                                        the production of
                                                        records
                                                        <bdt className="statement-end-if-in-editor" />
                                                      </span>
                                                    </span>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <bdt className="block-component">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text">
                                                        If it was produced by an
                                                        individual in the course
                                                        of their employment,
                                                        business, or profession
                                                        and the collection is
                                                        consistent with the
                                                        purposes for which the
                                                        information was produced
                                                        <bdt className="statement-end-if-in-editor" />
                                                      </span>
                                                    </span>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span
                                                    style={{ fontSize: 15 }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <bdt className="block-component" />
                                                    </span>
                                                  </span>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text">
                                                        If the collection is
                                                        solely for journalistic,
                                                        artistic, or literary
                                                        purposes
                                                        <bdt className="statement-end-if-in-editor" />
                                                      </span>
                                                    </span>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span
                                                    style={{ fontSize: 15 }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <bdt className="block-component" />
                                                    </span>
                                                  </span>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text">
                                                        If the information is
                                                        publicly available and
                                                        is specified by the
                                                        regulations
                                                      </span>
                                                      <bdt className="statement-end-if-in-editor">
                                                        <span data-custom-class="body_text" />
                                                      </bdt>
                                                    </span>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <bdt className="statement-end-if-in-editor">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                  <bdt className="statement-end-if-in-editor">
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text" />
                                                    </span>
                                                  </bdt>
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <br />
                                                </div>
                                                <div
                                                  id="whoshare"
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span
                                                    style={{
                                                      color:
                                                        "rgb(127, 127, 127)",
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        color:
                                                          "rgb(89, 89, 89)",
                                                        fontSize: 15,
                                                      }}
                                                    >
                                                      <span
                                                        style={{
                                                          fontSize: 15,
                                                          color:
                                                            "rgb(89, 89, 89)",
                                                        }}
                                                      >
                                                        <span
                                                          style={{
                                                            fontSize: 15,
                                                            color:
                                                              "rgb(89, 89, 89)",
                                                          }}
                                                        >
                                                          <span
                                                            id="control"
                                                            style={{
                                                              color:
                                                                "rgb(0, 0, 0)",
                                                            }}
                                                          >
                                                            <strong>
                                                              <span data-custom-class="heading_1">
                                                                4. WHEN AND WITH
                                                                WHOM DO WE SHARE
                                                                YOUR PERSONAL
                                                                INFORMATION?
                                                              </span>
                                                            </strong>
                                                          </span>
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </span>
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <br />
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span
                                                    style={{
                                                      fontSize: 15,
                                                      color: "rgb(89, 89, 89)",
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        fontSize: 15,
                                                        color:
                                                          "rgb(89, 89, 89)",
                                                      }}
                                                    >
                                                      <span data-custom-class="body_text">
                                                        <strong>
                                                          <em>In Short:</em>
                                                        </strong>
                                                        <em>
                                                          &nbsp;We may share
                                                          information in
                                                          specific situations
                                                          described in this
                                                          section and/or with
                                                          the following{" "}
                                                          <bdt className="block-component" />
                                                          third parties.
                                                        </em>
                                                      </span>
                                                    </span>
                                                  </span>
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span
                                                    style={{
                                                      fontSize: 15,
                                                      color: "rgb(89, 89, 89)",
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        fontSize: 15,
                                                        color:
                                                          "rgb(89, 89, 89)",
                                                      }}
                                                    >
                                                      <span data-custom-class="body_text">
                                                        <bdt className="block-component" />
                                                      </span>
                                                    </span>
                                                  </span>
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <br />
                                                </div>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span
                                                    style={{ fontSize: 15 }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      We{" "}
                                                      <bdt className="block-component" />
                                                      may need to share your
                                                      personal information in
                                                      the following situations:
                                                    </span>
                                                  </span>
                                                </div>
                                                <ul>
                                                  <li
                                                    data-custom-class="body_text"
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <span data-custom-class="body_text">
                                                        <strong>
                                                          Business Transfers.
                                                        </strong>{" "}
                                                        We may share or transfer
                                                        your information in
                                                        connection with, or
                                                        during negotiations of,
                                                        any merger, sale of
                                                        company assets,
                                                        financing, or
                                                        acquisition of all or a
                                                        portion of our business
                                                        to another company.
                                                      </span>
                                                    </span>
                                                  </li>
                                                </ul>
                                                <div
                                                  style={{ lineHeight: "1.5" }}
                                                >
                                                  <span
                                                    style={{ fontSize: 15 }}
                                                  >
                                                    <span data-custom-class="body_text">
                                                      <bdt className="block-component" />
                                                    </span>
                                                  </span>
                                                  <div
                                                    style={{
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    <span
                                                      style={{ fontSize: 15 }}
                                                    >
                                                      <bdt className="block-component">
                                                        <span data-custom-class="body_text" />
                                                      </bdt>
                                                    </span>
                                                    <div
                                                      style={{
                                                        lineHeight: "1.5",
                                                      }}
                                                    >
                                                      <bdt className="block-component">
                                                        <span
                                                          style={{
                                                            fontSize: 15,
                                                          }}
                                                        >
                                                          <span data-custom-class="body_text" />
                                                        </span>
                                                      </bdt>
                                                      <div
                                                        style={{
                                                          lineHeight: "1.5",
                                                        }}
                                                      >
                                                        <bdt className="block-component">
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <span data-custom-class="body_text" />
                                                          </span>
                                                        </bdt>
                                                      </div>
                                                      <ul>
                                                        <li
                                                          data-custom-class="body_text"
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <span data-custom-class="body_text">
                                                              <strong>
                                                                Other Users.
                                                              </strong>{" "}
                                                              When you share
                                                              personal
                                                              information
                                                              <bdt className="block-component" />{" "}
                                                              (for example, by
                                                              posting comments,
                                                              contributions, or
                                                              other content to
                                                              the Services)
                                                              <bdt className="statement-end-if-in-editor" />{" "}
                                                              or otherwise
                                                              interact with
                                                              public areas of
                                                              the Services, such
                                                              personal
                                                              information may be
                                                              viewed by all
                                                              users and may be
                                                              publicly made
                                                              available outside
                                                              the Services in
                                                              perpetuity.
                                                              <bdt className="block-component" />{" "}
                                                              Similarly, other
                                                              users will be able
                                                              to view
                                                              descriptions of
                                                              your activity,
                                                              communicate with
                                                              you within our
                                                              Services, and view
                                                              your profile.
                                                              <bdt className="statement-end-if-in-editor" />
                                                            </span>
                                                          </span>
                                                        </li>
                                                      </ul>
                                                      <div
                                                        style={{
                                                          lineHeight: "1.5",
                                                        }}
                                                      >
                                                        <bdt className="block-component">
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <span data-custom-class="body_text" />
                                                          </span>
                                                        </bdt>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <bdt className="block-component">
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text" />
                                                            </span>
                                                          </bdt>
                                                          <span
                                                            style={{
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              <span
                                                                style={{
                                                                  color:
                                                                    "rgb(89, 89, 89)",
                                                                }}
                                                              >
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <bdt className="block-component">
                                                                      <span data-custom-class="heading_1">
                                                                        <bdt className="block-component" />
                                                                      </span>
                                                                    </bdt>
                                                                  </span>
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          id="cookies"
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              color:
                                                                "rgb(127, 127, 127)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              <span
                                                                style={{
                                                                  fontSize: 15,
                                                                  color:
                                                                    "rgb(89, 89, 89)",
                                                                }}
                                                              >
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                  }}
                                                                >
                                                                  <span
                                                                    id="control"
                                                                    style={{
                                                                      color:
                                                                        "rgb(0, 0, 0)",
                                                                    }}
                                                                  >
                                                                    <strong>
                                                                      <span data-custom-class="heading_1">
                                                                        5. DO WE
                                                                        USE
                                                                        COOKIES
                                                                        AND
                                                                        OTHER
                                                                        TRACKING
                                                                        TECHNOLOGIES?
                                                                      </span>
                                                                    </strong>
                                                                  </span>
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <strong>
                                                                  <em>
                                                                    In Short:
                                                                  </em>
                                                                </strong>
                                                                <em>
                                                                  &nbsp;We may
                                                                  use cookies
                                                                  and other
                                                                  tracking
                                                                  technologies
                                                                  to collect and
                                                                  store your
                                                                  information.
                                                                </em>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                We may use
                                                                cookies and
                                                                similar tracking
                                                                technologies
                                                                (like web
                                                                beacons and
                                                                pixels) to
                                                                gather
                                                                information when
                                                                you interact
                                                                with our
                                                                Services. Some
                                                                online tracking
                                                                technologies
                                                                help us maintain
                                                                the security of
                                                                our Services
                                                                <bdt className="block-component" />{" "}
                                                                and your account
                                                                <bdt className="statement-end-if-in-editor" />
                                                                , prevent
                                                                crashes, fix
                                                                bugs, save your
                                                                preferences, and
                                                                assist with
                                                                basic site
                                                                functions.
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                We also permit
                                                                third parties
                                                                and service
                                                                providers to use
                                                                online tracking
                                                                technologies on
                                                                our Services for
                                                                analytics and
                                                                advertising,
                                                                including to
                                                                help manage and
                                                                display
                                                                advertisements,
                                                                to tailor
                                                                advertisements
                                                                to your
                                                                interests, or to
                                                                send abandoned
                                                                shopping cart
                                                                reminders
                                                                (depending on
                                                                your
                                                                communication
                                                                preferences).
                                                                The third
                                                                parties and
                                                                service
                                                                providers use
                                                                their technology
                                                                to provide
                                                                advertising
                                                                about products
                                                                and services
                                                                tailored to your
                                                                interests which
                                                                may appear
                                                                either on our
                                                                Services or on
                                                                other websites.
                                                              </span>
                                                            </span>
                                                          </span>
                                                          <bdt className="block-component">
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            />
                                                          </bdt>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <br />
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <span data-custom-class="body_text">
                                                              To the extent
                                                              these online
                                                              tracking
                                                              technologies are
                                                              deemed to be a{" "}
                                                              <bdt className="block-component" />
                                                              'sale'/'sharing'
                                                              <bdt className="else-block" />{" "}
                                                              (which includes
                                                              targeted
                                                              advertising, as
                                                              defined under the
                                                              applicable laws)
                                                              under applicable
                                                              US state laws, you
                                                              can opt out of
                                                              these online
                                                              tracking
                                                              technologies by
                                                              submitting a
                                                              request as
                                                              described below
                                                              under section{" "}
                                                              <bdt className="block-component" />
                                                              '
                                                              <bdt className="else-block" />
                                                            </span>
                                                          </span>
                                                          <span data-custom-class="body_text">
                                                            <a
                                                              data-custom-class="link"
                                                              href="#uslaws"
                                                            >
                                                              <span
                                                                style={{
                                                                  color:
                                                                    "rgb(0, 58, 250)",
                                                                  fontSize: 15,
                                                                }}
                                                              >
                                                                DO UNITED STATES
                                                                RESIDENTS HAVE
                                                                SPECIFIC PRIVACY
                                                                RIGHTS?
                                                              </span>
                                                            </a>
                                                          </span>
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <span data-custom-class="body_text">
                                                              <bdt className="block-component" />
                                                              '
                                                              <bdt className="else-block" />
                                                            </span>
                                                            <bdt className="statement-end-if-in-editor" />
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                Specific
                                                                information
                                                                about how we use
                                                                such
                                                                technologies and
                                                                how you can
                                                                refuse certain
                                                                cookies is set
                                                                out in our
                                                                Cookie Notice
                                                                <span
                                                                  style={{
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                    fontSize: 15,
                                                                  }}
                                                                >
                                                                  <span data-custom-class="body_text">
                                                                    <bdt className="block-component" />
                                                                    .
                                                                  </span>
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                          <bdt className="block-component">
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            />
                                                          </bdt>
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <span
                                                                  style={{
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                    fontSize: 15,
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                      fontSize: 15,
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                      }}
                                                                    >
                                                                      <span
                                                                        style={{
                                                                          color:
                                                                            "rgb(89, 89, 89)",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              <bdt className="statement-end-if-in-editor" />
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <bdt className="block-component" />
                                                          </span>
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <span
                                                                  style={{
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                    fontSize: 15,
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                      fontSize: 15,
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                        fontSize: 15,
                                                                      }}
                                                                    >
                                                                      <span
                                                                        style={{
                                                                          fontSize: 15,
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                color:
                                                                                  "rgb(89, 89, 89)",
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="body_text">
                                                                                <bdt className="block-component" />
                                                                              </span>
                                                                              <bdt className="block-component">
                                                                                <span data-custom-class="body_text">
                                                                                  <bdt className="block-component" />
                                                                                </span>
                                                                              </bdt>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          id="inforetain"
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              color:
                                                                "rgb(127, 127, 127)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              <span
                                                                style={{
                                                                  fontSize: 15,
                                                                  color:
                                                                    "rgb(89, 89, 89)",
                                                                }}
                                                              >
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                  }}
                                                                >
                                                                  <span
                                                                    id="control"
                                                                    style={{
                                                                      color:
                                                                        "rgb(0, 0, 0)",
                                                                    }}
                                                                  >
                                                                    <strong>
                                                                      <span data-custom-class="heading_1">
                                                                        6. HOW
                                                                        LONG DO
                                                                        WE KEEP
                                                                        YOUR
                                                                        INFORMATION?
                                                                      </span>
                                                                    </strong>
                                                                  </span>
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <strong>
                                                                  <em>
                                                                    In
                                                                    Short:&nbsp;
                                                                  </em>
                                                                </strong>
                                                                <em>
                                                                  We keep your
                                                                  information
                                                                  for as long as
                                                                  necessary to{" "}
                                                                  <bdt className="block-component" />
                                                                  fulfil
                                                                  <bdt className="else-block" />{" "}
                                                                  the purposes
                                                                  outlined in
                                                                  this Privacy
                                                                  Notice unless
                                                                  otherwise
                                                                  required by
                                                                  law.
                                                                </em>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                We will only
                                                                keep your
                                                                personal
                                                                information for
                                                                as long as it is
                                                                necessary for
                                                                the purposes set
                                                                out in this
                                                                Privacy Notice,
                                                                unless a longer
                                                                retention period
                                                                is required or
                                                                permitted by law
                                                                (such as tax,
                                                                accounting, or
                                                                other legal
                                                                requirements).
                                                                <bdt className="block-component" />{" "}
                                                                No purpose in
                                                                this notice will
                                                                require us
                                                                keeping your
                                                                personal
                                                                information for
                                                                longer than{" "}
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span data-custom-class="body_text">
                                                                      <bdt className="block-component" />
                                                                    </span>
                                                                  </span>
                                                                </span>
                                                                <bdt className="block-component" />
                                                                the period of
                                                                time in which
                                                                users have an
                                                                account with us
                                                                <bdt className="block-component" />
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span data-custom-class="body_text">
                                                                      <bdt className="else-block" />
                                                                    </span>
                                                                  </span>
                                                                </span>
                                                                .
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                When we have no
                                                                ongoing
                                                                legitimate
                                                                business need to
                                                                process your
                                                                personal
                                                                information, we
                                                                will either
                                                                delete or{" "}
                                                                <bdt className="block-component" />
                                                                anonymise
                                                                <bdt className="else-block" />{" "}
                                                                such
                                                                information, or,
                                                                if this is not
                                                                possible (for
                                                                example, because
                                                                your personal
                                                                information has
                                                                been stored in
                                                                backup
                                                                archives), then
                                                                we will securely
                                                                store your
                                                                personal
                                                                information and
                                                                isolate it from
                                                                any further
                                                                processing until
                                                                deletion is
                                                                possible.
                                                                <span
                                                                  style={{
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                  }}
                                                                >
                                                                  <bdt className="block-component" />
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          id="infosafe"
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              color:
                                                                "rgb(127, 127, 127)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              <span
                                                                style={{
                                                                  fontSize: 15,
                                                                  color:
                                                                    "rgb(89, 89, 89)",
                                                                }}
                                                              >
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                  }}
                                                                >
                                                                  <span
                                                                    id="control"
                                                                    style={{
                                                                      color:
                                                                        "rgb(0, 0, 0)",
                                                                    }}
                                                                  >
                                                                    <strong>
                                                                      <span data-custom-class="heading_1">
                                                                        7. HOW
                                                                        DO WE
                                                                        KEEP
                                                                        YOUR
                                                                        INFORMATION
                                                                        SAFE?
                                                                      </span>
                                                                    </strong>
                                                                  </span>
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <strong>
                                                                  <em>
                                                                    In
                                                                    Short:&nbsp;
                                                                  </em>
                                                                </strong>
                                                                <em>
                                                                  We aim to
                                                                  protect your
                                                                  personal
                                                                  information
                                                                  through a
                                                                  system of{" "}
                                                                  <bdt className="block-component" />
                                                                  organisational
                                                                  <bdt className="else-block" />{" "}
                                                                  and technical
                                                                  security
                                                                  measures.
                                                                </em>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                We have
                                                                implemented
                                                                appropriate and
                                                                reasonable
                                                                technical and{" "}
                                                                <bdt className="block-component" />
                                                                organisational
                                                                <bdt className="else-block" />{" "}
                                                                security
                                                                measures
                                                                designed to
                                                                protect the
                                                                security of any
                                                                personal
                                                                information we
                                                                process.
                                                                However, despite
                                                                our safeguards
                                                                and efforts to
                                                                secure your
                                                                information, no
                                                                electronic
                                                                transmission
                                                                over the
                                                                Internet or
                                                                information
                                                                storage
                                                                technology can
                                                                be guaranteed to
                                                                be 100% secure,
                                                                so we cannot
                                                                promise or
                                                                guarantee that
                                                                hackers,
                                                                cybercriminals,
                                                                or other{" "}
                                                                <bdt className="block-component" />
                                                                unauthorised
                                                                <bdt className="else-block" />{" "}
                                                                third parties
                                                                will not be able
                                                                to defeat our
                                                                security and
                                                                improperly
                                                                collect, access,
                                                                steal, or modify
                                                                your
                                                                information.
                                                                Although we will
                                                                do our best to
                                                                protect your
                                                                personal
                                                                information,
                                                                transmission of
                                                                personal
                                                                information to
                                                                and from our
                                                                Services is at
                                                                your own risk.
                                                                You should only
                                                                access the
                                                                Services within
                                                                a secure
                                                                environment.
                                                                <span
                                                                  style={{
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                  }}
                                                                >
                                                                  <bdt className="statement-end-if-in-editor" />
                                                                </span>
                                                                <span
                                                                  style={{
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                    fontSize: 15,
                                                                  }}
                                                                >
                                                                  <span data-custom-class="body_text">
                                                                    <bdt className="block-component" />
                                                                  </span>
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          id="infominors"
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              color:
                                                                "rgb(127, 127, 127)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              <span
                                                                style={{
                                                                  fontSize: 15,
                                                                  color:
                                                                    "rgb(89, 89, 89)",
                                                                }}
                                                              >
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                  }}
                                                                >
                                                                  <span
                                                                    id="control"
                                                                    style={{
                                                                      color:
                                                                        "rgb(0, 0, 0)",
                                                                    }}
                                                                  >
                                                                    <strong>
                                                                      <span data-custom-class="heading_1">
                                                                        8. DO WE
                                                                        COLLECT
                                                                        INFORMATION
                                                                        FROM
                                                                        MINORS?
                                                                      </span>
                                                                    </strong>
                                                                  </span>
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <strong>
                                                                  <em>
                                                                    In Short:
                                                                  </em>
                                                                </strong>
                                                                <em>
                                                                  &nbsp;We do
                                                                  not knowingly
                                                                  collect data
                                                                  from or market
                                                                  to{" "}
                                                                  <bdt className="block-component" />
                                                                  children under
                                                                  18 years of
                                                                  age
                                                                  <bdt className="else-block" />
                                                                  .
                                                                </em>
                                                                <bdt className="block-component" />
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                We do not
                                                                knowingly
                                                                collect, solicit
                                                                data from, or
                                                                market to
                                                                children under
                                                                18 years of age,
                                                                nor do we
                                                                knowingly sell
                                                                such personal
                                                                information. By
                                                                using the
                                                                Services, you
                                                                represent that
                                                                you are at least
                                                                18 or that you
                                                                are the parent
                                                                or guardian of
                                                                such a minor and
                                                                consent to such
                                                                minor
                                                                dependent’s use
                                                                of the Services.
                                                                If we learn that
                                                                personal
                                                                information from
                                                                users less than
                                                                18 years of age
                                                                has been
                                                                collected, we
                                                                will deactivate
                                                                the account and
                                                                take reasonable
                                                                measures to
                                                                promptly delete
                                                                such data from
                                                                our records. If
                                                                you become aware
                                                                of any data we
                                                                may have
                                                                collected from
                                                                children under
                                                                age 18, please
                                                                contact us at{" "}
                                                                <span
                                                                  style={{
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                    fontSize: 15,
                                                                  }}
                                                                >
                                                                  <span data-custom-class="body_text">
                                                                    <bdt className="block-component" />
                                                                    <bdt className="question">
                                                                      beachbunny@al-kaidy.de
                                                                    </bdt>
                                                                    <bdt className="else-block" />
                                                                  </span>
                                                                </span>
                                                                .
                                                              </span>
                                                              <span data-custom-class="body_text">
                                                                <bdt className="else-block">
                                                                  <bdt className="block-component" />
                                                                </bdt>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          id="privacyrights"
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              color:
                                                                "rgb(127, 127, 127)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              <span
                                                                style={{
                                                                  fontSize: 15,
                                                                  color:
                                                                    "rgb(89, 89, 89)",
                                                                }}
                                                              >
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                  }}
                                                                >
                                                                  <span
                                                                    id="control"
                                                                    style={{
                                                                      color:
                                                                        "rgb(0, 0, 0)",
                                                                    }}
                                                                  >
                                                                    <strong>
                                                                      <span data-custom-class="heading_1">
                                                                        9. WHAT
                                                                        ARE YOUR
                                                                        PRIVACY
                                                                        RIGHTS?
                                                                      </span>
                                                                    </strong>
                                                                  </span>
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <strong>
                                                                  <em>
                                                                    In Short:
                                                                  </em>
                                                                </strong>
                                                                <em>
                                                                  &nbsp;
                                                                  <span
                                                                    style={{
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        <em>
                                                                          <bdt className="block-component" />
                                                                        </em>
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                  <bdt className="block-component" />
                                                                  Depending on
                                                                  your state of
                                                                  residence in
                                                                  the US or in{" "}
                                                                  <bdt className="else-block" />
                                                                  some regions,
                                                                  such as{" "}
                                                                  <bdt className="block-component" />
                                                                  the European
                                                                  Economic Area
                                                                  (EEA), United
                                                                  Kingdom (UK),
                                                                  Switzerland,
                                                                  and Canada
                                                                  <bdt className="block-component" />
                                                                  , you have
                                                                  rights that
                                                                  allow you
                                                                  greater access
                                                                  to and control
                                                                  over your
                                                                  personal
                                                                  information.
                                                                  <span
                                                                    style={{
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        <em>
                                                                          <bdt className="statement-end-if-in-editor" />
                                                                        </em>
                                                                      </span>
                                                                    </span>
                                                                    &nbsp;
                                                                  </span>
                                                                  You may
                                                                  review,
                                                                  change, or
                                                                  terminate your
                                                                  account at any
                                                                  time,
                                                                  depending on
                                                                  your country,
                                                                  province, or
                                                                  state of
                                                                  residence.
                                                                </em>
                                                                <span
                                                                  style={{
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                    }}
                                                                  >
                                                                    <bdt className="block-component" />
                                                                  </span>
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                In some regions
                                                                (like{" "}
                                                                <bdt className="block-component" />
                                                                the EEA, UK,
                                                                Switzerland, and
                                                                Canada
                                                                <bdt className="block-component" />
                                                                ), you have
                                                                certain rights
                                                                under applicable
                                                                data protection
                                                                laws. These may
                                                                include the
                                                                right (i) to
                                                                request access
                                                                and obtain a
                                                                copy of your
                                                                personal
                                                                information,
                                                                (ii) to request
                                                                rectification or
                                                                erasure; (iii)
                                                                to restrict the
                                                                processing of
                                                                your personal
                                                                information;
                                                                (iv) if
                                                                applicable, to
                                                                data
                                                                portability; and
                                                                (v) not to be
                                                                subject to
                                                                automated
                                                                decision-making.
                                                                In certain
                                                                circumstances,
                                                                you may also
                                                                have the right
                                                                to object to the
                                                                processing of
                                                                your personal
                                                                information. You
                                                                can make such a
                                                                request by
                                                                contacting us by
                                                                using the
                                                                contact details
                                                                provided in the
                                                                section{" "}
                                                                <bdt className="block-component" />
                                                                '
                                                                <bdt className="else-block" />
                                                              </span>
                                                            </span>
                                                          </span>
                                                          <a
                                                            data-custom-class="link"
                                                            href="#contact"
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(0, 58, 250)",
                                                              }}
                                                            >
                                                              <span
                                                                style={{
                                                                  fontSize: 15,
                                                                  color:
                                                                    "rgb(0, 58, 250)",
                                                                }}
                                                              >
                                                                <span data-custom-class="body_text">
                                                                  HOW CAN YOU
                                                                  CONTACT US
                                                                  ABOUT THIS
                                                                  NOTICE?
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </a>
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <bdt className="block-component" />
                                                                '
                                                                <bdt className="else-block" />{" "}
                                                                below.
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                We will consider
                                                                and act upon any
                                                                request in
                                                                accordance with
                                                                applicable data
                                                                protection laws.
                                                                <bdt className="block-component" />
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            &nbsp;
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                If you are
                                                                located in the
                                                                EEA or UK and
                                                                you believe we
                                                                are unlawfully
                                                                processing your
                                                                personal
                                                                information, you
                                                                also have the
                                                                right to
                                                                complain to your{" "}
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      color:
                                                                        "rgb(0, 58, 250)",
                                                                    }}
                                                                  >
                                                                    <span data-custom-class="body_text">
                                                                      <span
                                                                        style={{
                                                                          color:
                                                                            "rgb(0, 58, 250)",
                                                                        }}
                                                                      >
                                                                        <span data-custom-class="body_text">
                                                                          <a
                                                                            data-custom-class="link"
                                                                            href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
                                                                            rel="noopener noreferrer"
                                                                            target="_blank"
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              Member
                                                                              State
                                                                              data
                                                                              protection
                                                                              authority
                                                                            </span>
                                                                          </a>
                                                                        </span>
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </span>{" "}
                                                                or&nbsp;
                                                              </span>
                                                            </span>
                                                          </span>
                                                          <a
                                                            data-custom-class="link"
                                                            href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/"
                                                            rel="noopener noreferrer"
                                                            target="_blank"
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(0, 58, 250)",
                                                              }}
                                                            >
                                                              <span
                                                                style={{
                                                                  fontSize: 15,
                                                                  color:
                                                                    "rgb(0, 58, 250)",
                                                                }}
                                                              >
                                                                <span data-custom-class="body_text">
                                                                  UK data
                                                                  protection
                                                                  authority
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </a>
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                .
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                If you are
                                                                located in
                                                                Switzerland, you
                                                                may contact the{" "}
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      color:
                                                                        "rgb(0, 58, 250)",
                                                                    }}
                                                                  >
                                                                    <span data-custom-class="body_text">
                                                                      <span
                                                                        style={{
                                                                          color:
                                                                            "rgb(0, 58, 250)",
                                                                        }}
                                                                      >
                                                                        <span data-custom-class="body_text">
                                                                          <span
                                                                            style={{
                                                                              color:
                                                                                "rgb(0, 58, 250)",
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <a
                                                                              data-custom-class="link"
                                                                              href="https://www.edoeb.admin.ch/edoeb/en/home.html"
                                                                              rel="noopener noreferrer"
                                                                              target="_blank"
                                                                            >
                                                                              Federal
                                                                              Data
                                                                              Protection
                                                                              and
                                                                              Information
                                                                              Commissioner
                                                                            </a>
                                                                          </span>
                                                                        </span>
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </span>
                                                                .
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          id="withdrawconsent"
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <strong>
                                                                  <u>
                                                                    Withdrawing
                                                                    your
                                                                    consent:
                                                                  </u>
                                                                </strong>{" "}
                                                                If we are
                                                                relying on your
                                                                consent to
                                                                process your
                                                                personal
                                                                information,
                                                                <bdt className="block-component" />{" "}
                                                                which may be
                                                                express and/or
                                                                implied consent
                                                                depending on the
                                                                applicable law,
                                                                <bdt className="statement-end-if-in-editor" />{" "}
                                                                you have the
                                                                right to
                                                                withdraw your
                                                                consent at any
                                                                time. You can
                                                                withdraw your
                                                                consent at any
                                                                time by
                                                                contacting us by
                                                                using the
                                                                contact details
                                                                provided in the
                                                                section{" "}
                                                                <bdt className="block-component" />
                                                                '
                                                                <bdt className="else-block" />
                                                              </span>
                                                            </span>
                                                          </span>
                                                          <a
                                                            data-custom-class="link"
                                                            href="#contact"
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(0, 58, 250)",
                                                              }}
                                                            >
                                                              <span
                                                                style={{
                                                                  fontSize: 15,
                                                                  color:
                                                                    "rgb(0, 58, 250)",
                                                                }}
                                                              >
                                                                <span data-custom-class="body_text">
                                                                  HOW CAN YOU
                                                                  CONTACT US
                                                                  ABOUT THIS
                                                                  NOTICE?
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </a>
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <bdt className="block-component" />
                                                                '
                                                                <bdt className="else-block" />{" "}
                                                                below
                                                                <bdt className="block-component" />{" "}
                                                                or updating your
                                                                preferences
                                                                <bdt className="statement-end-if-in-editor" />
                                                                .
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <span data-custom-class="body_text">
                                                              However, please
                                                              note that this
                                                              will not affect
                                                              the lawfulness of
                                                              the processing
                                                              before its
                                                              withdrawal nor,
                                                              <bdt className="block-component" />{" "}
                                                              when applicable
                                                              law allows,
                                                              <bdt className="statement-end-if-in-editor" />{" "}
                                                              will it affect the
                                                              processing of your
                                                              personal
                                                              information
                                                              conducted in
                                                              reliance on lawful
                                                              processing grounds
                                                              other than
                                                              consent.
                                                              <bdt className="block-component" />
                                                            </span>
                                                          </span>
                                                          <bdt className="block-component">
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text" />
                                                            </span>
                                                          </bdt>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <span data-custom-class="heading_2">
                                                              <strong>
                                                                Account
                                                                Information
                                                              </strong>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span data-custom-class="body_text">
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              If you would at
                                                              any time like to
                                                              review or change
                                                              the information in
                                                              your account or
                                                              terminate your
                                                              account, you can:
                                                              <bdt className="forloop-component" />
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <ul>
                                                          <li
                                                            data-custom-class="body_text"
                                                            style={{
                                                              lineHeight: "1.5",
                                                            }}
                                                          >
                                                            <span data-custom-class="body_text">
                                                              <span
                                                                style={{
                                                                  fontSize: 15,
                                                                }}
                                                              >
                                                                <bdt className="question">
                                                                  Log in to your
                                                                  account
                                                                  settings and
                                                                  update your
                                                                  user account.
                                                                </bdt>
                                                              </span>
                                                            </span>
                                                          </li>
                                                        </ul>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span data-custom-class="body_text">
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              <bdt className="forloop-component" />
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <span data-custom-class="body_text">
                                                              Upon your request
                                                              to terminate your
                                                              account, we will
                                                              deactivate or
                                                              delete your
                                                              account and
                                                              information from
                                                              our active
                                                              databases.
                                                              However, we may
                                                              retain some
                                                              information in our
                                                              files to prevent
                                                              fraud,
                                                              troubleshoot
                                                              problems, assist
                                                              with any
                                                              investigations,
                                                              enforce our legal
                                                              terms and/or
                                                              comply with
                                                              applicable legal
                                                              requirements.
                                                            </span>
                                                          </span>
                                                          <bdt className="statement-end-if-in-editor">
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text" />
                                                            </span>
                                                          </bdt>
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                      }}
                                                                    >
                                                                      <span
                                                                        style={{
                                                                          color:
                                                                            "rgb(89, 89, 89)",
                                                                        }}
                                                                      >
                                                                        <span data-custom-class="body_text">
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                color:
                                                                                  "rgb(89, 89, 89)",
                                                                              }}
                                                                            >
                                                                              <bdt className="block-component" />
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <strong>
                                                                  <u>
                                                                    Cookies and
                                                                    similar
                                                                    technologies:
                                                                  </u>
                                                                </strong>{" "}
                                                                Most Web
                                                                browsers are set
                                                                to accept
                                                                cookies by
                                                                default. If you
                                                                prefer, you can
                                                                usually choose
                                                                to set your
                                                                browser to
                                                                remove cookies
                                                                and to reject
                                                                cookies. If you
                                                                choose to remove
                                                                cookies or
                                                                reject cookies,
                                                                this could
                                                                affect certain
                                                                features or
                                                                services of our
                                                                Services.{" "}
                                                                <bdt className="block-component">
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        <bdt className="block-component" />
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              <span
                                                                                style={{
                                                                                  color:
                                                                                    "rgb(89, 89, 89)",
                                                                                }}
                                                                              >
                                                                                <span
                                                                                  style={{
                                                                                    fontSize: 15,
                                                                                  }}
                                                                                >
                                                                                  <span
                                                                                    style={{
                                                                                      color:
                                                                                        "rgb(89, 89, 89)",
                                                                                    }}
                                                                                  >
                                                                                    <bdt className="statement-end-if-in-editor" />
                                                                                  </span>
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </bdt>
                                                              </span>
                                                            </span>
                                                          </span>
                                                          <bdt className="block-component">
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text" />
                                                            </span>
                                                          </bdt>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span data-custom-class="body_text">
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              If you have
                                                              questions or
                                                              comments about
                                                              your privacy
                                                              rights, you may
                                                              email us at{" "}
                                                              <bdt className="question">
                                                                beachbunny@al-kaidy.de
                                                              </bdt>
                                                              .
                                                            </span>
                                                          </span>
                                                          <bdt className="statement-end-if-in-editor">
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text" />
                                                            </span>
                                                          </bdt>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          id="DNT"
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              color:
                                                                "rgb(127, 127, 127)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              <span
                                                                style={{
                                                                  fontSize: 15,
                                                                  color:
                                                                    "rgb(89, 89, 89)",
                                                                }}
                                                              >
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                  }}
                                                                >
                                                                  <span
                                                                    id="control"
                                                                    style={{
                                                                      color:
                                                                        "rgb(0, 0, 0)",
                                                                    }}
                                                                  >
                                                                    <strong>
                                                                      <span data-custom-class="heading_1">
                                                                        10.
                                                                        CONTROLS
                                                                        FOR
                                                                        DO-NOT-TRACK
                                                                        FEATURES
                                                                      </span>
                                                                    </strong>
                                                                  </span>
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                Most web
                                                                browsers and
                                                                some mobile
                                                                operating
                                                                systems and
                                                                mobile
                                                                applications
                                                                include a
                                                                Do-Not-Track (
                                                                <bdt className="block-component" />
                                                                'DNT'
                                                                <bdt className="else-block" />
                                                                ) feature or
                                                                setting you can
                                                                activate to
                                                                signal your
                                                                privacy
                                                                preference not
                                                                to have data
                                                                about your
                                                                online browsing
                                                                activities
                                                                monitored and
                                                                collected. At
                                                                this stage, no
                                                                uniform
                                                                technology
                                                                standard for{" "}
                                                                <bdt className="block-component" />
                                                                recognising
                                                                <bdt className="else-block" />{" "}
                                                                and implementing
                                                                DNT signals has
                                                                been{" "}
                                                                <bdt className="block-component" />
                                                                finalised
                                                                <bdt className="else-block" />
                                                                . As such, we do
                                                                not currently
                                                                respond to DNT
                                                                browser signals
                                                                or any other
                                                                mechanism that
                                                                automatically
                                                                communicates
                                                                your choice not
                                                                to be tracked
                                                                online. If a
                                                                standard for
                                                                online tracking
                                                                is adopted that
                                                                we must follow
                                                                in the future,
                                                                we will inform
                                                                you about that
                                                                practice in a
                                                                revised version
                                                                of this Privacy
                                                                Notice.
                                                              </span>
                                                            </span>
                                                          </span>
                                                          <bdt className="block-component">
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            />
                                                          </bdt>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <br />
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <span data-custom-class="body_text">
                                                              California law
                                                              requires us to let
                                                              you know how we
                                                              respond to web
                                                              browser DNT
                                                              signals. Because
                                                              there currently is
                                                              not an industry or
                                                              legal standard for{" "}
                                                              <bdt className="block-component" />
                                                              recognising
                                                              <bdt className="else-block" />{" "}
                                                              or{" "}
                                                              <bdt className="block-component" />
                                                              honouring
                                                              <bdt className="else-block" />{" "}
                                                              DNT signals, we do
                                                              not respond to
                                                              them at this time.
                                                            </span>
                                                          </span>
                                                          <bdt className="statement-end-if-in-editor">
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            />
                                                          </bdt>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <bdt className="block-component" />
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          id="uslaws"
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              color:
                                                                "rgb(127, 127, 127)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              <span
                                                                style={{
                                                                  fontSize: 15,
                                                                  color:
                                                                    "rgb(89, 89, 89)",
                                                                }}
                                                              >
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                  }}
                                                                >
                                                                  <span
                                                                    id="control"
                                                                    style={{
                                                                      color:
                                                                        "rgb(0, 0, 0)",
                                                                    }}
                                                                  >
                                                                    <strong>
                                                                      <span data-custom-class="heading_1">
                                                                        11. DO
                                                                        UNITED
                                                                        STATES
                                                                        RESIDENTS
                                                                        HAVE
                                                                        SPECIFIC
                                                                        PRIVACY
                                                                        RIGHTS?
                                                                      </span>
                                                                    </strong>
                                                                  </span>
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <strong>
                                                                  <em>
                                                                    In
                                                                    Short:&nbsp;
                                                                  </em>
                                                                </strong>
                                                                <em>
                                                                  If you are a
                                                                  resident of
                                                                  <bdt className="block-component" />{" "}
                                                                  California,
                                                                  Colorado,
                                                                  Connecticut,
                                                                  Delaware,
                                                                  Florida,
                                                                  Indiana, Iowa,
                                                                  Kentucky,
                                                                  Montana, New
                                                                  Hampshire, New
                                                                  Jersey,
                                                                  Oregon,
                                                                  Tennessee,
                                                                  Texas, Utah,
                                                                  or Virginia
                                                                  <bdt className="else-block" />
                                                                  , you may have
                                                                  the right to
                                                                  request access
                                                                  to and receive
                                                                  details about
                                                                  the personal
                                                                  information we
                                                                  maintain about
                                                                  you and how we
                                                                  have processed
                                                                  it, correct
                                                                  inaccuracies,
                                                                  get a copy of,
                                                                  or delete your
                                                                  personal
                                                                  information.
                                                                  You may also
                                                                  have the right
                                                                  to withdraw
                                                                  your consent
                                                                  to our
                                                                  processing of
                                                                  your personal
                                                                  information.
                                                                  These rights
                                                                  may be limited
                                                                  in some
                                                                  circumstances
                                                                  by applicable
                                                                  law. More
                                                                  information is
                                                                  provided
                                                                  below.
                                                                </em>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <strong>
                                                                <span data-custom-class="heading_2">
                                                                  Categories of
                                                                  Personal
                                                                  Information We
                                                                  Collect
                                                                </span>
                                                              </strong>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                              color:
                                                                "rgb(89, 89, 89)",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                                color:
                                                                  "rgb(89, 89, 89)",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                We have
                                                                collected the
                                                                following
                                                                categories of
                                                                personal
                                                                information in
                                                                the past twelve
                                                                (12) months:
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <table
                                                          style={{
                                                            width: "100%",
                                                          }}
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "33.8274%",
                                                                  borderLeft:
                                                                    "1px solid black",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span data-custom-class="body_text">
                                                                      <strong>
                                                                        Category
                                                                      </strong>
                                                                    </span>
                                                                  </span>
                                                                </span>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "51.4385%",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span data-custom-class="body_text">
                                                                      <strong>
                                                                        Examples
                                                                      </strong>
                                                                    </span>
                                                                  </span>
                                                                </span>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "14.9084%",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                  textAlign:
                                                                    "center",
                                                                }}
                                                              >
                                                                <span
                                                                  style={{
                                                                    fontSize: 15,
                                                                    color:
                                                                      "rgb(89, 89, 89)",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span data-custom-class="body_text">
                                                                      <strong>
                                                                        Collected
                                                                      </strong>
                                                                    </span>
                                                                  </span>
                                                                </span>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "33.8274%",
                                                                  borderLeft:
                                                                    "1px solid black",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        A.
                                                                        Identifiers
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "51.4385%",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        Contact
                                                                        details,
                                                                        such as
                                                                        real
                                                                        name,
                                                                        alias,
                                                                        postal
                                                                        address,
                                                                        telephone
                                                                        or
                                                                        mobile
                                                                        contact
                                                                        number,
                                                                        unique
                                                                        personal
                                                                        identifier,
                                                                        online
                                                                        identifier,
                                                                        Internet
                                                                        Protocol
                                                                        address,
                                                                        email
                                                                        address,
                                                                        and
                                                                        account
                                                                        name
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "14.9084%",
                                                                  textAlign:
                                                                    "center",
                                                                  verticalAlign:
                                                                    "middle",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        <bdt className="block-component">
                                                                          <bdt className="block-component" />
                                                                        </bdt>
                                                                        YES
                                                                        <bdt className="else-block">
                                                                          <bdt className="block-component" />
                                                                        </bdt>
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <bdt className="block-component" />
                                                        </div>
                                                        <table
                                                          style={{
                                                            width: "100%",
                                                          }}
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "33.8274%",
                                                                  borderLeft:
                                                                    "1px solid black",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        B.
                                                                        Personal
                                                                        information
                                                                        as
                                                                        defined
                                                                        in the
                                                                        California
                                                                        Customer
                                                                        Records
                                                                        statute
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "51.4385%",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        Name,
                                                                        contact
                                                                        information,
                                                                        education,
                                                                        employment,
                                                                        employment
                                                                        history,
                                                                        and
                                                                        financial
                                                                        information
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "14.9084%",
                                                                  textAlign:
                                                                    "center",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        <bdt className="forloop-component">
                                                                          <bdt className="block-component">
                                                                            <bdt className="block-component" />
                                                                            YES
                                                                            <bdt className="block-component" />
                                                                          </bdt>
                                                                        </bdt>
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <bdt className="block-component" />
                                                        </div>
                                                        <table
                                                          style={{
                                                            width: "100%",
                                                          }}
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "33.8274%",
                                                                  borderLeft:
                                                                    "1px solid black",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        <bdt className="block-component" />
                                                                        C
                                                                        <bdt className="else-block" />
                                                                        .
                                                                        Protected
                                                                        classification
                                                                        characteristics
                                                                        under
                                                                        state or
                                                                        federal
                                                                        law
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "51.4385%",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        Gender,
                                                                        age,
                                                                        date of
                                                                        birth,
                                                                        race and
                                                                        ethnicity,
                                                                        national
                                                                        origin,
                                                                        marital
                                                                        status,
                                                                        and
                                                                        other
                                                                        demographic
                                                                        data
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "14.9084%",
                                                                  textAlign:
                                                                    "center",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                                <div
                                                                  data-custom-class="body_text"
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <bdt className="forloop-component">
                                                                    <span data-custom-class="body_text">
                                                                      <bdt className="block-component" />
                                                                      <bdt className="block-component" />
                                                                      YES
                                                                      <bdt className="else-block" />
                                                                      <bdt className="block-component" />
                                                                    </span>
                                                                  </bdt>
                                                                </div>
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "33.8274%",
                                                                  borderLeft:
                                                                    "1px solid black",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        <bdt className="block-component" />
                                                                        D
                                                                        <bdt className="else-block" />
                                                                        .
                                                                        Commercial
                                                                        information
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "51.4385%",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        Transaction
                                                                        information,
                                                                        purchase
                                                                        history,
                                                                        financial
                                                                        details,
                                                                        and
                                                                        payment
                                                                        information
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "14.9084%",
                                                                  textAlign:
                                                                    "center",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                                <div
                                                                  data-custom-class="body_text"
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <bdt className="forloop-component">
                                                                    <span data-custom-class="body_text">
                                                                      <bdt className="block-component" />
                                                                      <bdt className="block-component" />
                                                                      YES
                                                                      <bdt className="else-block">
                                                                        <bdt className="block-component" />
                                                                      </bdt>
                                                                    </span>
                                                                  </bdt>
                                                                </div>
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "33.8274%",
                                                                  borderLeft:
                                                                    "1px solid black",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        <bdt className="block-component" />
                                                                        E
                                                                        <bdt className="else-block" />
                                                                        .
                                                                        Biometric
                                                                        information
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "51.4385%",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        Fingerprints
                                                                        and
                                                                        voiceprints
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "14.9084%",
                                                                  textAlign:
                                                                    "center",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                                <div
                                                                  data-custom-class="body_text"
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <bdt className="forloop-component">
                                                                    <span data-custom-class="body_text">
                                                                      <bdt className="block-component">
                                                                        <bdt className="block-component">
                                                                          NO
                                                                        </bdt>
                                                                        <bdt className="statement-end-if-in-editor" />
                                                                        <bdt className="block-component" />
                                                                      </bdt>
                                                                    </span>
                                                                  </bdt>
                                                                </div>
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "33.8274%",
                                                                  borderLeft:
                                                                    "1px solid black",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        <bdt className="block-component" />
                                                                        F
                                                                        <bdt className="else-block" />
                                                                        .
                                                                        Internet
                                                                        or other
                                                                        similar
                                                                        network
                                                                        activity
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "51.4385%",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        Browsing
                                                                        history,
                                                                        search
                                                                        history,
                                                                        online{" "}
                                                                        <bdt className="block-component" />
                                                                        behaviour
                                                                        <bdt className="else-block" />
                                                                        ,
                                                                        interest
                                                                        data,
                                                                        and
                                                                        interactions
                                                                        with our
                                                                        and
                                                                        other
                                                                        websites,
                                                                        applications,
                                                                        systems,
                                                                        and
                                                                        advertisements
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "14.9084%",
                                                                  textAlign:
                                                                    "center",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                                <div
                                                                  data-custom-class="body_text"
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <bdt className="forloop-component">
                                                                    <span data-custom-class="body_text">
                                                                      <bdt className="block-component" />
                                                                      <bdt className="block-component" />
                                                                      NO
                                                                      <bdt className="statement-end-if-in-editor" />
                                                                      <bdt className="block-component" />
                                                                    </span>
                                                                  </bdt>
                                                                </div>
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "33.8274%",
                                                                  borderLeft:
                                                                    "1px solid black",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        <bdt className="block-component" />
                                                                        G
                                                                        <bdt className="else-block" />
                                                                        .
                                                                        Geolocation
                                                                        data
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "51.4385%",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        Device
                                                                        location
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "14.9084%",
                                                                  textAlign:
                                                                    "center",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                                <div
                                                                  data-custom-class="body_text"
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <bdt className="forloop-component">
                                                                    <span data-custom-class="body_text">
                                                                      <bdt className="block-component" />
                                                                      <bdt className="block-component" />
                                                                      YES
                                                                      <bdt className="else-block" />
                                                                      <bdt className="block-component" />
                                                                    </span>
                                                                  </bdt>
                                                                </div>
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "33.8274%",
                                                                  borderLeft:
                                                                    "1px solid black",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        <bdt className="block-component" />
                                                                        H
                                                                        <bdt className="else-block" />
                                                                        . Audio,
                                                                        electronic,
                                                                        sensory,
                                                                        or
                                                                        similar
                                                                        information
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "51.4385%",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        Images
                                                                        and
                                                                        audio,
                                                                        video or
                                                                        call
                                                                        recordings
                                                                        created
                                                                        in
                                                                        connection
                                                                        with our
                                                                        business
                                                                        activities
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "14.9084%",
                                                                  textAlign:
                                                                    "center",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                                <div
                                                                  data-custom-class="body_text"
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <bdt className="forloop-component">
                                                                    <span data-custom-class="body_text">
                                                                      <bdt className="block-component" />
                                                                      <bdt className="block-component" />
                                                                      NO
                                                                      <bdt className="statement-end-if-in-editor" />
                                                                      <bdt className="block-component" />
                                                                    </span>
                                                                  </bdt>
                                                                </div>
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "33.8274%",
                                                                  borderLeft:
                                                                    "1px solid black",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        <bdt className="block-component" />
                                                                        I
                                                                        <bdt className="else-block" />
                                                                        .
                                                                        Professional
                                                                        or
                                                                        employment-related
                                                                        information
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "51.4385%",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        Business
                                                                        contact
                                                                        details
                                                                        in order
                                                                        to
                                                                        provide
                                                                        you our
                                                                        Services
                                                                        at a
                                                                        business
                                                                        level or
                                                                        job
                                                                        title,
                                                                        work
                                                                        history,
                                                                        and
                                                                        professional
                                                                        qualifications
                                                                        if you
                                                                        apply
                                                                        for a
                                                                        job with
                                                                        us
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "14.9084%",
                                                                  textAlign:
                                                                    "center",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                                <div
                                                                  data-custom-class="body_text"
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <bdt className="forloop-component">
                                                                    <span data-custom-class="body_text">
                                                                      <bdt className="block-component" />
                                                                      <bdt className="block-component" />
                                                                      NO
                                                                      <bdt className="statement-end-if-in-editor" />
                                                                      <bdt className="block-component" />
                                                                    </span>
                                                                  </bdt>
                                                                </div>
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  borderLeft:
                                                                    "1px solid black",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                  width:
                                                                    "33.8274%",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        <bdt className="block-component" />
                                                                        J
                                                                        <bdt className="else-block" />
                                                                        .
                                                                        Education
                                                                        Information
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                  width:
                                                                    "51.4385%",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        Student
                                                                        records
                                                                        and
                                                                        directory
                                                                        information
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  textAlign:
                                                                    "center",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                  width:
                                                                    "14.9084%",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                                <div
                                                                  data-custom-class="body_text"
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <bdt className="forloop-component">
                                                                    <span data-custom-class="body_text">
                                                                      <bdt className="block-component" />
                                                                      <bdt className="block-component" />
                                                                      NO
                                                                      <bdt className="statement-end-if-in-editor" />
                                                                      <bdt className="block-component" />
                                                                    </span>
                                                                  </bdt>
                                                                </div>
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  borderWidth: 1,
                                                                  borderColor:
                                                                    "black",
                                                                  borderStyle:
                                                                    "solid",
                                                                  width:
                                                                    "33.8274%",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        <bdt className="block-component" />
                                                                        K
                                                                        <bdt className="else-block" />
                                                                        .
                                                                        Inferences
                                                                        drawn
                                                                        from
                                                                        collected
                                                                        personal
                                                                        information
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  borderBottom:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  width:
                                                                    "51.4385%",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      fontSize: 15,
                                                                      color:
                                                                        "rgb(89, 89, 89)",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        Inferences
                                                                        drawn
                                                                        from any
                                                                        of the
                                                                        collected
                                                                        personal
                                                                        information
                                                                        listed
                                                                        above to
                                                                        create a
                                                                        profile
                                                                        or
                                                                        summary
                                                                        about,
                                                                        for
                                                                        example,
                                                                        an
                                                                        individual’s
                                                                        preferences
                                                                        and
                                                                        characteristics
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  textAlign:
                                                                    "center",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderBottom:
                                                                    "1px solid black",
                                                                  borderTop:
                                                                    "1px solid black",
                                                                  width:
                                                                    "14.9084%",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                                <div
                                                                  data-custom-class="body_text"
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span data-custom-class="body_text">
                                                                    <bdt className="block-component" />
                                                                    NO
                                                                    <span
                                                                      style={{
                                                                        fontSize: 15,
                                                                        color:
                                                                          "rgb(89, 89, 89)",
                                                                      }}
                                                                    >
                                                                      <span
                                                                        style={{
                                                                          fontSize: 15,
                                                                          color:
                                                                            "rgb(89, 89, 89)",
                                                                        }}
                                                                      >
                                                                        <span data-custom-class="body_text">
                                                                          <span
                                                                            style={{
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              <bdt className="statement-end-if-in-editor" />
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  borderLeft:
                                                                    "1px solid black",
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderBottom:
                                                                    "1px solid black",
                                                                  lineHeight:
                                                                    "1.5",
                                                                }}
                                                              >
                                                                <span data-custom-class="body_text">
                                                                  <bdt className="block-component" />
                                                                  L
                                                                  <bdt className="else-block" />
                                                                  . Sensitive
                                                                  personal
                                                                  Information
                                                                </span>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderBottom:
                                                                    "1px solid black",
                                                                  lineHeight:
                                                                    "1.5",
                                                                }}
                                                              >
                                                                <bdt className="block-component">
                                                                  <span data-custom-class="body_text" />
                                                                </bdt>
                                                              </td>
                                                              <td
                                                                style={{
                                                                  borderRight:
                                                                    "1px solid black",
                                                                  borderBottom:
                                                                    "1px solid black",
                                                                }}
                                                              >
                                                                <div
                                                                  data-empty="true"
                                                                  style={{
                                                                    textAlign:
                                                                      "center",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                                <div
                                                                  data-custom-class="body_text"
                                                                  data-empty="true"
                                                                  style={{
                                                                    textAlign:
                                                                      "center",
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <bdt className="block-component">
                                                                    <span data-custom-class="body_text" />
                                                                  </bdt>
                                                                  NO
                                                                  <bdt className="statement-end-if-in-editor">
                                                                    <span data-custom-class="body_text" />
                                                                  </bdt>
                                                                </div>
                                                                <div
                                                                  data-empty="true"
                                                                  style={{
                                                                    textAlign:
                                                                      "center",
                                                                  }}
                                                                >
                                                                  <br />
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <bdt className="block-component">
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            />
                                                          </bdt>
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <br />
                                                        </div>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <span data-custom-class="body_text">
                                                              We may also
                                                              collect other
                                                              personal
                                                              information
                                                              outside of these
                                                              categories through
                                                              instances where
                                                              you interact with
                                                              us in person,
                                                              online, or by
                                                              phone or mail in
                                                              the context of:
                                                            </span>
                                                            <bdt className="block-component" />
                                                          </span>
                                                        </div>
                                                        <ul>
                                                          <li
                                                            data-custom-class="body_text"
                                                            style={{
                                                              lineHeight: "1.5",
                                                            }}
                                                          >
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              Receiving help
                                                              through our
                                                              customer support
                                                              channels;
                                                              <bdt className="statement-end-if-in-editor" />
                                                            </span>
                                                          </li>
                                                        </ul>
                                                        <div>
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <bdt className="block-component" />
                                                          </span>
                                                        </div>
                                                        <ul>
                                                          <li data-custom-class="body_text">
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              Participation in
                                                              customer surveys
                                                              or contests; and
                                                              <bdt className="statement-end-if-in-editor" />
                                                            </span>
                                                          </li>
                                                        </ul>
                                                        <div>
                                                          <span
                                                            style={{
                                                              fontSize: 15,
                                                            }}
                                                          >
                                                            <bdt className="block-component" />
                                                          </span>
                                                        </div>
                                                        <ul>
                                                          <li data-custom-class="body_text">
                                                            <span
                                                              style={{
                                                                fontSize: 15,
                                                              }}
                                                            >
                                                              Facilitation in
                                                              the delivery of
                                                              our Services and
                                                              to respond to your
                                                              inquiries.
                                                            </span>
                                                            <bdt className="statement-end-if-in-editor">
                                                              <span
                                                                style={{
                                                                  fontSize: 15,
                                                                }}
                                                              />
                                                            </bdt>
                                                          </li>
                                                        </ul>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <bdt className="block-component">
                                                            <span data-custom-class="body_text" />
                                                          </bdt>
                                                          <span data-custom-class="body_text">
                                                            We will use and
                                                            retain the collected
                                                            personal information
                                                            as needed to provide
                                                            the Services or for:
                                                            <bdt className="block-component" />
                                                          </span>
                                                        </div>
                                                        <ul>
                                                          <li
                                                            data-custom-class="body_text"
                                                            style={{
                                                              lineHeight: "1.5",
                                                            }}
                                                          >
                                                            <span data-custom-class="body_text">
                                                              Category A -{" "}
                                                              <bdt className="question">
                                                                As long as the
                                                                user has an
                                                                account with us
                                                              </bdt>
                                                              <bdt className="statement-end-if-in-editor" />
                                                            </span>
                                                          </li>
                                                        </ul>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span data-custom-class="body_text">
                                                            <bdt className="block-component">
                                                              <bdt className="block-component" />
                                                            </bdt>
                                                          </span>
                                                        </div>
                                                        <ul>
                                                          <li
                                                            data-custom-class="body_text"
                                                            style={{
                                                              lineHeight: "1.5",
                                                            }}
                                                          >
                                                            <span data-custom-class="body_text">
                                                              Category B -{" "}
                                                              <bdt className="question">
                                                                As long as the
                                                                user has an
                                                                account with us
                                                              </bdt>
                                                              <bdt className="statement-end-if-in-editor" />
                                                            </span>
                                                          </li>
                                                        </ul>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span data-custom-class="body_text">
                                                            <bdt className="block-component" />
                                                          </span>
                                                        </div>
                                                        <ul>
                                                          <li
                                                            data-custom-class="body_text"
                                                            style={{
                                                              lineHeight: "1.5",
                                                            }}
                                                          >
                                                            <span data-custom-class="body_text">
                                                              Category{" "}
                                                              <bdt className="block-component" />
                                                              C
                                                              <bdt className="else-block" />{" "}
                                                              -{" "}
                                                              <bdt className="question">
                                                                As long as the
                                                                user has an
                                                                account with us
                                                              </bdt>
                                                              <bdt className="statement-end-if-in-editor" />
                                                            </span>
                                                          </li>
                                                        </ul>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span data-custom-class="body_text">
                                                            <bdt className="block-component" />
                                                          </span>
                                                        </div>
                                                        <ul>
                                                          <li
                                                            data-custom-class="body_text"
                                                            style={{
                                                              lineHeight: "1.5",
                                                            }}
                                                          >
                                                            <span data-custom-class="body_text">
                                                              Category{" "}
                                                              <bdt className="block-component" />
                                                              D
                                                              <bdt className="else-block" />{" "}
                                                              -{" "}
                                                              <bdt className="question">
                                                                As long as the
                                                                user has an
                                                                account with us
                                                              </bdt>
                                                              <bdt className="statement-end-if-in-editor" />
                                                            </span>
                                                          </li>
                                                        </ul>
                                                        <div
                                                          style={{
                                                            lineHeight: "1.5",
                                                          }}
                                                        >
                                                          <span data-custom-class="body_text">
                                                            <bdt className="block-component" />
                                                          </span>
                                                          <div
                                                            style={{
                                                              lineHeight: "1.5",
                                                            }}
                                                          >
                                                            <span data-custom-class="body_text">
                                                              <bdt className="block-component" />
                                                            </span>
                                                            <div
                                                              style={{
                                                                lineHeight:
                                                                  "1.5",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <bdt className="block-component" />
                                                              </span>
                                                            </div>
                                                            <ul>
                                                              <li
                                                                data-custom-class="body_text"
                                                                style={{
                                                                  lineHeight:
                                                                    "1.5",
                                                                }}
                                                              >
                                                                <span data-custom-class="body_text">
                                                                  Category{" "}
                                                                  <bdt className="block-component" />
                                                                  G
                                                                  <bdt className="else-block" />{" "}
                                                                  -{" "}
                                                                  <bdt className="question">
                                                                    As long as
                                                                    the user has
                                                                    an account
                                                                    with us
                                                                  </bdt>
                                                                  <bdt className="statement-end-if-in-editor" />
                                                                </span>
                                                              </li>
                                                            </ul>
                                                            <div
                                                              style={{
                                                                lineHeight:
                                                                  "1.5",
                                                              }}
                                                            >
                                                              <span data-custom-class="body_text">
                                                                <bdt className="block-component" />
                                                              </span>
                                                              <div
                                                                style={{
                                                                  lineHeight:
                                                                    "1.5",
                                                                }}
                                                              >
                                                                <span data-custom-class="body_text">
                                                                  <bdt className="block-component" />
                                                                </span>
                                                                <div
                                                                  style={{
                                                                    lineHeight:
                                                                      "1.5",
                                                                  }}
                                                                >
                                                                  <span data-custom-class="body_text">
                                                                    <bdt className="block-component" />
                                                                  </span>
                                                                  <div
                                                                    style={{
                                                                      lineHeight:
                                                                        "1.5",
                                                                    }}
                                                                  >
                                                                    <span data-custom-class="body_text">
                                                                      <bdt className="block-component" />
                                                                    </span>
                                                                    <div
                                                                      style={{
                                                                        lineHeight:
                                                                          "1.5",
                                                                      }}
                                                                    >
                                                                      <span data-custom-class="body_text">
                                                                        <bdt className="block-component" />
                                                                      </span>
                                                                      <bdt className="statement-end-if-in-editor">
                                                                        <span data-custom-class="body_text" />
                                                                      </bdt>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <strong>
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="heading_2">
                                                                              Sources
                                                                              of
                                                                              Personal
                                                                              Information
                                                                            </span>
                                                                          </span>
                                                                        </strong>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            Learn
                                                                            more
                                                                            about
                                                                            the
                                                                            sources
                                                                            of
                                                                            personal
                                                                            information
                                                                            we
                                                                            collect
                                                                            in{" "}
                                                                            <bdt className="block-component" />
                                                                            '
                                                                            <bdt className="else-block" />
                                                                          </span>
                                                                        </span>
                                                                        <span data-custom-class="body_text">
                                                                          <a
                                                                            data-custom-class="link"
                                                                            href="#infocollect"
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                color:
                                                                                  "rgb (0, 58, 250)",
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              WHAT
                                                                              INFORMATION
                                                                              DO
                                                                              WE
                                                                              COLLECT?
                                                                            </span>
                                                                          </a>
                                                                        </span>
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            <bdt className="block-component" />
                                                                            '
                                                                            <bdt className="else-block" />
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <strong>
                                                                              <span data-custom-class="heading_2">
                                                                                How
                                                                                We
                                                                                Use
                                                                                and
                                                                                Share
                                                                                Personal
                                                                                Information
                                                                              </span>
                                                                            </strong>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          Learn
                                                                          about
                                                                          how we
                                                                          use
                                                                          your
                                                                          personal
                                                                          information
                                                                          in the
                                                                          section,{" "}
                                                                          <bdt className="block-component" />
                                                                          '
                                                                          <bdt className="else-block" />
                                                                        </span>
                                                                        <a
                                                                          data-custom-class="link"
                                                                          href="#infouse"
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              color:
                                                                                "rgb(0, 58, 250)",
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            HOW
                                                                            DO
                                                                            WE
                                                                            PROCESS
                                                                            YOUR
                                                                            INFORMATION?
                                                                          </span>
                                                                        </a>
                                                                        <span
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <bdt className="block-component" />
                                                                          '
                                                                          <bdt className="else-block" />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              <span
                                                                                style={{
                                                                                  color:
                                                                                    "rgb(89, 89, 89)",
                                                                                  fontSize: 15,
                                                                                }}
                                                                              >
                                                                                <span data-custom-class="body_text">
                                                                                  <bdt className="block-component" />
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              <strong>
                                                                                Will
                                                                                your
                                                                                information
                                                                                be
                                                                                shared
                                                                                with
                                                                                anyone
                                                                                else?
                                                                              </strong>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              We
                                                                              may
                                                                              disclose
                                                                              your
                                                                              personal
                                                                              information
                                                                              with
                                                                              our
                                                                              service
                                                                              providers
                                                                              pursuant
                                                                              to
                                                                              a
                                                                              written
                                                                              contract
                                                                              between
                                                                              us
                                                                              and
                                                                              each
                                                                              service
                                                                              provider.
                                                                              Learn
                                                                              more
                                                                              about
                                                                              how
                                                                              we
                                                                              disclose
                                                                              personal
                                                                              information
                                                                              to
                                                                              in
                                                                              the
                                                                              section,{" "}
                                                                              <bdt className="block-component" />
                                                                              '
                                                                              <bdt className="else-block" />
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                        <a
                                                                          data-custom-class="link"
                                                                          href="#whoshare"
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(0, 58, 250)",
                                                                            }}
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                                color:
                                                                                  "rgb(0, 58, 250)",
                                                                              }}
                                                                            >
                                                                              WHEN
                                                                              AND
                                                                              WITH
                                                                              WHOM
                                                                              DO
                                                                              WE
                                                                              SHARE
                                                                              YOUR
                                                                              PERSONAL
                                                                              INFORMATION?
                                                                            </span>
                                                                          </span>
                                                                        </a>
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              <bdt className="block-component" />
                                                                              '
                                                                              <bdt className="else-block" />
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              We
                                                                              may
                                                                              use
                                                                              your
                                                                              personal
                                                                              information
                                                                              for
                                                                              our
                                                                              own
                                                                              business
                                                                              purposes,
                                                                              such
                                                                              as
                                                                              for
                                                                              undertaking
                                                                              internal
                                                                              research
                                                                              for
                                                                              technological
                                                                              development
                                                                              and
                                                                              demonstration.
                                                                              This
                                                                              is
                                                                              not
                                                                              considered
                                                                              to
                                                                              be{" "}
                                                                              <bdt className="block-component" />
                                                                              'selling'
                                                                              <bdt className="else-block" />{" "}
                                                                              of
                                                                              your
                                                                              personal
                                                                              information.
                                                                              <span
                                                                                style={{
                                                                                  color:
                                                                                    "rgb(89, 89, 89)",
                                                                                  fontSize: 15,
                                                                                }}
                                                                              >
                                                                                <span data-custom-class="body_text">
                                                                                  <bdt className="block-component" />
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              We
                                                                              have
                                                                              not
                                                                              disclosed,
                                                                              sold,
                                                                              or
                                                                              shared
                                                                              any
                                                                              personal
                                                                              information
                                                                              to
                                                                              third
                                                                              parties
                                                                              for
                                                                              a
                                                                              business
                                                                              or
                                                                              commercial
                                                                              purpose
                                                                              in
                                                                              the
                                                                              preceding
                                                                              twelve
                                                                              (12)
                                                                              months.
                                                                              We
                                                                              <span
                                                                                style={{
                                                                                  color:
                                                                                    "rgb(89, 89, 89)",
                                                                                }}
                                                                              >
                                                                                &nbsp;
                                                                              </span>
                                                                              will
                                                                              not
                                                                              sell
                                                                              or
                                                                              share
                                                                              personal
                                                                              information
                                                                              in
                                                                              the
                                                                              future
                                                                              belonging
                                                                              to
                                                                              website
                                                                              visitors,
                                                                              users,
                                                                              and
                                                                              other
                                                                              consumers.
                                                                              <span
                                                                                style={{
                                                                                  color:
                                                                                    "rgb(89, 89, 89)",
                                                                                }}
                                                                              >
                                                                                <span data-custom-class="body_text">
                                                                                  <span
                                                                                    style={{
                                                                                      color:
                                                                                        "rgb(89, 89, 89)",
                                                                                    }}
                                                                                  >
                                                                                    <span data-custom-class="body_text">
                                                                                      <span
                                                                                        style={{
                                                                                          color:
                                                                                            "rgb(89, 89, 89)",
                                                                                        }}
                                                                                      >
                                                                                        <span data-custom-class="body_text">
                                                                                          <bdt className="statement-end-if-in-editor" />
                                                                                        </span>
                                                                                      </span>
                                                                                    </span>
                                                                                  </span>
                                                                                  <bdt className="block-component" />
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                        <span data-custom-class="body_text">
                                                                          <span
                                                                            style={{
                                                                              color:
                                                                                "rgb(0, 0, 0)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              <bdt className="block-component" />
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <strong>
                                                                            <span data-custom-class="heading_2">
                                                                              Your
                                                                              Rights
                                                                            </span>
                                                                          </strong>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            You
                                                                            have
                                                                            rights
                                                                            under
                                                                            certain
                                                                            US
                                                                            state
                                                                            data
                                                                            protection
                                                                            laws.
                                                                            However,
                                                                            these
                                                                            rights
                                                                            are
                                                                            not
                                                                            absolute,
                                                                            and
                                                                            in
                                                                            certain
                                                                            cases,
                                                                            we
                                                                            may
                                                                            decline
                                                                            your
                                                                            request
                                                                            as
                                                                            permitted
                                                                            by
                                                                            law.
                                                                            These
                                                                            rights
                                                                            include:
                                                                          </span>
                                                                          <bdt className="block-component" />
                                                                        </span>
                                                                      </div>
                                                                      <ul>
                                                                        <li
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            lineHeight:
                                                                              "1.5",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <strong>
                                                                              Right
                                                                              to
                                                                              know
                                                                            </strong>{" "}
                                                                            whether
                                                                            or
                                                                            not
                                                                            we
                                                                            are
                                                                            processing
                                                                            your
                                                                            personal
                                                                            data
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                          </span>
                                                                        </li>
                                                                      </ul>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <bdt className="block-component" />
                                                                        </span>
                                                                      </div>
                                                                      <ul>
                                                                        <li
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            lineHeight:
                                                                              "1.5",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <strong>
                                                                              Right
                                                                              to
                                                                              access&nbsp;
                                                                            </strong>
                                                                            your
                                                                            personal
                                                                            data
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                          </span>
                                                                        </li>
                                                                      </ul>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <bdt className="block-component" />
                                                                        </span>
                                                                      </div>
                                                                      <ul>
                                                                        <li
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            lineHeight:
                                                                              "1.5",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <strong>
                                                                              Right
                                                                              to
                                                                              correct&nbsp;
                                                                            </strong>
                                                                            inaccuracies
                                                                            in
                                                                            your
                                                                            personal
                                                                            data
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                          </span>
                                                                        </li>
                                                                      </ul>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <bdt className="block-component" />
                                                                        </span>
                                                                      </div>
                                                                      <ul>
                                                                        <li
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            lineHeight:
                                                                              "1.5",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <strong>
                                                                              Right
                                                                              to
                                                                              request
                                                                            </strong>{" "}
                                                                            the
                                                                            deletion
                                                                            of
                                                                            your
                                                                            personal
                                                                            data
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                          </span>
                                                                        </li>
                                                                      </ul>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <bdt className="block-component" />
                                                                        </span>
                                                                      </div>
                                                                      <ul>
                                                                        <li
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            lineHeight:
                                                                              "1.5",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <strong>
                                                                              Right
                                                                              to
                                                                              obtain
                                                                              a
                                                                              copy&nbsp;
                                                                            </strong>
                                                                            of
                                                                            the
                                                                            personal
                                                                            data
                                                                            you
                                                                            previously
                                                                            shared
                                                                            with
                                                                            us
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                          </span>
                                                                        </li>
                                                                      </ul>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <bdt className="block-component" />
                                                                        </span>
                                                                      </div>
                                                                      <ul>
                                                                        <li
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            lineHeight:
                                                                              "1.5",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <strong>
                                                                              Right
                                                                              to
                                                                              non-discrimination
                                                                            </strong>{" "}
                                                                            for
                                                                            exercising
                                                                            your
                                                                            rights
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                          </span>
                                                                        </li>
                                                                      </ul>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <bdt className="block-component" />
                                                                        </span>
                                                                      </div>
                                                                      <ul>
                                                                        <li
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            lineHeight:
                                                                              "1.5",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <strong>
                                                                              Right
                                                                              to
                                                                              opt
                                                                              out
                                                                            </strong>{" "}
                                                                            of
                                                                            the
                                                                            processing
                                                                            of
                                                                            your
                                                                            personal
                                                                            data
                                                                            if
                                                                            it
                                                                            is
                                                                            used
                                                                            for
                                                                            targeted
                                                                            advertising
                                                                            <bdt className="block-component" />{" "}
                                                                            (or
                                                                            sharing
                                                                            as
                                                                            defined
                                                                            under
                                                                            California’s
                                                                            privacy
                                                                            law)
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                            ,
                                                                            the
                                                                            sale
                                                                            of
                                                                            personal
                                                                            data,
                                                                            or
                                                                            profiling
                                                                            in
                                                                            furtherance
                                                                            of
                                                                            decisions
                                                                            that
                                                                            produce
                                                                            legal
                                                                            or
                                                                            similarly
                                                                            significant
                                                                            effects
                                                                            (
                                                                            <bdt className="block-component" />
                                                                            'profiling'
                                                                            <bdt className="else-block" />
                                                                            )
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                          </span>
                                                                        </li>
                                                                      </ul>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <bdt className="block-component" />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            Depending
                                                                            upon
                                                                            the
                                                                            state
                                                                            where
                                                                            you
                                                                            live,
                                                                            you
                                                                            may
                                                                            also
                                                                            have
                                                                            the
                                                                            following
                                                                            rights:
                                                                          </span>
                                                                          <bdt className="block-component" />
                                                                        </span>
                                                                      </div>
                                                                      <ul>
                                                                        <li
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            lineHeight:
                                                                              "1.5",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            Right
                                                                            to
                                                                            obtain
                                                                            a
                                                                            list
                                                                            of
                                                                            the
                                                                            categories
                                                                            of
                                                                            third
                                                                            parties
                                                                            to
                                                                            which
                                                                            we
                                                                            have
                                                                            disclosed
                                                                            personal
                                                                            data
                                                                            (as
                                                                            permitted
                                                                            by
                                                                            applicable
                                                                            law,
                                                                            including
                                                                            <bdt className="block-component" />{" "}
                                                                            California's
                                                                            and
                                                                            Delaware's
                                                                            <bdt className="else-block" />{" "}
                                                                            privacy
                                                                            law)
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                          </span>
                                                                        </li>
                                                                      </ul>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <bdt className="block-component">
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          />
                                                                        </bdt>
                                                                      </div>
                                                                      <ul>
                                                                        <li
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            lineHeight:
                                                                              "1.5",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            Right
                                                                            to
                                                                            obtain
                                                                            a
                                                                            list
                                                                            of
                                                                            specific
                                                                            third
                                                                            parties
                                                                            to
                                                                            which
                                                                            we
                                                                            have
                                                                            disclosed
                                                                            personal
                                                                            data
                                                                            (as
                                                                            permitted
                                                                            by
                                                                            applicable
                                                                            law,
                                                                            including
                                                                            Oregon’s
                                                                            privacy
                                                                            law)
                                                                          </span>
                                                                          <bdt className="statement-end-if-in-editor">
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                              }}
                                                                            />
                                                                          </bdt>
                                                                        </li>
                                                                      </ul>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <bdt className="block-component">
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          />
                                                                        </bdt>
                                                                      </div>
                                                                      <ul>
                                                                        <li
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            lineHeight:
                                                                              "1.5",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            Right
                                                                            to
                                                                            limit
                                                                            use
                                                                            and
                                                                            disclosure
                                                                            of
                                                                            sensitive
                                                                            personal
                                                                            data
                                                                            (as
                                                                            permitted
                                                                            by
                                                                            applicable
                                                                            law,
                                                                            including
                                                                            California’s
                                                                            privacy
                                                                            law)
                                                                          </span>
                                                                          <bdt className="statement-end-if-in-editor">
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                              }}
                                                                            />
                                                                          </bdt>
                                                                        </li>
                                                                      </ul>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <bdt className="block-component">
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          />
                                                                        </bdt>
                                                                      </div>
                                                                      <ul>
                                                                        <li
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            lineHeight:
                                                                              "1.5",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            Right
                                                                            to
                                                                            opt
                                                                            out
                                                                            of
                                                                            the
                                                                            collection
                                                                            of
                                                                            sensitive
                                                                            data
                                                                            and
                                                                            personal
                                                                            data
                                                                            collected
                                                                            through
                                                                            the
                                                                            operation
                                                                            of a
                                                                            voice
                                                                            or
                                                                            facial
                                                                            recognition
                                                                            feature
                                                                            (as
                                                                            permitted
                                                                            by
                                                                            applicable
                                                                            law,
                                                                            including
                                                                            Florida’s
                                                                            privacy
                                                                            law)
                                                                          </span>
                                                                          <bdt className="statement-end-if-in-editor">
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                              }}
                                                                            />
                                                                          </bdt>
                                                                        </li>
                                                                      </ul>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <bdt className="statement-end-if-in-editor" />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <strong>
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="heading_2">
                                                                              How
                                                                              to
                                                                              Exercise
                                                                              Your
                                                                              Rights
                                                                            </span>
                                                                          </span>
                                                                        </strong>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              To
                                                                              exercise
                                                                              these
                                                                              rights,
                                                                              you
                                                                              can
                                                                              contact
                                                                              us{" "}
                                                                              <bdt className="block-component" />
                                                                              by
                                                                              submitting
                                                                              a&nbsp;
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                        <a
                                                                          data-custom-class="link"
                                                                          href="https://app.termly.io/notify/98f5250a-7669-463e-aaa8-010e6e6b0ddb"
                                                                          rel="noopener noreferrer"
                                                                          target="_blank"
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(0, 58, 250)",
                                                                            }}
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                                color:
                                                                                  "rgb(0, 58, 250)",
                                                                              }}
                                                                            >
                                                                              data
                                                                              subject
                                                                              access
                                                                              request
                                                                            </span>
                                                                          </span>
                                                                        </a>
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              ,{" "}
                                                                              <bdt className="block-component" />
                                                                            </span>
                                                                            <span
                                                                              style={{
                                                                                color:
                                                                                  "rgb(89, 89, 89)",
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="body_text">
                                                                                <span
                                                                                  style={{
                                                                                    color:
                                                                                      "rgb(89, 89, 89)",
                                                                                    fontSize: 15,
                                                                                  }}
                                                                                >
                                                                                  <span data-custom-class="body_text">
                                                                                    <bdt className="block-component" />
                                                                                    <bdt className="block-component" />
                                                                                  </span>
                                                                                  <span data-custom-class="body_text">
                                                                                    <bdt className="block-component" />
                                                                                    by
                                                                                    visiting{" "}
                                                                                    <span
                                                                                      style={{
                                                                                        color:
                                                                                          "rgb(0, 58, 250)",
                                                                                      }}
                                                                                    >
                                                                                      <bdt className="question">
                                                                                        <a
                                                                                          href="https://beachbunnyhouse.com/contactus"
                                                                                          target="_blank"
                                                                                          data-custom-class="link"
                                                                                        >
                                                                                          https://beachbunnyhouse.com/contactus
                                                                                        </a>
                                                                                      </bdt>
                                                                                    </span>

                                                                                    ,{" "}
                                                                                    <bdt className="statement-end-if-in-editor" />
                                                                                    <bdt className="block-component">
                                                                                      <span data-custom-class="body_text">
                                                                                        <bdt className="block-component" />
                                                                                      </span>
                                                                                    </bdt>
                                                                                  </span>
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                        <span data-custom-class="body_text">
                                                                          or by
                                                                          referring
                                                                          to the
                                                                          contact
                                                                          details
                                                                          at the
                                                                          bottom
                                                                          of
                                                                          this
                                                                          document.
                                                                        </span>
                                                                        <bdt className="block-component">
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          />
                                                                        </bdt>
                                                                        <bdt className="block-component">
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          />
                                                                        </bdt>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            Under
                                                                            certain
                                                                            US
                                                                            state
                                                                            data
                                                                            protection
                                                                            laws,
                                                                            you
                                                                            can
                                                                            designate
                                                                            an{" "}
                                                                            <bdt className="block-component" />
                                                                            authorised
                                                                            <bdt className="else-block" />{" "}
                                                                            agent
                                                                            to
                                                                            make
                                                                            a
                                                                            request
                                                                            on
                                                                            your
                                                                            behalf.
                                                                            We
                                                                            may
                                                                            deny
                                                                            a
                                                                            request
                                                                            from
                                                                            an{" "}
                                                                            <bdt className="block-component" />
                                                                            authorised
                                                                            <bdt className="else-block" />{" "}
                                                                            agent
                                                                            that
                                                                            does
                                                                            not
                                                                            submit
                                                                            proof
                                                                            that
                                                                            they
                                                                            have
                                                                            been
                                                                            validly{" "}
                                                                            <bdt className="block-component" />
                                                                            authorised
                                                                            <bdt className="else-block" />{" "}
                                                                            to
                                                                            act
                                                                            on
                                                                            your
                                                                            behalf
                                                                            in
                                                                            accordance
                                                                            with
                                                                            applicable
                                                                            laws.
                                                                          </span>
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <strong>
                                                                            <span data-custom-class="heading_2">
                                                                              Request
                                                                              Verification
                                                                            </span>
                                                                          </strong>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            Upon
                                                                            receiving
                                                                            your
                                                                            request,
                                                                            we
                                                                            will
                                                                            need
                                                                            to
                                                                            verify
                                                                            your
                                                                            identity
                                                                            to
                                                                            determine
                                                                            you
                                                                            are
                                                                            the
                                                                            same
                                                                            person
                                                                            about
                                                                            whom
                                                                            we
                                                                            have
                                                                            the
                                                                            information
                                                                            in
                                                                            our
                                                                            system.
                                                                            We
                                                                            will
                                                                            only
                                                                            use
                                                                            personal
                                                                            information
                                                                            provided
                                                                            in
                                                                            your
                                                                            request
                                                                            to
                                                                            verify
                                                                            your
                                                                            identity
                                                                            or
                                                                            authority
                                                                            to
                                                                            make
                                                                            the
                                                                            request.
                                                                            However,
                                                                            if
                                                                            we
                                                                            cannot
                                                                            verify
                                                                            your
                                                                            identity
                                                                            from
                                                                            the
                                                                            information
                                                                            already
                                                                            maintained
                                                                            by
                                                                            us,
                                                                            we
                                                                            may
                                                                            request
                                                                            that
                                                                            you
                                                                            provide
                                                                            additional
                                                                            information
                                                                            for
                                                                            the
                                                                            purposes
                                                                            of
                                                                            verifying
                                                                            your
                                                                            identity
                                                                            and
                                                                            for
                                                                            security
                                                                            or
                                                                            fraud-prevention
                                                                            purposes.
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            If
                                                                            you
                                                                            submit
                                                                            the
                                                                            request
                                                                            through
                                                                            an{" "}
                                                                            <bdt className="block-component" />
                                                                            authorised
                                                                            <bdt className="else-block" />{" "}
                                                                            agent,
                                                                            we
                                                                            may
                                                                            need
                                                                            to
                                                                            collect
                                                                            additional
                                                                            information
                                                                            to
                                                                            verify
                                                                            your
                                                                            identity
                                                                            before
                                                                            processing
                                                                            your
                                                                            request
                                                                            and
                                                                            the
                                                                            agent
                                                                            will
                                                                            need
                                                                            to
                                                                            provide
                                                                            a
                                                                            written
                                                                            and
                                                                            signed
                                                                            permission
                                                                            from
                                                                            you
                                                                            to
                                                                            submit
                                                                            such
                                                                            request
                                                                            on
                                                                            your
                                                                            behalf.
                                                                          </span>
                                                                        </span>
                                                                        <bdt className="block-component">
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          />
                                                                        </bdt>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="heading_2">
                                                                            <strong>
                                                                              Appeals
                                                                            </strong>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            Under
                                                                            certain
                                                                            US
                                                                            state
                                                                            data
                                                                            protection
                                                                            laws,
                                                                            if
                                                                            we
                                                                            decline
                                                                            to
                                                                            take
                                                                            action
                                                                            regarding
                                                                            your
                                                                            request,
                                                                            you
                                                                            may
                                                                            appeal
                                                                            our
                                                                            decision
                                                                            by
                                                                            emailing
                                                                            us
                                                                            at{" "}
                                                                            <bdt className="block-component" />
                                                                            <bdt className="question">
                                                                              beachbunny@al-kaidy.de
                                                                            </bdt>
                                                                            <bdt className="else-block" />
                                                                            . We
                                                                            will
                                                                            inform
                                                                            you
                                                                            in
                                                                            writing
                                                                            of
                                                                            any
                                                                            action
                                                                            taken
                                                                            or
                                                                            not
                                                                            taken
                                                                            in
                                                                            response
                                                                            to
                                                                            the
                                                                            appeal,
                                                                            including
                                                                            a
                                                                            written
                                                                            explanation
                                                                            of
                                                                            the
                                                                            reasons
                                                                            for
                                                                            the
                                                                            decisions.
                                                                            If
                                                                            your
                                                                            appeal
                                                                            is
                                                                            denied,
                                                                            you
                                                                            may
                                                                            submit
                                                                            a
                                                                            complaint
                                                                            to
                                                                            your
                                                                            state
                                                                            attorney
                                                                            general.
                                                                          </span>
                                                                          <bdt className="statement-end-if-in-editor" />
                                                                        </span>
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                color:
                                                                                  "rgb(89, 89, 89)",
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="body_text">
                                                                                <bdt className="block-component">
                                                                                  <bdt className="block-component" />
                                                                                </bdt>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                        <bdt className="block-component">
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          />
                                                                        </bdt>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <strong>
                                                                            <span data-custom-class="heading_2">
                                                                              California{" "}
                                                                              <bdt className="block-component" />
                                                                              'Shine
                                                                              The
                                                                              Light'
                                                                              <bdt className="else-block" />{" "}
                                                                              Law
                                                                            </span>
                                                                          </strong>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            California
                                                                            Civil
                                                                            Code
                                                                            Section
                                                                            1798.83,
                                                                            also
                                                                            known
                                                                            as
                                                                            the{" "}
                                                                            <bdt className="block-component" />
                                                                            'Shine
                                                                            The
                                                                            Light'
                                                                            <bdt className="else-block" />{" "}
                                                                            law,
                                                                            permits
                                                                            our
                                                                            users
                                                                            who
                                                                            are
                                                                            California
                                                                            residents
                                                                            to
                                                                            request
                                                                            and
                                                                            obtain
                                                                            from
                                                                            us,
                                                                            once
                                                                            a
                                                                            year
                                                                            and
                                                                            free
                                                                            of
                                                                            charge,
                                                                            information
                                                                            about
                                                                            categories
                                                                            of
                                                                            personal
                                                                            information
                                                                            (if
                                                                            any)
                                                                            we
                                                                            disclosed
                                                                            to
                                                                            third
                                                                            parties
                                                                            for
                                                                            direct
                                                                            marketing
                                                                            purposes
                                                                            and
                                                                            the
                                                                            names
                                                                            and
                                                                            addresses
                                                                            of
                                                                            all
                                                                            third
                                                                            parties
                                                                            with
                                                                            which
                                                                            we
                                                                            shared
                                                                            personal
                                                                            information
                                                                            in
                                                                            the
                                                                            immediately
                                                                            preceding
                                                                            calendar
                                                                            year.
                                                                            If
                                                                            you
                                                                            are
                                                                            a
                                                                            California
                                                                            resident
                                                                            and
                                                                            would
                                                                            like
                                                                            to
                                                                            make
                                                                            such
                                                                            a
                                                                            request,
                                                                            please
                                                                            submit
                                                                            your
                                                                            request
                                                                            in
                                                                            writing
                                                                            to
                                                                            us
                                                                            by
                                                                            using
                                                                            the
                                                                            contact
                                                                            details
                                                                            provided
                                                                            in
                                                                            the
                                                                            section{" "}
                                                                            <bdt className="block-component" />
                                                                            '
                                                                            <bdt className="else-block" />
                                                                          </span>
                                                                        </span>
                                                                        <span data-custom-class="body_text">
                                                                          <a
                                                                            data-custom-class="link"
                                                                            href="#contact"
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                color:
                                                                                  "rgb(0, 58, 250)",
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              HOW
                                                                              CAN
                                                                              YOU
                                                                              CONTACT
                                                                              US
                                                                              ABOUT
                                                                              THIS
                                                                              NOTICE?
                                                                            </span>
                                                                          </a>
                                                                        </span>
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            <bdt className="block-component" />
                                                                            '
                                                                            <bdt className="else-block" />
                                                                          </span>
                                                                        </span>
                                                                        <bdt className="statement-end-if-in-editor">
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          />
                                                                        </bdt>
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                color:
                                                                                  "rgb(89, 89, 89)",
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="body_text">
                                                                                <span
                                                                                  style={{
                                                                                    color:
                                                                                      "rgb(89, 89, 89)",
                                                                                    fontSize: 15,
                                                                                  }}
                                                                                >
                                                                                  <span data-custom-class="body_text">
                                                                                    <span
                                                                                      style={{
                                                                                        color:
                                                                                          "rgb(89, 89, 89)",
                                                                                        fontSize: 15,
                                                                                      }}
                                                                                    >
                                                                                      <span data-custom-class="body_text">
                                                                                        <span
                                                                                          style={{
                                                                                            color:
                                                                                              "rgb(89, 89, 89)",
                                                                                            fontSize: 15,
                                                                                          }}
                                                                                        >
                                                                                          <span data-custom-class="body_text">
                                                                                            <bdt className="statement-end-if-in-editor">
                                                                                              <span data-custom-class="body_text">
                                                                                                <span
                                                                                                  style={{
                                                                                                    fontSize: 15,
                                                                                                    color:
                                                                                                      "rgb(89, 89, 89)",
                                                                                                  }}
                                                                                                >
                                                                                                  <span
                                                                                                    style={{
                                                                                                      fontSize: 15,
                                                                                                      color:
                                                                                                        "rgb(89, 89, 89)",
                                                                                                    }}
                                                                                                  >
                                                                                                    <span
                                                                                                      style={{
                                                                                                        color:
                                                                                                          "rgb(89, 89, 89)",
                                                                                                        fontSize: 15,
                                                                                                      }}
                                                                                                    >
                                                                                                      <span data-custom-class="body_text">
                                                                                                        <span
                                                                                                          style={{
                                                                                                            color:
                                                                                                              "rgb(89, 89, 89)",
                                                                                                            fontSize: 15,
                                                                                                          }}
                                                                                                        >
                                                                                                          <span data-custom-class="body_text">
                                                                                                            <span
                                                                                                              style={{
                                                                                                                color:
                                                                                                                  "rgb(89, 89, 89)",
                                                                                                                fontSize: 15,
                                                                                                              }}
                                                                                                            >
                                                                                                              <span data-custom-class="body_text">
                                                                                                                <span
                                                                                                                  style={{
                                                                                                                    color:
                                                                                                                      "rgb(89, 89, 89)",
                                                                                                                    fontSize: 15,
                                                                                                                  }}
                                                                                                                >
                                                                                                                  <span data-custom-class="body_text">
                                                                                                                    <bdt className="statement-end-if-in-editor">
                                                                                                                      <bdt className="statement-end-if-in-editor" />
                                                                                                                    </bdt>
                                                                                                                  </span>
                                                                                                                </span>
                                                                                                              </span>
                                                                                                            </span>
                                                                                                          </span>
                                                                                                        </span>
                                                                                                      </span>
                                                                                                    </span>
                                                                                                  </span>
                                                                                                </span>
                                                                                              </span>
                                                                                            </bdt>
                                                                                          </span>
                                                                                        </span>
                                                                                      </span>
                                                                                    </span>
                                                                                  </span>
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                        <bdt className="block-component">
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          />
                                                                        </bdt>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          id="otherlaws"
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <strong>
                                                                            <span data-custom-class="heading_1">
                                                                              12.
                                                                              DO
                                                                              OTHER
                                                                              REGIONS
                                                                              HAVE
                                                                              SPECIFIC
                                                                              PRIVACY
                                                                              RIGHTS?
                                                                            </span>
                                                                          </strong>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <em>
                                                                            <strong>
                                                                              <span data-custom-class="body_text">
                                                                                In
                                                                                Short:
                                                                              </span>
                                                                            </strong>
                                                                            <span data-custom-class="body_text">
                                                                              &nbsp;You
                                                                              may
                                                                              have
                                                                              additional
                                                                              rights
                                                                              based
                                                                              on
                                                                              the
                                                                              country
                                                                              you
                                                                              reside
                                                                              in.
                                                                            </span>
                                                                          </em>
                                                                          <bdt className="block-component" />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <bdt className="block-component">
                                                                            <span data-custom-class="heading_2" />
                                                                          </bdt>
                                                                          <span data-custom-class="heading_2">
                                                                            <strong>
                                                                              Australia
                                                                            </strong>
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                            <bdt className="block-component" />{" "}
                                                                            <strong>
                                                                              and
                                                                            </strong>{" "}
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                            <bdt className="block-component" />
                                                                            <strong>
                                                                              New
                                                                              Zealand
                                                                            </strong>
                                                                          </span>
                                                                          <bdt className="statement-end-if-in-editor">
                                                                            <span data-custom-class="heading_2" />
                                                                          </bdt>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            We
                                                                            collect
                                                                            and
                                                                            process
                                                                            your
                                                                            personal
                                                                            information
                                                                            under
                                                                            the
                                                                            obligations
                                                                            and
                                                                            conditions
                                                                            set
                                                                            by{" "}
                                                                            <bdt className="block-component" />
                                                                            Australia's
                                                                            Privacy
                                                                            Act
                                                                            1988
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                            <bdt className="block-component" />{" "}
                                                                            and{" "}
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                            <bdt className="block-component" />
                                                                            New
                                                                            Zealand's
                                                                            Privacy
                                                                            Act
                                                                            2020
                                                                            <bdt className="statement-end-if-in-editor" />{" "}
                                                                            (Privacy
                                                                            Act).
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            This
                                                                            Privacy
                                                                            Notice
                                                                            satisfies
                                                                            the
                                                                            notice
                                                                            requirements
                                                                            defined
                                                                            in
                                                                            <bdt className="block-component" />{" "}
                                                                            both
                                                                            Privacy
                                                                            Acts
                                                                            <bdt className="block-component" />
                                                                            , in
                                                                            particular:
                                                                            what
                                                                            personal
                                                                            information
                                                                            we
                                                                            collect
                                                                            from
                                                                            you,
                                                                            from
                                                                            which
                                                                            sources,
                                                                            for
                                                                            which
                                                                            purposes,
                                                                            and
                                                                            other
                                                                            recipients
                                                                            of
                                                                            your
                                                                            personal
                                                                            information.
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            If
                                                                            you
                                                                            do
                                                                            not
                                                                            wish
                                                                            to
                                                                            provide
                                                                            the
                                                                            personal
                                                                            information
                                                                            necessary
                                                                            to{" "}
                                                                            <bdt className="block-component" />
                                                                            fulfil
                                                                            <bdt className="else-block" />{" "}
                                                                            their
                                                                            applicable
                                                                            purpose,
                                                                            it
                                                                            may
                                                                            affect
                                                                            our
                                                                            ability
                                                                            to
                                                                            provide
                                                                            our
                                                                            services,
                                                                            in
                                                                            particular:
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <bdt className="block-component" />
                                                                        </span>
                                                                      </div>
                                                                      <ul>
                                                                        <li
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            lineHeight:
                                                                              "1.5",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              offer
                                                                              you
                                                                              the
                                                                              products
                                                                              or
                                                                              services
                                                                              that
                                                                              you
                                                                              want
                                                                            </span>
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                          </span>
                                                                        </li>
                                                                      </ul>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <bdt className="block-component" />
                                                                        </span>
                                                                      </div>
                                                                      <ul>
                                                                        <li
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            lineHeight:
                                                                              "1.5",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              respond
                                                                              to
                                                                              or
                                                                              help
                                                                              with
                                                                              your
                                                                              requests
                                                                            </span>
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                          </span>
                                                                        </li>
                                                                      </ul>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <bdt className="block-component" />
                                                                        </span>
                                                                      </div>
                                                                      <ul>
                                                                        <li
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            lineHeight:
                                                                              "1.5",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              manage
                                                                              your
                                                                              account
                                                                              with
                                                                              us
                                                                            </span>
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                          </span>
                                                                        </li>
                                                                      </ul>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <bdt className="block-component" />
                                                                        </span>
                                                                      </div>
                                                                      <ul>
                                                                        <li
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            lineHeight:
                                                                              "1.5",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              confirm
                                                                              your
                                                                              identity
                                                                              and
                                                                              protect
                                                                              your
                                                                              account
                                                                            </span>
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                          </span>
                                                                        </li>
                                                                      </ul>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            At
                                                                            any
                                                                            time,
                                                                            you
                                                                            have
                                                                            the
                                                                            right
                                                                            to
                                                                            request
                                                                            access
                                                                            to
                                                                            or
                                                                            correction
                                                                            of
                                                                            your
                                                                            personal
                                                                            information.
                                                                            You
                                                                            can
                                                                            make
                                                                            such
                                                                            a
                                                                            request
                                                                            by
                                                                            contacting
                                                                            us
                                                                            by
                                                                            using
                                                                            the
                                                                            contact
                                                                            details
                                                                            provided
                                                                            in
                                                                            the
                                                                            section{" "}
                                                                            <bdt className="block-component" />
                                                                            '
                                                                            <bdt className="else-block" />
                                                                            <a
                                                                              data-custom-class="link"
                                                                              href="#request"
                                                                            >
                                                                              <span
                                                                                style={{
                                                                                  color:
                                                                                    "rgb(0, 58, 250)",
                                                                                }}
                                                                              >
                                                                                <span data-custom-class="link">
                                                                                  HOW
                                                                                  CAN
                                                                                  YOU
                                                                                  REVIEW,
                                                                                  UPDATE,
                                                                                  OR
                                                                                  DELETE
                                                                                  THE
                                                                                  DATA
                                                                                  WE
                                                                                  COLLECT
                                                                                  FROM
                                                                                  YOU?
                                                                                </span>
                                                                              </span>
                                                                            </a>
                                                                            <bdt className="block-component" />
                                                                            '
                                                                            <bdt className="else-block" />
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            If
                                                                            you
                                                                            believe
                                                                            we
                                                                            are
                                                                            unlawfully
                                                                            processing
                                                                            your
                                                                            personal
                                                                            information,
                                                                            you
                                                                            have
                                                                            the
                                                                            right
                                                                            to
                                                                            submit
                                                                            a
                                                                            complaint
                                                                            about{" "}
                                                                            <bdt className="block-component" />
                                                                            a
                                                                            breach
                                                                            of
                                                                            the
                                                                            Australian
                                                                            Privacy
                                                                            Principles
                                                                            to
                                                                            the{" "}
                                                                            <a
                                                                              data-custom-class="link"
                                                                              href="https://www.oaic.gov.au/privacy/privacy-complaints/lodge-a-privacy-complaint-with-us"
                                                                              rel="noopener noreferrer"
                                                                              target="_blank"
                                                                            >
                                                                              <span
                                                                                style={{
                                                                                  color:
                                                                                    "rgb(0, 58, 250)",
                                                                                }}
                                                                              >
                                                                                <span data-custom-class="link">
                                                                                  Office
                                                                                  of
                                                                                  the
                                                                                  Australian
                                                                                  Information
                                                                                  Commissioner
                                                                                </span>
                                                                              </span>
                                                                            </a>
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                            <bdt className="block-component" />{" "}
                                                                            and{" "}
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                            <bdt className="block-component" />
                                                                            a
                                                                            breach
                                                                            of
                                                                            New
                                                                            Zealand's
                                                                            Privacy
                                                                            Principles
                                                                            to
                                                                            the{" "}
                                                                            <a
                                                                              data-custom-class="link"
                                                                              href="https://www.privacy.org.nz/your-rights/making-a-complaint/"
                                                                              rel="noopener noreferrer"
                                                                              target="_blank"
                                                                            >
                                                                              <span
                                                                                style={{
                                                                                  color:
                                                                                    "rgb(0, 58, 250)",
                                                                                }}
                                                                              >
                                                                                <span data-custom-class="link">
                                                                                  Office
                                                                                  of
                                                                                  New
                                                                                  Zealand
                                                                                  Privacy
                                                                                  Commissioner
                                                                                </span>
                                                                              </span>
                                                                            </a>
                                                                            <bdt className="statement-end-if-in-editor" />
                                                                            .
                                                                          </span>
                                                                          <bdt className="statement-end-if-in-editor" />
                                                                        </span>
                                                                        <bdt className="block-component">
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          />
                                                                        </bdt>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <strong>
                                                                            <span data-custom-class="heading_2">
                                                                              Republic
                                                                              of
                                                                              South
                                                                              Africa
                                                                            </span>
                                                                          </strong>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            At
                                                                            any
                                                                            time,
                                                                            you
                                                                            have
                                                                            the
                                                                            right
                                                                            to
                                                                            request
                                                                            access
                                                                            to
                                                                            or
                                                                            correction
                                                                            of
                                                                            your
                                                                            personal
                                                                            information.
                                                                            You
                                                                            can
                                                                            make
                                                                            such
                                                                            a
                                                                            request
                                                                            by
                                                                            contacting
                                                                            us
                                                                            by
                                                                            using
                                                                            the
                                                                            contact
                                                                            details
                                                                            provided
                                                                            in
                                                                            the
                                                                            section{" "}
                                                                            <bdt className="block-component" />
                                                                            '
                                                                            <bdt className="else-block" />
                                                                          </span>
                                                                        </span>
                                                                        <span data-custom-class="link">
                                                                          <a href="#request">
                                                                            <span
                                                                              style={{
                                                                                color:
                                                                                  "rgb(0, 58, 250)",
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="link">
                                                                                HOW
                                                                                CAN
                                                                                YOU
                                                                                REVIEW,
                                                                                UPDATE,
                                                                                OR
                                                                                DELETE
                                                                                THE
                                                                                DATA
                                                                                WE
                                                                                COLLECT
                                                                                FROM
                                                                                YOU?
                                                                              </span>
                                                                            </span>
                                                                          </a>
                                                                        </span>
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            <bdt className="block-component" />
                                                                            '
                                                                            <bdt className="else-block" />
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            If
                                                                            you
                                                                            are
                                                                            unsatisfied
                                                                            with
                                                                            the
                                                                            manner
                                                                            in
                                                                            which
                                                                            we
                                                                            address
                                                                            any
                                                                            complaint
                                                                            with
                                                                            regard
                                                                            to
                                                                            our
                                                                            processing
                                                                            of
                                                                            personal
                                                                            information,
                                                                            you
                                                                            can
                                                                            contact
                                                                            the
                                                                            office
                                                                            of
                                                                            the
                                                                            regulator,
                                                                            the
                                                                            details
                                                                            of
                                                                            which
                                                                            are:
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <br />
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <a
                                                                          data-custom-class="link"
                                                                          href="https://inforegulator.org.za/"
                                                                          rel="noopener noreferrer"
                                                                          target="_blank"
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              color:
                                                                                "rgb(0, 58, 250)",
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              <span data-custom-class="link">
                                                                                The
                                                                                Information
                                                                                Regulator
                                                                                (South
                                                                                Africa)
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </a>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span data-custom-class="body_text">
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            General
                                                                            enquiries:&nbsp;
                                                                          </span>
                                                                          <a
                                                                            data-custom-class="link"
                                                                            href="mailto:enquiries@inforegulator.org.za"
                                                                            rel="noopener noreferrer"
                                                                            target="_blank"
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                color:
                                                                                  "rgb(0, 58, 250)",
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="link">
                                                                                enquiries@inforegulator.org.za
                                                                              </span>
                                                                            </span>
                                                                          </a>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span data-custom-class="body_text">
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            Complaints
                                                                            (complete
                                                                            POPIA/PAIA
                                                                            form
                                                                            5):&nbsp;
                                                                          </span>
                                                                          <a
                                                                            data-custom-class="link"
                                                                            href="mailto:PAIAComplaints@inforegulator.org.za"
                                                                            rel="noopener noreferrer"
                                                                            target="_blank"
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                color:
                                                                                  "rgb(0, 58, 250)",
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="link">
                                                                                PAIAComplaints@inforegulator.org.za
                                                                              </span>
                                                                            </span>
                                                                          </a>
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            &nbsp;&amp;&nbsp;
                                                                          </span>
                                                                        </span>
                                                                        <a
                                                                          data-custom-class="link"
                                                                          href="mailto:POPIAComplaints@inforegulator.org.za"
                                                                          rel="noopener noreferrer"
                                                                          target="_blank"
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              color:
                                                                                "rgb(0, 58, 250)",
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              <span data-custom-class="link">
                                                                                POPIAComplaints@inforegulator.org.za
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </a>
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <bdt className="statement-end-if-in-editor" />
                                                                          <bdt className="statement-end-if-in-editor" />
                                                                        </span>
                                                                        <bdt className="block-component">
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          />
                                                                        </bdt>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        id="policyupdates"
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            color:
                                                                              "rgb(127, 127, 127)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                                color:
                                                                                  "rgb(89, 89, 89)",
                                                                              }}
                                                                            >
                                                                              <span
                                                                                style={{
                                                                                  fontSize: 15,
                                                                                  color:
                                                                                    "rgb(89, 89, 89)",
                                                                                }}
                                                                              >
                                                                                <span
                                                                                  id="control"
                                                                                  style={{
                                                                                    color:
                                                                                      "rgb(0, 0, 0)",
                                                                                  }}
                                                                                >
                                                                                  <strong>
                                                                                    <span data-custom-class="heading_1">
                                                                                      13.
                                                                                      DO
                                                                                      WE
                                                                                      MAKE
                                                                                      UPDATES
                                                                                      TO
                                                                                      THIS
                                                                                      NOTICE?
                                                                                    </span>
                                                                                  </strong>
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              <em>
                                                                                <strong>
                                                                                  In
                                                                                  Short:&nbsp;
                                                                                </strong>
                                                                                Yes,
                                                                                we
                                                                                will
                                                                                update
                                                                                this
                                                                                notice
                                                                                as
                                                                                necessary
                                                                                to
                                                                                stay
                                                                                compliant
                                                                                with
                                                                                relevant
                                                                                laws.
                                                                              </em>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              We
                                                                              may
                                                                              update
                                                                              this
                                                                              Privacy
                                                                              Notice
                                                                              from
                                                                              time
                                                                              to
                                                                              time.
                                                                              The
                                                                              updated
                                                                              version
                                                                              will
                                                                              be
                                                                              indicated
                                                                              by
                                                                              an
                                                                              updated{" "}
                                                                              <bdt className="block-component" />
                                                                              'Revised'
                                                                              <bdt className="else-block" />{" "}
                                                                              date
                                                                              at
                                                                              the
                                                                              top
                                                                              of
                                                                              this
                                                                              Privacy
                                                                              Notice.
                                                                              If
                                                                              we
                                                                              make
                                                                              material
                                                                              changes
                                                                              to
                                                                              this
                                                                              Privacy
                                                                              Notice,
                                                                              we
                                                                              may
                                                                              notify
                                                                              you
                                                                              either
                                                                              by
                                                                              prominently
                                                                              posting
                                                                              a
                                                                              notice
                                                                              of
                                                                              such
                                                                              changes
                                                                              or
                                                                              by
                                                                              directly
                                                                              sending
                                                                              you
                                                                              a
                                                                              notification.
                                                                              We
                                                                              encourage
                                                                              you
                                                                              to
                                                                              review
                                                                              this
                                                                              Privacy
                                                                              Notice
                                                                              frequently
                                                                              to
                                                                              be
                                                                              informed
                                                                              of
                                                                              how
                                                                              we
                                                                              are
                                                                              protecting
                                                                              your
                                                                              information.
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        id="contact"
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            color:
                                                                              "rgb(127, 127, 127)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                                color:
                                                                                  "rgb(89, 89, 89)",
                                                                              }}
                                                                            >
                                                                              <span
                                                                                style={{
                                                                                  fontSize: 15,
                                                                                  color:
                                                                                    "rgb(89, 89, 89)",
                                                                                }}
                                                                              >
                                                                                <span
                                                                                  id="control"
                                                                                  style={{
                                                                                    color:
                                                                                      "rgb(0, 0, 0)",
                                                                                  }}
                                                                                >
                                                                                  <strong>
                                                                                    <span data-custom-class="heading_1">
                                                                                      14.
                                                                                      HOW
                                                                                      CAN
                                                                                      YOU
                                                                                      CONTACT
                                                                                      US
                                                                                      ABOUT
                                                                                      THIS
                                                                                      NOTICE?
                                                                                    </span>
                                                                                  </strong>
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              If
                                                                              you
                                                                              have
                                                                              questions
                                                                              or
                                                                              comments
                                                                              about
                                                                              this
                                                                              notice,
                                                                              you
                                                                              may{" "}
                                                                              <span
                                                                                style={{
                                                                                  color:
                                                                                    "rgb(89, 89, 89)",
                                                                                  fontSize: 15,
                                                                                }}
                                                                              >
                                                                                <span data-custom-class="body_text">
                                                                                  <bdt className="block-component">
                                                                                    <bdt className="block-component" />
                                                                                  </bdt>
                                                                                  email
                                                                                  us
                                                                                  at{" "}
                                                                                  <bdt className="question">
                                                                                    beachbunny@al-kaidy.de
                                                                                    or&nbsp;
                                                                                  </bdt>
                                                                                  <bdt className="statement-end-if-in-editor">
                                                                                    <bdt className="block-component" />
                                                                                  </bdt>
                                                                                </span>
                                                                              </span>
                                                                              <span
                                                                                style={{
                                                                                  fontSize: 15,
                                                                                  color:
                                                                                    "rgb(89, 89, 89)",
                                                                                }}
                                                                              >
                                                                                <span
                                                                                  style={{
                                                                                    fontSize: 15,
                                                                                    color:
                                                                                      "rgb(89, 89, 89)",
                                                                                  }}
                                                                                >
                                                                                  <span data-custom-class="body_text">
                                                                                    contact
                                                                                    us
                                                                                    by
                                                                                    post
                                                                                    at:
                                                                                  </span>
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              <span
                                                                                style={{
                                                                                  fontSize: 15,
                                                                                }}
                                                                              >
                                                                                <span
                                                                                  style={{
                                                                                    color:
                                                                                      "rgb(89, 89, 89)",
                                                                                  }}
                                                                                >
                                                                                  <span
                                                                                    style={{
                                                                                      color:
                                                                                        "rgb(89, 89, 89)",
                                                                                    }}
                                                                                  >
                                                                                    <span data-custom-class="body_text">
                                                                                      <bdt className="question">
                                                                                        BeachBunnyHouse
                                                                                      </bdt>
                                                                                    </span>
                                                                                  </span>
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                            <span data-custom-class="body_text">
                                                                              <span
                                                                                style={{
                                                                                  color:
                                                                                    "rgb(89, 89, 89)",
                                                                                }}
                                                                              >
                                                                                <span data-custom-class="body_text">
                                                                                  <bdt className="block-component" />
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            <bdt className="question">
                                                                              POSTSTRASSE22
                                                                            </bdt>
                                                                            <span
                                                                              style={{
                                                                                color:
                                                                                  "rgb(89, 89, 89)",
                                                                              }}
                                                                            >
                                                                              <span
                                                                                style={{
                                                                                  fontSize: 15,
                                                                                }}
                                                                              >
                                                                                <bdt className="block-component" />
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            <bdt className="question">
                                                                              Cuxhaven
                                                                            </bdt>
                                                                            <span
                                                                              style={{
                                                                                color:
                                                                                  "rgb(89, 89, 89)",
                                                                              }}
                                                                            >
                                                                              <span
                                                                                style={{
                                                                                  fontSize: 15,
                                                                                }}
                                                                              >
                                                                                <bdt className="block-component" />

                                                                                ,{" "}
                                                                                <bdt className="question">
                                                                                  Niedersachsen
                                                                                </bdt>
                                                                                <bdt className="statement-end-if-in-editor" />
                                                                                <bdt className="block-component" />{" "}
                                                                                <bdt className="question">
                                                                                  27474
                                                                                </bdt>
                                                                                <bdt className="statement-end-if-in-editor" />
                                                                                <bdt className="block-component" />
                                                                                <bdt className="block-component" />
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="body_text">
                                                                                <span
                                                                                  style={{
                                                                                    color:
                                                                                      "rgb(89, 89, 89)",
                                                                                  }}
                                                                                >
                                                                                  <bdt className="block-component" />
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                            <bdt className="question">
                                                                              Germany
                                                                            </bdt>
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="body_text">
                                                                                <span
                                                                                  style={{
                                                                                    color:
                                                                                      "rgb(89, 89, 89)",
                                                                                  }}
                                                                                >
                                                                                  <bdt className="statement-end-if-in-editor">
                                                                                    <span
                                                                                      style={{
                                                                                        fontSize: 15,
                                                                                      }}
                                                                                    >
                                                                                      <span data-custom-class="body_text">
                                                                                        <span
                                                                                          style={{
                                                                                            color:
                                                                                              "rgb(89, 89, 89)",
                                                                                          }}
                                                                                        >
                                                                                          <bdt className="statement-end-if-in-editor">
                                                                                            <span
                                                                                              style={{
                                                                                                fontSize: 15,
                                                                                              }}
                                                                                            >
                                                                                              <span data-custom-class="body_text">
                                                                                                <span
                                                                                                  style={{
                                                                                                    color:
                                                                                                      "rgb(89, 89, 89)",
                                                                                                  }}
                                                                                                >
                                                                                                  <bdt className="statement-end-if-in-editor" />
                                                                                                </span>
                                                                                              </span>
                                                                                            </span>
                                                                                          </bdt>
                                                                                          <bdt className="statement-end-if-in-editor" />
                                                                                        </span>
                                                                                      </span>
                                                                                    </span>
                                                                                    <span data-custom-class="body_text">
                                                                                      <span
                                                                                        style={{
                                                                                          color:
                                                                                            "rgb(89, 89, 89)",
                                                                                        }}
                                                                                      >
                                                                                        <span
                                                                                          style={{
                                                                                            fontSize: 15,
                                                                                          }}
                                                                                        >
                                                                                          <bdt className="statement-end-if-in-editor" />
                                                                                        </span>
                                                                                      </span>
                                                                                    </span>
                                                                                  </bdt>
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                          <span data-custom-class="body_text">
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="body_text">
                                                                                <span
                                                                                  style={{
                                                                                    color:
                                                                                      "rgb(89, 89, 89)",
                                                                                  }}
                                                                                >
                                                                                  <bdt className="statement-end-if-in-editor">
                                                                                    <span
                                                                                      style={{
                                                                                        color:
                                                                                          "rgb(89, 89, 89)",
                                                                                      }}
                                                                                    >
                                                                                      <span
                                                                                        style={{
                                                                                          fontSize: 15,
                                                                                        }}
                                                                                      >
                                                                                        <span data-custom-class="body_text">
                                                                                          <bdt className="block-component" />
                                                                                        </span>
                                                                                      </span>
                                                                                    </span>
                                                                                  </bdt>
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          If you
                                                                          are a
                                                                          resident
                                                                          in the
                                                                          European
                                                                          Economic
                                                                          Area
                                                                          <bdt className="block-component" />{" "}
                                                                          or
                                                                          Switzerland
                                                                          <bdt className="statement-end-if-in-editor" />
                                                                          , we
                                                                          are
                                                                          the{" "}
                                                                          <bdt className="block-component" />
                                                                          'data
                                                                          controller'
                                                                          <bdt className="else-block" />{" "}
                                                                          of
                                                                          your
                                                                          personal
                                                                          information.
                                                                          We
                                                                          have
                                                                          appointed{" "}
                                                                          <span
                                                                            style={{
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              <bdt className="question">
                                                                                Huschyar
                                                                                Al-Kaidy
                                                                              </bdt>
                                                                            </span>
                                                                          </span>{" "}
                                                                          to be
                                                                          our
                                                                          representative
                                                                          in the
                                                                          EEA
                                                                          <bdt className="block-component" />{" "}
                                                                          and
                                                                          Switzerland
                                                                          <bdt className="statement-end-if-in-editor" />
                                                                          . You
                                                                          can
                                                                          contact
                                                                          them
                                                                          directly
                                                                          regarding
                                                                          our
                                                                          processing
                                                                          of
                                                                          your
                                                                          information
                                                                          <span
                                                                            style={{
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              ,
                                                                              <bdt className="block-component" />{" "}
                                                                              by
                                                                              email
                                                                              at{" "}
                                                                              <bdt className="question">
                                                                                beachbunny@al-kaidy.com
                                                                              </bdt>
                                                                              ,
                                                                              <bdt className="statement-end-if-in-editor" />
                                                                              <bdt className="block-component" />{" "}
                                                                              by
                                                                              visiting{" "}
                                                                              <span
                                                                                style={{
                                                                                  color:
                                                                                    "rgb(0, 58, 250)",
                                                                                }}
                                                                              >
                                                                                <bdt className="question">
                                                                                  <a
                                                                                    href="https://beachbunnyhouse.com/aboutus"
                                                                                    target="_blank"
                                                                                    data-custom-class="link"
                                                                                  >
                                                                                    https://beachbunnyhouse.com/aboutus
                                                                                  </a>
                                                                                </bdt>
                                                                              </span>
                                                                              ,
                                                                              <bdt className="statement-end-if-in-editor" />
                                                                              <bdt className="block-component" />{" "}
                                                                              by
                                                                              phone
                                                                              at{" "}
                                                                              <bdt className="question">
                                                                                +17623875717
                                                                              </bdt>
                                                                              ,
                                                                              <bdt className="statement-end-if-in-editor" />
                                                                            </span>
                                                                          </span>{" "}
                                                                          or by
                                                                          post
                                                                          to:
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              <span
                                                                                style={{
                                                                                  fontSize: 15,
                                                                                }}
                                                                              >
                                                                                <span data-custom-class="body_text">
                                                                                  <bdt className="question">
                                                                                    <bdt className="statement-end-if-in-editor">
                                                                                      <bdt className="block-component" />
                                                                                    </bdt>
                                                                                  </bdt>
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            <bdt className="question">
                                                                              <bdt className="block-component" />
                                                                            </bdt>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            <bdt className="question">
                                                                              Rathausstrasse7
                                                                              <span
                                                                                style={{
                                                                                  fontSize: 15,
                                                                                }}
                                                                              >
                                                                                <span data-custom-class="body_text">
                                                                                  <bdt className="question">
                                                                                    <bdt className="statement-end-if-in-editor" />
                                                                                  </bdt>
                                                                                </span>
                                                                              </span>
                                                                              <span
                                                                                style={{
                                                                                  color:
                                                                                    "rgb(89, 89, 89)",
                                                                                  fontSize: 15,
                                                                                }}
                                                                              >
                                                                                <span data-custom-class="body_text">
                                                                                  <bdt className="block-component">
                                                                                    <bdt className="block-component" />
                                                                                  </bdt>
                                                                                </span>
                                                                              </span>
                                                                            </bdt>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="body_text">
                                                                                <bdt className="question">
                                                                                  Berlin
                                                                                  <span
                                                                                    style={{
                                                                                      fontSize: 15,
                                                                                    }}
                                                                                  >
                                                                                    <span data-custom-class="body_text">
                                                                                      <span
                                                                                        style={{
                                                                                          color:
                                                                                            "rgb(89, 89, 89)",
                                                                                          fontSize: 15,
                                                                                        }}
                                                                                      >
                                                                                        <span data-custom-class="body_text">
                                                                                          <bdt className="statement-end-if-in-editor">
                                                                                            <bdt className="statement-end-if-in-editor" />
                                                                                          </bdt>
                                                                                        </span>
                                                                                      </span>
                                                                                    </span>
                                                                                  </span>
                                                                                </bdt>
                                                                              </span>
                                                                            </span>
                                                                            <span
                                                                              style={{
                                                                                color:
                                                                                  "rgb(89, 89, 89)",
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="body_text">
                                                                                <bdt className="block-component" />
                                                                              </span>
                                                                            </span>
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                                color:
                                                                                  "rgb(89, 89, 89)",
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="body_text">
                                                                                ,&nbsp;
                                                                              </span>
                                                                            </span>
                                                                            <span
                                                                              style={{
                                                                                color:
                                                                                  "rgb(89, 89, 89)",
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="body_text">
                                                                                <bdt className="question">
                                                                                  Berlin
                                                                                </bdt>
                                                                              </span>
                                                                              <span data-custom-class="body_text">
                                                                                <bdt className="statement-end-if-in-editor">
                                                                                  <bdt className="block-component" />
                                                                                </bdt>
                                                                              </span>
                                                                            </span>
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="body_text">
                                                                                &nbsp;
                                                                                <bdt className="question">
                                                                                  10178
                                                                                  <span
                                                                                    style={{
                                                                                      fontSize: 15,
                                                                                    }}
                                                                                  >
                                                                                    <span data-custom-class="body_text">
                                                                                      <span
                                                                                        style={{
                                                                                          color:
                                                                                            "rgb(89, 89, 89)",
                                                                                          fontSize: 15,
                                                                                        }}
                                                                                      >
                                                                                        <span data-custom-class="body_text">
                                                                                          <bdt className="statement-end-if-in-editor" />
                                                                                        </span>
                                                                                      </span>
                                                                                    </span>
                                                                                  </span>
                                                                                  <bdt className="block-component" />
                                                                                </bdt>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <bdt className="block-component">
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text" />
                                                                          </span>
                                                                        </bdt>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span data-custom-class="body_text">
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="body_text">
                                                                                <bdt className="question">
                                                                                  Germany
                                                                                </bdt>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                        <span
                                                                          data-custom-class="body_text"
                                                                          style={{
                                                                            fontSize: 15,
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              <span
                                                                                style={{
                                                                                  fontSize: 15,
                                                                                }}
                                                                              >
                                                                                <span data-custom-class="body_text">
                                                                                  <bdt className="question">
                                                                                    <bdt className="statement-end-if-in-editor" />
                                                                                  </bdt>
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                            <span data-custom-class="body_text">
                                                                              <span
                                                                                style={{
                                                                                  fontSize: 15,
                                                                                }}
                                                                              >
                                                                                <span data-custom-class="body_text">
                                                                                  <bdt className="question">
                                                                                    <bdt className="statement-end-if-in-editor">
                                                                                      <bdt className="statement-end-if-in-editor">
                                                                                        <span
                                                                                          data-custom-class="body_text"
                                                                                          style={{
                                                                                            fontSize: 15,
                                                                                          }}
                                                                                        >
                                                                                          <span
                                                                                            style={{
                                                                                              fontSize: 15,
                                                                                            }}
                                                                                          >
                                                                                            <span data-custom-class="body_text">
                                                                                              <span
                                                                                                style={{
                                                                                                  fontSize: 15,
                                                                                                }}
                                                                                              >
                                                                                                <span data-custom-class="body_text">
                                                                                                  <bdt className="question">
                                                                                                    <bdt className="statement-end-if-in-editor">
                                                                                                      <bdt className="statement-end-if-in-editor">
                                                                                                        <bdt className="block-component" />
                                                                                                      </bdt>
                                                                                                    </bdt>
                                                                                                  </bdt>
                                                                                                </span>
                                                                                              </span>
                                                                                            </span>
                                                                                          </span>
                                                                                        </span>
                                                                                      </bdt>
                                                                                    </bdt>
                                                                                  </bdt>
                                                                                </span>
                                                                                <bdt className="block-component">
                                                                                  <span
                                                                                    style={{
                                                                                      fontSize: 15,
                                                                                    }}
                                                                                  />
                                                                                </bdt>
                                                                                <span
                                                                                  style={{
                                                                                    fontSize: 15,
                                                                                  }}
                                                                                >
                                                                                  <span data-custom-class="body_text">
                                                                                    <span
                                                                                      style={{
                                                                                        color:
                                                                                          "rgb(89, 89, 89)",
                                                                                        fontSize: 15,
                                                                                      }}
                                                                                    >
                                                                                      <span
                                                                                        style={{
                                                                                          fontSize: 15,
                                                                                        }}
                                                                                      >
                                                                                        <span data-custom-class="body_text">
                                                                                          <bdt className="statement-end-if-in-editor">
                                                                                            <bdt className="block-component" />
                                                                                          </bdt>
                                                                                        </span>
                                                                                      </span>
                                                                                    </span>
                                                                                  </span>
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        id="request"
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            color:
                                                                              "rgb(127, 127, 127)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                              fontSize: 15,
                                                                            }}
                                                                          >
                                                                            <span
                                                                              style={{
                                                                                fontSize: 15,
                                                                                color:
                                                                                  "rgb(89, 89, 89)",
                                                                              }}
                                                                            >
                                                                              <span
                                                                                style={{
                                                                                  fontSize: 15,
                                                                                  color:
                                                                                    "rgb(89, 89, 89)",
                                                                                }}
                                                                              >
                                                                                <span
                                                                                  id="control"
                                                                                  style={{
                                                                                    color:
                                                                                      "rgb(0, 0, 0)",
                                                                                  }}
                                                                                >
                                                                                  <strong>
                                                                                    <span data-custom-class="heading_1">
                                                                                      15.
                                                                                      HOW
                                                                                      CAN
                                                                                      YOU
                                                                                      REVIEW,
                                                                                      UPDATE,
                                                                                      OR
                                                                                      DELETE
                                                                                      THE
                                                                                      DATA
                                                                                      WE
                                                                                      COLLECT
                                                                                      FROM
                                                                                      YOU?
                                                                                    </span>
                                                                                  </strong>
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <br />
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          lineHeight:
                                                                            "1.5",
                                                                        }}
                                                                      >
                                                                        <span
                                                                          style={{
                                                                            fontSize: 15,
                                                                            color:
                                                                              "rgb(89, 89, 89)",
                                                                          }}
                                                                        >
                                                                          <span
                                                                            style={{
                                                                              fontSize: 15,
                                                                              color:
                                                                                "rgb(89, 89, 89)",
                                                                            }}
                                                                          >
                                                                            <span data-custom-class="body_text">
                                                                              <bdt className="block-component" />
                                                                              Based
                                                                              on
                                                                              the
                                                                              applicable
                                                                              laws
                                                                              of
                                                                              your
                                                                              country
                                                                              <bdt className="block-component" />{" "}
                                                                              or
                                                                              state
                                                                              of
                                                                              residence
                                                                              in
                                                                              the
                                                                              US
                                                                              <bdt className="statement-end-if-in-editor" />
                                                                              ,
                                                                              you
                                                                              may
                                                                              <bdt className="else-block">
                                                                                <bdt className="block-component">
                                                                                  {" "}
                                                                                  have
                                                                                  the
                                                                                  right
                                                                                  to
                                                                                  request
                                                                                  access
                                                                                  to
                                                                                  the
                                                                                  personal
                                                                                  information
                                                                                  we
                                                                                  collect
                                                                                  from
                                                                                  you,
                                                                                  details
                                                                                  about
                                                                                  how
                                                                                  we
                                                                                  have
                                                                                  processed
                                                                                  it,
                                                                                  correct
                                                                                  inaccuracies,
                                                                                  or
                                                                                  delete
                                                                                  your
                                                                                  personal
                                                                                  information.
                                                                                  You
                                                                                  may
                                                                                  also
                                                                                  have
                                                                                  the
                                                                                  right
                                                                                  to{" "}
                                                                                  <bdt className="block-component" />
                                                                                  withdraw
                                                                                  your
                                                                                  consent
                                                                                  to
                                                                                  our
                                                                                  processing
                                                                                  of
                                                                                  your
                                                                                  personal
                                                                                  information.
                                                                                  These
                                                                                  rights
                                                                                  may
                                                                                  be
                                                                                  limited
                                                                                  in
                                                                                  some
                                                                                  circumstances
                                                                                  by
                                                                                  applicable
                                                                                  law.
                                                                                  To
                                                                                  request
                                                                                  to
                                                                                  review,
                                                                                  update,
                                                                                  or
                                                                                  delete
                                                                                  your
                                                                                  personal
                                                                                  information,
                                                                                  please{" "}
                                                                                  <bdt className="block-component" />
                                                                                  fill
                                                                                  out
                                                                                  and
                                                                                  submit
                                                                                  a&nbsp;
                                                                                </bdt>
                                                                              </bdt>
                                                                            </span>
                                                                            <span
                                                                              style={{
                                                                                color:
                                                                                  "rgb(0, 58, 250)",
                                                                              }}
                                                                            >
                                                                              <span data-custom-class="body_text">
                                                                                <span
                                                                                  style={{
                                                                                    color:
                                                                                      "rgb(0, 58, 250)",
                                                                                    fontSize: 15,
                                                                                  }}
                                                                                >
                                                                                  <a
                                                                                    data-custom-class="link"
                                                                                    href="https://app.termly.io/notify/98f5250a-7669-463e-aaa8-010e6e6b0ddb"
                                                                                    rel="noopener noreferrer"
                                                                                    target="_blank"
                                                                                  >
                                                                                    data
                                                                                    subject
                                                                                    access
                                                                                    request
                                                                                  </a>
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                            <bdt className="block-component">
                                                                              <span data-custom-class="body_text" />
                                                                            </bdt>
                                                                          </span>
                                                                        </span>
                                                                        <span data-custom-class="body_text">
                                                                          .
                                                                        </span>
                                                                      </div>
                                                                      <style
                                                                        dangerouslySetInnerHTML={{
                                                                          __html:
                                                                            "\n      ul {\n        list-style-type: square;\n      }\n      ul > li > ul {\n        list-style-type: circle;\n      }\n      ul > li > ul > li > ul {\n        list-style-type: square;\n      }\n      ol li {\n        font-family: Arial ;\n      }\n    ",
                                                                        }}
                                                                      />
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
