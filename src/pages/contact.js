import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import styled from 'styled-components';
import sparkScroll from 'react-spark-scroll-gsap';
const {SparkScroll, SparkProxy} = sparkScroll({invalidateAutomatically: true});

import {Container, Row} from '../components/Layout';
import Tagline from '../components/Tagline';
import {Page, PageTitle, PageExternalLink} from '../components/Page';
import Close from '../components/Close';
import {Cards, Card} from '../components/Card';
import {AsidePrimary, AsideSecondary} from '../components/Aside';
import {ReadingText} from '../components/Text';
import ContactForm from '../components/ContactForm';

import {fadeTimeline} from '../utils/style';
import getPageImages from '../utils/getPageImages';

const ContactPage = Page.extend`
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.onDark};
`;

const ContactCard = Card.extend`
  &:nth-of-type(2) {
    margin-left: -5%;
    margin-top: -80%;
    margin-bottom: -45%;
    max-width: 60%;
  }

  &:nth-of-type(3) {
    margin-bottom: -25%;
    margin-left: auto;
    margin-top: -60%;
    max-width: 80%;
  }

  &:nth-of-type(4) {
    margin-left: auto;
    margin-right: 5%;
    max-width: 70%;
  }
`;

class Contact extends React.Component {
  render() {
    const {transition, data} = this.props;
    const pageImages = getPageImages(data.allFile.edges, 1, 2);
    const images = [
      pageImages['portrait'][0],
      pageImages['landscape'][0],
      pageImages['landscape'][1],
    ];

    return (
      <div style={transition && transition.style}>
        <Helmet>
          <title>Contact :: Michael Dijkstra</title>
        </Helmet>
        <ContactPage>
          <Close />

          <SparkProxy.div proxyId="parallax">
            <Container>
              <Cards order={[3, 0, 2, 1]}>
                <ContactCard>
                  <SparkScroll.div
                    proxy="parallax"
                    timeline={{
                      topBottom: {transform: 'translate3d(0px,0px,0px)'},
                      bottomTop: {transform: 'translate3d(0px,-120px,0px)'},
                    }}>
                    <PageTitle>
                      hello<br />from<br />syd
                    </PageTitle>
                  </SparkScroll.div>
                </ContactCard>
                {images.map((img, index) => {
                  const translateX = `${(index % 2 == 0 ? ' ' : '-') +
                    index +
                    1 * 15}vw`;
                  return (
                    <ContactCard key={index}>
                      <SparkScroll.div
                        proxy="parallax"
                        timeline={{
                          topBottom: {transform: 'translate3d(0px,0px,0px)'},
                          bottomTop: {
                            transform: `translate3d(${translateX},-120px,0px)`,
                          },
                        }}>
                        <Img sizes={img.sizes} />
                      </SparkScroll.div>
                    </ContactCard>
                  );
                })}
              </Cards>
            </Container>

            <Container>
              <SparkScroll.div timeline={fadeTimeline}>
                <Row>
                  <ReadingText>
                    <p>
                      Michael Dijkstra currently lives and works in Sydney,
                      Australia. He is Head of Product for quantum control
                      startup <a href="http://www.q-ctrl.com">Q-CTRL</a>
                    </p>
                    <p>Please use the form below to get in touch.</p>
                    <ContactForm />
                  </ReadingText>
                  <div>
                    <AsidePrimary>
                      <div>Socials</div>
                    </AsidePrimary>
                    <AsideSecondary>
                      <div>
                        <PageExternalLink
                          href="https://github.com/micdijkstra"
                          target="_blank">
                          GitHub
                        </PageExternalLink>
                      </div>
                      <div>
                        <PageExternalLink
                          href="https://twitter.com/micdijkstra"
                          target="_blank">
                          Twitter
                        </PageExternalLink>
                      </div>
                      <div>
                        <PageExternalLink
                          href="https://instagram.com/dijkstra.io"
                          target="_blank">
                          Instagram
                        </PageExternalLink>
                      </div>
                    </AsideSecondary>
                  </div>
                </Row>
              </SparkScroll.div>
            </Container>
          </SparkProxy.div>
        </ContactPage>
      </div>
    );
  }
}

export const query = graphql`
  query ContactImagesQuery {
    allFile(filter: {sourceInstanceName: {eq: "images"}}) {
      edges {
        node {
          childImageSharp {
            sizes(maxWidth: 900) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;

export default Contact;
