import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import styled from 'styled-components';
import sparkScroll from 'react-spark-scroll-gsap';
const {SparkScroll, SparkProxy} = sparkScroll({invalidateAutomatically: true});

import {Container, Row} from '../components/Layout';
import Tagline from '../components/Tagline';
import {Page, PageTitle} from '../components/Page';
import Close from '../components/Close';
import {Cards, Card} from '../components/Card';
import {ReadingText} from '../components/Text';

import getPageImages from '../utils/getPageImages';
import {fadeTimeline, media} from '../utils/style';

const AboutPage = Page.extend`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.onDark};
`;

const AboutCard = Card.extend`
  &:nth-of-type(2) {
    margin-left: auto;
    margin-top: -50%;
    margin-bottom: -45%;
    max-width: 60%;
  }

  &:nth-of-type(3) {
    margin-bottom: -25%;
    margin-top: -75%;
    max-width: 80%;
  }

  &:nth-of-type(4) {
    margin-left: auto;
    margin-right: 5%;
    max-width: 70%;
  }
`;

const AboutRow = Row.extend`
  ${media.sm`
    flex-direction: row;
  `};
`;

class About extends React.Component {
  render() {
    const {transition, data} = this.props;
    const pageImages = getPageImages(data.allFile.edges, 1, 2);
    const images = [
      pageImages['landscape'][0],
      pageImages['portrait'][0],
      pageImages['landscape'][1],
    ];

    return (
      <div style={transition && transition.style}>
        <Helmet>
          <title>About :: Michael Dijkstra</title>
        </Helmet>
        <AboutPage>
          <Close />
          <SparkProxy.div proxyId="parallax">
            <Container>
              <Cards order={[3, 2, 0, 1]}>
                <AboutCard>
                  <SparkScroll.div
                    proxy="parallax"
                    timeline={{
                      topBottom: {transform: 'translate3d(0px,0px,0px)'},
                      bottomTop: {transform: 'translate3d(0px,-120px,0px)'},
                    }}>
                    <PageTitle>
                      loves<br />the<br />www
                    </PageTitle>
                  </SparkScroll.div>
                </AboutCard>
                {images.map((img, index) => {
                  const translateX = `${(index % 2 == 0 ? '-' : '') +
                    index +
                    1 * 15}vw`;
                  return (
                    <AboutCard key={index}>
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
                    </AboutCard>
                  );
                })}
              </Cards>
            </Container>

            <Container>
              <SparkScroll.div timeline={fadeTimeline}>
                <AboutRow>
                  <Tagline />
                  <ReadingText>
                    <p>
                      Michael Dijkstra is a software developer and product
                      manager with more than 10 years experience working across
                      the entire product development development cycle -
                      back-end development, front-end development, wire framing,
                      copy writing and design.
                    </p>

                    <p>
                      He is currently Head of Product at Q-CTRL. Previously he
                      was Head of Product at PWC Digital Ventures and most
                      recently lived in North America working with XXIX and
                      companies like Rough Trade, AIGA, BuzzFeed and Dropbox.
                    </p>

                    <p>
                      He is the co-founder of Front Row Ventures, Wise and Small
                      Victories.
                    </p>

                    <p>
                      Currentently his preferred technologies are Ruby on Rails,
                      React and Go.
                    </p>
                  </ReadingText>
                </AboutRow>
              </SparkScroll.div>
            </Container>
          </SparkProxy.div>
        </AboutPage>
      </div>
    );
  }
}

export const query = graphql`
  query AboutImagesQuery {
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

export default About;
